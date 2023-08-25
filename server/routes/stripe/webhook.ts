import express, { Request, Response, Router } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { getUserInformation, updatePaymentList } from "../firebase/firebase-queries";
import { retriveProductCredits } from "./utils";

dotenv.config();

const router: Router = express.Router();

const stripe: Stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET as string, { apiVersion: "2023-08-16" });
const endpointSecret: string = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET as string;

router.post("/confirmation", express.raw({ type: "application/json" }), async (req: Request, res: Response) => {
  const sig: string = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "payment_intent.succeeded") {
    const payment = event.data.object as Stripe.Charge;
    const { email, userId, productPrice } = payment.metadata;
    try {
      const { docs } = await getUserInformation({ email, userId });

      const productList = (await stripe.products.list()).data;

      await updatePaymentList(docs[0].ref, payment, retriveProductCredits(productList, productPrice));
    } catch {
      return res.status(500).send();
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

export default router;

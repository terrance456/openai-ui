import express, { Request, Response, Router } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { z } from "zod";
import { UserType } from "../firebase/type";
import { FormattedPaymentHistory, formatPaymentHistory, formatPaymentHistoryWithInvoices } from "./utils";

dotenv.config();

const router: Router = express.Router();

const stripe: Stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET as string, { apiVersion: "2023-08-16" });

const productIdSchema = z.object({ product_id: z.string().nonempty() });

export async function fetchStripeProductList() {
  return stripe.products.list();
}

router.post("/checkout-payment-session", async (req: Request, res: Response) => {
  const parseReq = productIdSchema.safeParse(req.body);

  if (!parseReq.success) {
    return res.status(400).json({ message: "Invalid Request" });
  }

  const validProduct: Stripe.Product | undefined = (await fetchStripeProductList()).data.find((v) => v.metadata.clientId === parseReq.data.product_id);
  if (!validProduct) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ quantity: 1, price: validProduct.default_price as string }],
      payment_intent_data: { metadata: { email: res.locals.user.email, userId: res.locals.user.uid, productPrice: validProduct.default_price as string } },
      customer_email: res.locals.user.email,
      success_url: `${process.env.HOST_URL}/payment/success`,
      cancel_url: `${process.env.HOST_URL}/payment/cancelled`,
      invoice_creation: { enabled: true },
    });
    return res.status(200).json({ url: checkoutSession.url });
  } catch (e: any) {
    return res.status(503).send({ message: "Service unavailable, please try again later" });
  }
});

router.get("/get-payment-history", async (req: Request, res: Response) => {
  const user: UserType = { email: res.locals.user.email, userId: res.locals.user.uid };

  try {
    const paymentInformation: Stripe.PaymentIntent[] = (await stripe.paymentIntents.search({ query: `metadata[\'email\']:\'${user.email}\'` })).data;

    if (paymentInformation.length < 1) {
      return res.status(200).json([]);
    }

    const productList: Stripe.Product[] = (await fetchStripeProductList()).data;
    const historyList: FormattedPaymentHistory[] = formatPaymentHistory(paymentInformation, productList);
    const invoicesHandler = historyList.filter((v) => !!v.invoice).map((v) => stripe.invoices.retrieve(v.invoice as string));
    const invoicesResult: Stripe.Invoice[] = await Promise.all(invoicesHandler);

    return res.status(200).json(formatPaymentHistoryWithInvoices(historyList, invoicesResult));
  } catch (error) {
    res.status(400).json({ message: "Could not retrive payment history" });
  }
});

export default router;

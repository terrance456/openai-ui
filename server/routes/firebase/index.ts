import express, { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { getUserInformation, createNewCredits } from "./firebase-queries";
import { NewUserType, UserType } from "./type";
import { formatPaymentHistory, formatUserInformation } from "./utils";
import Stripe from "stripe";
import { fetchStripeProductList } from "../stripe";

dotenv.config();

const router: Router = express.Router();

router.get("/get-credits", async (req: Request, res: Response) => {
  const user: UserType = { email: res.locals.user.email, userId: res.locals.user.uid };

  getUserInformation(user)
    .then((storeResponse) => {
      if (storeResponse?.docs?.length === 0) {
        const newUser: NewUserType = { ...user, credits: 50, image_list: [] };
        createNewCredits(newUser).then(() => {
          res.status(200).json({ userData: newUser });
        });
        return;
      }
      res.status(200).json({ userData: formatUserInformation(storeResponse?.docs[0]?.data()) });
    })
    .catch((e) => {
      res.status(400).json({ message: "Could not retrive credits" });
    });
});

router.get("/get-images-id", async (req: Request, res: Response) => {
  const user: UserType = { email: res.locals.user.email, userId: res.locals.user.uid };

  getUserInformation(user)
    .then((storeResponse) => {
      if (storeResponse?.docs?.length === 0) {
        res.status(400).json({ message: "Images not found" });
        return;
      }
      res.status(200).json({ image_ids: (storeResponse?.docs[0]?.data()?.image_list as Array<string>)?.reverse() || [] });
    })
    .catch((e) => {
      res.status(400).json({ message: "Could not retrive images, please try again later" });
    });
});

router.get("/get-payment-history", async (req: Request, res: Response) => {
  const user: UserType = { email: res.locals.user.email, userId: res.locals.user.uid };

  if (process.env.CURRENT_ENV === "dev") {
    const mockData = (await import("../../mock/mock.json")).default;
    return res.status(200).json(mockData);
  }

  try {
    const paymentInformation: Stripe.PaymentIntent[] = (await getUserInformation(user))?.docs[0]?.data()?.payment_list || [];

    if (paymentInformation.length > 0) {
      const productList: Stripe.Product[] = (await fetchStripeProductList()).data;
      return res.status(200).json(formatPaymentHistory(paymentInformation, productList));
    }
    return res.status(200).json([]);
  } catch (error) {
    res.status(400).json({ message: "Could not retrive payment history" });
  }
});

export default router;

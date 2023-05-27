import express, { Router, Request, Response } from "express";
import { z } from "zod";
import dotenv from "dotenv";
import { validateEmail, getCredits, createNewCredits } from "./firebase-queries";

dotenv.config();

const router: Router = express.Router();

const UserSchema = z.object({
  email: z.string().email(),
  userId: z.string().nonempty(),
});

router.get("/get-credits", async (req: Request, res: Response) => {
  const user = UserSchema.safeParse({ email: res.locals.user.email, userId: res.locals.user.uid });

  if (!user.success) {
    res.status(400).json({ message: "Missing or invalid params" });
    return;
  }

  if (!(await validateEmail(user.data))) {
    res.status(400).json({ message: "User doesnt exist" });
    return;
  }

  getCredits(user.data)
    .then((storeResponse) => {
      if (storeResponse?.docs?.length === 0) {
        const newUser = { ...user.data, credits: 50 };
        createNewCredits(newUser).then(() => {
          res.status(200).json({ userData: newUser });
        });
        return;
      }
      res.status(200).json({ userData: storeResponse?.docs[0]?.data() || {} });
    })
    .catch((e) => {
      res.status(400).json({ message: "Could not retrive credits" });
    });
});

export default router;

import express, { Router, Request, Response } from "express";
import { z } from "zod";
import dotenv from "dotenv";
import { validateEmail, getUserInformation, createNewCredits } from "./firebase-queries";
import { NewUserType } from "./type";
import { formatUserInformation } from "./utils";

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

  getUserInformation(user.data)
    .then((storeResponse) => {
      if (storeResponse?.docs?.length === 0) {
        const newUser: NewUserType = { ...user.data, credits: 50, image_list: [] };
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
  const user = UserSchema.safeParse({ email: res.locals.user.email, userId: res.locals.user.uid });

  if (!user.success) {
    res.status(400).json({ message: "Missing or invalid params" });
    return;
  }

  if (!(await validateEmail(user.data))) {
    res.status(400).json({ message: "User doesnt exist" });
    return;
  }

  getUserInformation(user.data)
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

export default router;

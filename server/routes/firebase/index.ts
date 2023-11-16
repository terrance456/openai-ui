import express, { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { getUserInformation, createNewCredits } from "./firebase-queries";
import { NewUserType, UserType } from "./type";
import { formatUserInformation } from "./utils";

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

export default router;

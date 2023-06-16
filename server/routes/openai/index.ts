import express, { Request, Response } from "express";
import { ImageListType, UserType } from "../firebase/type";
import { getCredits, updateCredits, updateImageListIDs } from "../firebase/firebase-queries";
import { Configuration, OpenAIApi } from "openai";
import { downloadImages } from "./download-image";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/query", async (req: Request, res: Response) => {
  const userCredits = await validateCredits({ userId: res.locals.user.uid, email: res.locals.user.email });
  if (userCredits.length === 0) {
    res.status(400).json({ message: "Bad request" });
    return;
  }
  const availableCredits: number = userCredits[0].data().credits;
  if (availableCredits < 25) {
    res.status(402).json({ message: "Insufficient credits, please purchase more credits to make more queries" });
    return;
  }
  queryImageOpenAi(req.body.query)
    .then((openAiRes) => {
      updateCredits(userCredits[0].ref, { credits: availableCredits - 25 })
        .then(async () => {
          const newImageList: Array<ImageListType> = openAiRes.data?.data?.map((value, index: number) => ({ ...value, id: Date.now() + index + uuidv4() })) as Array<ImageListType>;
          await downloadImages(newImageList);
          await updateImageListIDs(
            userCredits[0].ref,
            newImageList.map((v: ImageListType) => v.id)
          );
          res.status(200).json(newImageList);
        })
        .catch(() => {
          res.status(500).json({ message: "Please try again later" });
        });
    })
    .catch(({ response }) => {
      res.status(response.status).json(response.data);
    });
});

export default router;

function queryImageOpenAi(query: string) {
  const configuration = new Configuration({ apiKey: process.env.OPENAPI_API_KEY });
  const openai = new OpenAIApi(configuration);
  return openai.createImage({ prompt: query, n: 4, size: "1024x1024" });
}

async function validateCredits(user: UserType) {
  try {
    const storeResponse = await getCredits(user);
    return storeResponse.docs;
  } catch (e) {
    return [];
  }
}

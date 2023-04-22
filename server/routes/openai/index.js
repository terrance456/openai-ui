const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const { getCredits, updateCredits } = require("../firebase/firebase-queries");

router.post("/query", async (req, res) => {
  const userCredits = await validateCredits({ userId: res.locals.user.uid, email: res.locals.user.email });

  if (userCredits.length === 0) {
    res.status(400).json({ message: "Bad request" });
    return;
  }

  const availableCredits = userCredits[0].data().credits;
  if (availableCredits < 25) {
    res.status(402).json({ message: "Insufficient credits, please purchase more credits to make more queries" });
    return;
  }

  queryImageOpenAi(req.body.query)
    .then((openAiRes) => {
      updateCredits(userCredits[0].ref, { credits: availableCredits - 25 })
        .then(() => {
          res.status(200).json(openAiRes.data);
        })
        .catch(() => {
          res.status(500).json({ message: "Please try again later" });
        });
    })
    .catch(({ response }) => {
      res.status(response.status).json(response.data);
    });
});

module.exports = router;

function queryImageOpenAi(query) {
  const configuration = new Configuration({ apiKey: process.env.OPENAPI_API_KEY });
  const openai = new OpenAIApi(configuration);
  return openai.createImage({ prompt: query, n: 2, size: "1024x1024" });
}

async function validateCredits(user) {
  try {
    const storeResponse = await getCredits(user);
    return storeResponse.docs;
  } catch (e) {
    return [];
  }
}

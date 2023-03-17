const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

router.post("/query", async (req, res) => {
  queryImageOpenAi(req.body.query)
    .then((openAiRes) => {
      res.status(200).json(openAiRes.data);
    })
    .catch(({ response }) => {
      res.status(response.status).json(response.data);
    });
});

module.exports = router;

function queryImageOpenAi(query) {
  const configuration = new Configuration({ apiKey: process.env.OPENAPI_API_KEY });
  const openai = new OpenAIApi(configuration);
  return openai.createImage({ prompt: query, n: 1, size: "1024x1024" });
}

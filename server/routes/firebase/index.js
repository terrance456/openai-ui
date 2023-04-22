const express = require("express");
const router = express.Router();
const { z } = require("zod");

const { getCredits, validateEmail, createNewCredits, updateCredits } = require("./firebase-queries");

const UserSchema = z.object({
  email: z.string().email(),
  userId: z.string().nonempty(),
});

router.get("/get-credits", async (req, res) => {
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

module.exports = router;

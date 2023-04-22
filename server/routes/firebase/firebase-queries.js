const admin = require("../../auth/firebase-config");
const db = admin.firestore();

async function validateEmail(user) {
  try {
    const verifiedUser = await admin.auth().getUserByEmail(user.email);
    console.log("success_success", verifiedUser);

    if (verifiedUser.uid !== user.userId) {
      return false;
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function getCredits(user) {
  return db.collection("users").where("userId", "==", user.userId).where("email", "==", user.email).get();
}

function createNewCredits(user) {
  return db.collection("users").add(user);
}

async function updateCredits(ref, credits) {
  return db.collection("users").doc(ref.id).update(credits);
}

module.exports = { validateEmail, getCredits, createNewCredits, updateCredits };

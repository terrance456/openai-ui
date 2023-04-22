const firestoreDb = require("../../auth/firebase-database");
const { collection, getDocs, query, where, addDoc, updateDoc } = require("firebase/firestore/lite");
const admin = require("../../auth/firebase-config");

async function validateEmail(user) {
  try {
    const verifiedUser = await admin.auth().getUserByEmail(user.email);
    console.log(verifiedUser);
    if (verifiedUser.uid !== user.userId) {
      return false;
    }
    return true;
  } catch (e) {
    console.log("error_error", e);
    return false;
  }
}

function getCredits(user) {
  const ref = collection(firestoreDb, "users");
  const q = query(ref, where("userId", "==", user.userId), where("email", "==", user.email));
  return getDocs(q);
}

function createNewCredits(user) {
  const ref = collection(firestoreDb, "users");
  return addDoc(ref, user);
}

async function updateCredits(ref, credits) {
  return updateDoc(ref, credits);
}

module.exports = { validateEmail, getCredits, createNewCredits, updateCredits };

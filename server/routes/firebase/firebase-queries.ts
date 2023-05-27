import { admin } from "../../auth/firebase-config";
import { CreditsType, UserType } from "./type";

const db = admin.firestore();

export async function validateEmail(user: UserType) {
  try {
    const verifiedUser = await admin.auth().getUserByEmail(user.email);
    if (verifiedUser.uid !== user.userId) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

export function getCredits(user: UserType) {
  return db.collection("users").where("userId", "==", user.userId).where("email", "==", user.email).get();
}

export function createNewCredits(user: UserType) {
  return db.collection("users").add(user);
}

export async function updateCredits(ref: any, credits: CreditsType) {
  return db.collection("users").doc(ref.id).update(credits);
}

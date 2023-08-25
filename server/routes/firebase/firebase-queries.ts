import Stripe from "stripe";
import { admin } from "../../auth/firebase-config";
import { CreditsType, ImageListType, UserType } from "./type";
import { getStorage } from "firebase-admin/storage";

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

export function getUserInformation(user: UserType) {
  return db.collection("users").where("userId", "==", user.userId).where("email", "==", user.email).get();
}

export function createNewCredits(user: UserType) {
  return db.collection("users").add(user);
}

export async function updateCredits(ref: any, credits: CreditsType) {
  return db.collection("users").doc(ref.id).update(credits);
}

export async function updateImageListIDs(ref: any, record: Array<string>) {
  return db
    .collection("users")
    .doc(ref.id)
    .update({ image_list: admin.firestore.FieldValue.arrayUnion(...record) });
}

export function uploadImage(image: ImageListType) {
  const bf = Buffer.from(image.arrayBuffer as ArrayBuffer);
  return getStorage().bucket().file(image.id).save(bf, { contentType: "image/png" });
}

export async function updatePaymentList(ref: any, payment: Stripe.Charge, amount: number) {
  return db
    .collection("users")
    .doc(ref.id)
    .update({ payment_list: admin.firestore.FieldValue.arrayUnion(payment), credits: admin.firestore.FieldValue.increment(amount) });
}

import Stripe from "stripe";
import { retriveProductCredits } from "../stripe/utils";

interface UserResponseType {
  userId: string;
  email: string;
  credits: number;
}

export function formatUserInformation(info: FirebaseFirestore.DocumentData) {
  if (!info) {
    return {};
  }
  const userInfo: UserResponseType = { userId: "", email: "", credits: 0 };
  Object.keys(userInfo).forEach((value: string) => {
    Object.assign(userInfo, { [value]: info[value] });
  });
  return userInfo;
}

export function formatPaymentHistory(list: Stripe.PaymentIntent[], productList: Stripe.Product[]) {
  return list.map((value: Stripe.PaymentIntent) => ({
    id: value.id,
    invoice: value.invoice,
    purchased_date: value.created,
    amount: value.amount,
    currency: value.currency,
    status: value.status,
    productId: retriveProductCredits(productList, value.metadata.productPrice),
  }));
}

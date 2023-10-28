import Stripe from "stripe";

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
    productId: productList.find((value: Stripe.Product) => value.default_price === value.metadata.productPrice) || null,
  }));
}

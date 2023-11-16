import Stripe from "stripe";

export function retriveProductCredits(list: Array<Stripe.Product>, priceId: string) {
  const validItem: Stripe.Product = list.find((v) => v.default_price === priceId) as Stripe.Product;

  switch (validItem.metadata.clientId) {
    case "501": {
      return 200;
    }
    case "502": {
      return 1000;
    }
    case "15-test-15": {
      return 1;
    }
    default:
      return 0;
  }
}

export function formatPaymentHistory(list: Stripe.PaymentIntent[], productList: Stripe.Product[]) {
  return list.map((value: Stripe.PaymentIntent) => ({
    id: value.id,
    invoice: value.invoice,
    purchased_date: value.created,
    amount: value.amount,
    currency: value.currency,
    status: value.status,
    productId: productList.find((product: Stripe.Product) => product.default_price === value.metadata.productPrice)?.metadata?.clientId || null,
  }));
}

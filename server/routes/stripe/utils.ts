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

import Stripe from "stripe";

export interface FormattedPaymentHistory {
  id: string;
  invoice: string | null;
  invoiceUrl: string | null;
  purchased_date: number;
  amount: number;
  currency: string;
  status: string;
  productId: string | null;
}

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

export function formatPaymentHistory(list: Stripe.PaymentIntent[], productList: Stripe.Product[]): FormattedPaymentHistory[] {
  return list.map((value: Stripe.PaymentIntent) => ({
    id: value.id,
    invoice: value.invoice as string,
    purchased_date: value.created,
    amount: value.amount,
    currency: value.currency,
    status: value.status,
    productId: productList.find((product: Stripe.Product) => product.default_price === value.metadata.productPrice)?.metadata?.clientId || null,
    invoiceUrl: null,
  }));
}

export function formatPaymentHistoryWithInvoices(paymentHistory: FormattedPaymentHistory[], invoiceList: Stripe.Invoice[]) {
  return paymentHistory.map((value: FormattedPaymentHistory) => {
    const invoice: Stripe.Invoice = invoiceList.find((invoice: Stripe.Invoice) => invoice.id === value.invoice) as Stripe.Invoice;

    if (invoice) {
      return { ...value, invoiceUrl: invoice.hosted_invoice_url };
    }
    return value;
  });
}

export enum HomeRoutes {
  Home = "/home",
  History = "/history",
  Pricing = "/pricing",
  Purchases = "/purchases",
  PaymentSuccess = "/payment/success",
  PaymentCancelled = "/payment/cancelled",
}

export enum ApiRoutes {
  Query = "/openai/query",
  SetCookie = "/setcookie",
  GetCredits = "/firebase/get-credits",
  GetImagesIds = "/firebase/get-images-id",
  GetPaymentHistory = "/stripe/get-payment-history",
  GetInvoice = "/stripe/get-invoice/{id}",
  PostCheckoutPaymentSession = "/stripe/checkout-payment-session",
}

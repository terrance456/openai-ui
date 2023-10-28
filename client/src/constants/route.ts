export enum HomeRoutes {
  Home = "/home",
  History = "/history",
  Pricing = "/pricing",
  PaymentSuccess = "/payment/success",
  PaymentCancelled = "/payment/cancelled",
}

export enum ApiRoutes {
  Query = "/openai/query",
  SetCookie = "/setcookie",
  GetCredits = "/firebase/get-credits",
  GetImagesIds = "/firebase/get-images-id",
  PostCheckoutPaymentSession = "/stripe/checkout-payment-session",
}

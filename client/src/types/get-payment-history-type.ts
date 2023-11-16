export interface PaymentHistoryResponse {
  id: string;
  invoice: string;
  purchased_date: number;
  amount: number;
  currency: string;
  status: string;
  productId: string;
}

"use client";
import React from "react";
import PageLayout from "@/src/components/common/PageLayout/PageLayout";
import "./purchases.scss";
import { getPaymentHistory, getStripeInvoice } from "@/src/apis";
import { ApiRoutes } from "@/src/constants/route";
import { AxiosError, AxiosResponse } from "axios";
import { PaymentHistoryResponse } from "@/src/types/get-payment-history-type";
import { useToastNotificationContext } from "@/src/contexts/ToastNotificationContext";
import { ToastIndicatorType } from "@/src/components/ToastNotification/ToastNotification";
import Badge from "@/src/components/common/Badge/Badge";
import Button from "@/src/components/common/Button/Button";

export default function PurchasesPage() {
  const [historyList, setHistoryList] = React.useState<Array<PaymentHistoryResponse>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { updateToastList } = useToastNotificationContext();
  const formatCurrency = new Intl.NumberFormat("en-MY", { currency: "MYR", style: "currency" });
  const formatPurchaseDate = new Intl.DateTimeFormat("en-MY", { dateStyle: "medium", timeStyle: "short", hour12: false });

  const paymentStatusType = (status: string) => {
    switch (status) {
      case "succeeded": {
        return <Badge type="success">Paid</Badge>;
      }
      default: {
        return <Badge type="warning">Incompleted</Badge>;
      }
    }
  };

  const onClickView = (invoiceId: string) => {
    const locationCopy = window.open() as Window;
    getStripeInvoice(ApiRoutes.GetInvoice.replace("{id}", invoiceId)).then((res: AxiosResponse) => {
      locationCopy.location.href = res.data.url;
    });
  };

  const renderBody = () => {
    if (isLoading) {
      return (
        <div className="purchase-loader">
          <p className="placeholder-wave">
            <span className="placeholder col-12 mb-3"></span>
            <span className="placeholder col-12 mb-3"></span>
            <span className="placeholder col-12 mb-3"></span>
            <span className="placeholder col-12 mb-3"></span>
          </p>
        </div>
      );
    }

    return historyList.length > 0 ? (
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">Invoice</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
            <th className="date" scope="col">
              Date
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {historyList.map((value: PaymentHistoryResponse, index: number) => (
            <tr key={index}>
              <td scope="row">{index + 1}</td>
              <td>{paymentStatusType(value.status)}</td>
              <td>{formatCurrency.format(Math.round(value.amount / 100))}</td>
              <td className="date">{formatPurchaseDate.format(value.purchased_date * 1000)}</td>
              <td>
                {value.invoice ? (
                  <Button className="view-btn" theme="outline-light" size="sm" onClick={() => onClickView(value.invoice)}>
                    View
                  </Button>
                ) : (
                  <Badge type="secondary">Not Available</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="empty-message-text">You dont have any purchses in recent.</p>
    );
  };

  React.useEffect(() => {
    const abortController: AbortController = new AbortController();
    getPaymentHistory(ApiRoutes.GetPaymentHistory, { signal: abortController.signal })
      .then((res: AxiosResponse<Array<PaymentHistoryResponse>>) => {
        setHistoryList(res.data);
      })
      .catch((e: AxiosError) => {
        if (e.message !== "canceled") {
          updateToastList({ header: "Error", body: "Could not retrive payment history", type: ToastIndicatorType.DANGER, className: "text-light" });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <PageLayout>
      <section className="purchases-container">
        <h4 className="mb-5">Purchase history</h4>
        <div className="invoices-table-wrapper table-responsive">{renderBody()}</div>
      </section>
    </PageLayout>
  );
}

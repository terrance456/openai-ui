import React from "react";
import PageLayout from "@/src/components/common/PageLayout/PageLayout";
import PaymentInfoMessage from "@/src/components/PaymentInfoMessage/PaymentInfoMessage";
import { HomeRoutes } from "@/src/constants/route";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment successful | Nexusphere AI",
  description: "Payment successful in Nexusphere AI",
};

export default function PaymentSuccessPage() {
  return (
    <PageLayout>
      <section className="d-flex justify-content-center align-items-center mt-5">
        <PaymentInfoMessage
          type="success"
          header="Payment successful"
          content="Your payment was successful. Thank you for your purchase!"
          primaryBtn={{
            theme: "light",
            children: "Back to homepage",
            href: HomeRoutes.Home,
            size: "sm",
          }}
        />
      </section>
    </PageLayout>
  );
}

import React from "react";
import PageLayout from "@/src/components/common/PageLayout/PageLayout";
import PaymentInfoMessage from "@/src/components/PaymentInfoMessage/PaymentInfoMessage";
import { HomeRoutes } from "@/src/constants/route";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment cancelled | Nexusphere AI",
  description: "Payment cancelled in Nexusphere AI",
};

export default function PaymentCancelledPage() {
  return (
    <PageLayout>
      <section className="d-flex justify-content-center align-items-center mt-5">
        <PaymentInfoMessage
          type="cancelled"
          header="Payment unsuccessful"
          content="For some reason your payment could not be completed"
          secondaryBtn={{
            theme: "outline-secondary",
            children: "Back to homepage",
            href: HomeRoutes.Home,
            size: "sm",
          }}
          primaryBtn={{
            theme: "light",
            children: "Try again",
            href: HomeRoutes.Pricing,
            size: "sm",
          }}
        />
      </section>
    </PageLayout>
  );
}

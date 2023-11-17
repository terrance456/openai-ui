"use client";
import React from "react";
import PageLayout from "@/src/components/common/PageLayout/PageLayout";
import "./pricing.scss";
import PricingCard from "@/src/components/PricingCard/PricingCard";
import { postCheckoutPaymentSession } from "@/src/apis";
import { ApiRoutes } from "@/src/constants/route";
import { ResponseCheckoutPaymentSession } from "@/src/types/post-checkout.type";
import { useToastNotificationContext } from "@/src/contexts/ToastNotificationContext";
import { ToastIndicatorType } from "@/src/components/ToastNotification/ToastNotification";
import { AxiosResponse } from "axios";
import { PricingItemType, pricingItems } from "@/src/constants/products";

export default function PricingPage() {
  const { updateToastList } = useToastNotificationContext();

  const onClick = async (product_id: string) => {
    const copyWindow = window.open() as Window;

    try {
      const res: AxiosResponse<ResponseCheckoutPaymentSession> = await postCheckoutPaymentSession(ApiRoutes.PostCheckoutPaymentSession, { product_id });
      copyWindow.location.href = res.data.url;
    } catch {
      copyWindow.close();
      updateToastList({ header: "Payment session failed", body: "Checkout payment failed, please try again later", type: ToastIndicatorType.WARNING });
    }
  };

  return (
    <PageLayout>
      <section className="pricing-page-wrapper">
        <div className="pricing-headers">
          <h3>Revolutionize Creativity with Nexusphere AI Images</h3>
          <p>Elevate your creativity with Nexusphere AI generated images. Explore pricing options below and transform your visual content effortlessly.</p>
        </div>
        <div className="pricing-cards-wrapper">
          {pricingItems.map((item: PricingItemType) => (
            <PricingCard key={item.id} {...item} onClick={onClick} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

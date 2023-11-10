"use client";
import React from "react";
import PageLayout from "@/src/components/common/PageLayout/PageLayout";
import "./pricing.scss";
import PricingCard, { PricingCardProps } from "@/src/components/PricingCard/PricingCard";
import { postCheckoutPaymentSession } from "@/src/apis";
import { ApiRoutes } from "@/src/constants/route";
import { ResponseCheckoutPaymentSession } from "@/src/types/post-checkout.type";
import { useToastNotificationContext } from "@/src/contexts/ToastNotificationContext";
import { v4 as uuidv4 } from "uuid";
import { ToastIndicatorType } from "@/src/components/ToastNotification/ToastNotification";
import { AxiosResponse } from "axios";
import { onAchorTagClick } from "@/src/utils/anchor-tag-click";

type PricingItemType = Omit<PricingCardProps, "onClick">;

const pricingItems: Array<PricingItemType> = [
  {
    id: "501",
    title: "Pixie",
    subTitle: "Best for Stunning AI-Generated Images, personal use",
    featureList: ["32 Images", "200 credits", "Free Download", " High Resolution images", "AI-Generated"],
    price: 7,
    isDeal: "Best value",
  },
  {
    id: "502",
    title: "Mystic",
    subTitle: "Unlock Advanced AI Creations, Priority Access",
    featureList: ["160 Images", "1000 credits", "Free Download", " High Resolution images", "AI-Generated"],
    price: 35,
  },
];

export default function PricingPage() {
  const { updateToastList } = useToastNotificationContext();

  const onClick = async (product_id: string) => {
    const copyWindow = window.open() as Window;

    try {
      const res: AxiosResponse<ResponseCheckoutPaymentSession> = await postCheckoutPaymentSession(ApiRoutes.PostCheckoutPaymentSession, { product_id });
      copyWindow.location.href = res.data.url;
    } catch {
      copyWindow.close();
      updateToastList({ id: uuidv4(), header: "Payment session failed", body: "Checkout payment failed, please try again later", type: ToastIndicatorType.WARNING });
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

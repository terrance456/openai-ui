"use client";
import React from "react";
import PageLayout from "@/src/components/common/PageLayout/PageLayout";
import "./pricing.scss";
import PricingCard, { PricingCardProps } from "@/src/components/PricingCard/PricingCard";

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
  const onClick = async (id: string) => {
    //fetch
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

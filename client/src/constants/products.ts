import { PricingCardProps } from "../components/PricingCard/PricingCard";

export type PricingItemType = Omit<PricingCardProps, "onClick">;

export const pricingItems: Array<PricingItemType> = [
  {
    id: "501",
    title: "Pixie",
    subTitle: "Best for Stunning AI-Generated Images, personal use",
    featureList: ["200 credits", "32 Images", "Free Download", " High Resolution images", "AI-Generated"],
    price: 7,
    isDeal: "Best value",
  },
  {
    id: "502",
    title: "Mystic",
    subTitle: "Unlock Advanced AI Creations, Priority Access",
    featureList: ["1000 credits", "160 Images", "Free Download", " High Resolution images", "AI-Generated"],
    price: 35,
  },
];

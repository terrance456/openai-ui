import React from "react";
import Button from "../common/Button/Button";
import "./pricing-card.scss";
import { BsCheckLg } from "react-icons/bs";

export interface PricingCardProps {
  id: string;
  title: string;
  subTitle: string;
  price: number;
  featureList: Array<string>;
  onClick: (id: string) => void;
}

export default function PricingCard(props: PricingCardProps) {
  const formatCurrency = new Intl.NumberFormat("en-MY", { currency: "MYR", style: "currency" });

  return (
    <div className="pricing-card-container">
      <div className="title">
        <h2>{props.title}</h2>
      </div>
      <div className="subtitle">
        <p>{props.subTitle}</p>
      </div>
      <div className="currency">
        <span>{formatCurrency.format(props.price)}</span>
      </div>
      <div className="feature-list">
        <ul>
          {props.featureList.map((feat: string, index: number) => (
            <li key={index}>
              <BsCheckLg /> {feat}
            </li>
          ))}
        </ul>
      </div>
      <Button theme="light" size="sm">
        Get started
      </Button>
    </div>
  );
}

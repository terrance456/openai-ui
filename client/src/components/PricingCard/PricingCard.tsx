"use client";
import React from "react";
import Button from "../common/Button/Button";
import "./pricing-card.scss";
import { BsCheckLg } from "react-icons/bs";
import classNames from "classnames";

export interface PricingCardProps {
  id: string;
  title: string;
  subTitle: string;
  price: number;
  featureList: Array<string>;
  onClick: (id: string) => void;
  isDeal?: string;
  isLoading?: boolean;
}

export default function PricingCard(props: PricingCardProps) {
  const formatCurrency = new Intl.NumberFormat("en-MY", { currency: "MYR", style: "currency" });

  const onClickCard = () => {
    props.onClick(props.id);
  };

  return (
    <div className={classNames("pricing-card-container", props.isDeal && "is-deal")}>
      {props.isDeal && <span className="is-deal-text">{props.isDeal}</span>}
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
      <Button theme="light" size="sm" onClick={onClickCard} disabled={props.isLoading}>
        {props.isLoading ? "Processing..." : "Get started"}
      </Button>
    </div>
  );
}

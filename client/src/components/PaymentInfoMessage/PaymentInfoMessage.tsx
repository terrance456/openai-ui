import React from "react";
import "./payment-info-message.scss";
import { BsPatchCheck } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import LinkButton, { LinkButtonProps } from "../common/LinkButton/LinkButton";
import classNames from "classnames";

interface PaymentInfoMessageProps {
  type: "success" | "cancelled";
  header: string;
  content: string;
  primaryBtn?: React.PropsWithChildren<LinkButtonProps>;
  secondaryBtn?: React.PropsWithChildren<LinkButtonProps>;
}

export default function PaymentInfoMessage(props: PaymentInfoMessageProps) {
  return (
    <div className="payment-info-message-container">
      <div className="icon">{props.type === "success" ? <BsPatchCheck className="success-icon" /> : <CiWarning className="warning-icon" />}</div>
      <h4 className="mb-3">{props.header}</h4>
      <p className="content">{props.content}</p>
      <div className={classNames("btns-wrapper", { "is-multiple": props.secondaryBtn && props.primaryBtn })}>
        {props.secondaryBtn && <LinkButton {...props.secondaryBtn} />}
        {props.primaryBtn && <LinkButton {...props.primaryBtn} />}
      </div>
    </div>
  );
}

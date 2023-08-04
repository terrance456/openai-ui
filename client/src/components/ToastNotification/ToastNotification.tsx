import { useToastNotificationContext } from "@/src/contexts/ToastNotificationContext";
import classNames from "classnames";
import React from "react";
import TimerProgressiveBar from "../common/TimerProgressiveBar/TimerProgressiveBar";
import "./toast-notification.scss";

export enum ToastIndicatorType {
  SUCCESS = "bg-success",
  WARNING = "bg-warning",
  DANGER = "bg-danger",
}

export interface ToastInfoType {
  id: string;
  className?: string;
  header: string;
  subHeader?: string;
  body: React.ReactNode;
  type: ToastIndicatorType;
}

interface ToastNotificationProps {
  data: Array<ToastInfoType>;
}

export default function ToastNotification(props: ToastNotificationProps) {
  const { removeToast } = useToastNotificationContext();

  return (
    <div className="toast-notification-wrapper toast-container">
      {props.data.map((toastData: ToastInfoType) => (
        <div key={toastData.id} className={classNames("toast show", toastData.type, toastData.className)} role="alert">
          <div className="toast-header">
            <strong className="me-auto">{toastData.header}</strong>
            <small className="text-muted">{toastData.subHeader}</small>
            <button type="button" className="btn-close" onClick={() => removeToast(toastData.id)} />
          </div>
          <div className="toast-body">{toastData.body}</div>
          <TimerProgressiveBar duration={7} />
        </div>
      ))}
    </div>
  );
}

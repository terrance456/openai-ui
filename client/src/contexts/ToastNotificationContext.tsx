"use client";
import React from "react";
import ToastNotification, { ToastIndicatorType, ToastInfoType } from "../components/ToastNotification/ToastNotification";

interface ContextReturnType {
  updateToastList: (toastInfo: ToastInfoType) => void;
  removeToast: (id: string) => void;
}

export const ToastNotificationContext = React.createContext<ContextReturnType>({} as ContextReturnType);

export const useToastNotificationContext = () => {
  return React.useContext(ToastNotificationContext);
};

export const ToastNotificationProvider = ({ children }: React.PropsWithChildren<any>) => {
  const [toastList, setToastList] = React.useState<Array<ToastInfoType>>([]);

  const updateToastList = (toastInfo: ToastInfoType) => {
    setToastList((toastData: Array<ToastInfoType>) => [...toastData, toastInfo]);
  };

  const removeToast = (id: string) => {
    setToastList((toastData: Array<ToastInfoType>) => {
      const newToastData: Array<ToastInfoType> = toastData.filter((value: ToastInfoType) => value.id !== id);
      return newToastData;
    });
  };

  return (
    <ToastNotificationContext.Provider value={{ updateToastList, removeToast }}>
      {children}
      <ToastNotification data={toastList} />
    </ToastNotificationContext.Provider>
  );
};

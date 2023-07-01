"use client";
import React from "react";
import ToastNotification, { ToastInfoType } from "../components/ToastNotification/ToastNotification";

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
  const timerRef: React.MutableRefObject<any> = React.useRef({});

  const updateToastList = (toastInfo: ToastInfoType) => {
    timerRef.current[toastInfo.id] = autoRemoveToast(toastInfo);
    setToastList((toastData: Array<ToastInfoType>) => [...toastData, toastInfo]);
  };

  const removeToast = (id: string) => {
    const timerId: NodeJS.Timeout = timerRef.current[id];
    if (typeof timerId !== "undefined") {
      clearTimeout(timerId);
    }
    setToastList((toastData: Array<ToastInfoType>) => {
      const newToastData: Array<ToastInfoType> = toastData.filter((value: ToastInfoType) => value.id !== id);
      return newToastData;
    });
  };

  const autoRemoveToast = (toastInfo: ToastInfoType) => {
    return setTimeout(() => {
      removeToast(toastInfo.id);
    }, 7000);
  };

  return (
    <ToastNotificationContext.Provider value={{ updateToastList, removeToast }}>
      {children}
      <ToastNotification data={toastList} />
    </ToastNotificationContext.Provider>
  );
};

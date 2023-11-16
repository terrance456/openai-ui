"use client";
import React from "react";
import ToastNotification, { ToastInfoType } from "../components/ToastNotification/ToastNotification";
import { v4 as uuidv4 } from "uuid";

interface ContextReturnType {
  updateToastList: (toastInfo: Omit<ToastInfoType, "id">) => void;
  removeToast: (id: string) => void;
}

export const ToastNotificationContext = React.createContext<ContextReturnType>({} as ContextReturnType);

export const useToastNotificationContext = () => {
  return React.useContext(ToastNotificationContext);
};

export const ToastNotificationProvider = ({ children }: React.PropsWithChildren<any>) => {
  const [toastList, setToastList] = React.useState<Array<ToastInfoType>>([]);
  const timerRef: React.MutableRefObject<any> = React.useRef({});

  const updateToastList = (toastInfo: Omit<ToastInfoType, "id">) => {
    const currentId: string = uuidv4();
    const info: ToastInfoType = { ...toastInfo, id: currentId };
    timerRef.current[currentId] = autoRemoveToast(info);
    setToastList((toastData: Array<ToastInfoType>) => [...toastData, info]);
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

import { useBodyScrollLock } from "@/src/hooks/useBodyScollLock";
import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";

export interface ModalProps {
  onClose?: () => void;
  toggle?: boolean;
  className?: string;
  modalPosition?: "centered" | "left" | "right";
}

export default function Modal(props: PropsWithChildren<ModalProps>) {
  const { toggleBodyOverflow } = useBodyScrollLock();

  const onClose = React.useCallback(() => {
    props.onClose && props.onClose();
  }, [props.onClose]);

  const modalContent = React.useCallback(() => {
    return (
      <div role="dialog" className={classNames("custom-modal-wrapper", props.className)}>
        <div className="custom-modal-backdrop" onClick={onClose} />
        <div className={classNames("custom-modal-content", props.modalPosition)}>{props.children}</div>
      </div>
    );
  }, [props, onClose]);

  React.useEffect(() => {
    if (props.toggle) {
      toggleBodyOverflow(true);
    }
    return () => toggleBodyOverflow(false);
  }, [props.toggle]);

  return props.toggle ? createPortal(modalContent(), document.body) : null;
}

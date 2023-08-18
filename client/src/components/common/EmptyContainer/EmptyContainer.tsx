import React from "react";
import classNames from "classnames";
import Lottie from "lottie-react";
import EmptyBox from "@/src/assets/lottie/empty-box.json";
import "./empty-container.scss";

interface EmptyContainerProps {
  text?: string;
  className?: string;
}

export default function EmptyContainer(props: EmptyContainerProps) {
  return (
    <section className={classNames("empty-container", props.className)}>
      <Lottie animationData={EmptyBox} loop={true} />
      {props.text && <p>{props.text}</p>}
    </section>
  );
}

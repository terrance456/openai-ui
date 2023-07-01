import React from "react";
import EmptySvg from "@/src/assets/svg/empty.svg";
import "./empty-container.scss";
import classNames from "classnames";

interface EmptyContainerProps {
  text?: string;
  className?: string;
}

export default function EmptyContainer(props: EmptyContainerProps) {
  return (
    <section className={classNames("empty-container", props.className)}>
      <EmptySvg />
      {props.text && <p>{props.text}</p>}
    </section>
  );
}

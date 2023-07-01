import React, { PropsWithChildren } from "react";
import "./dropdown-link.scss";

interface DropdownLinkProps {
  className?: string;
  text?: React.ReactNode;
}

export default function DropdownLink(props: PropsWithChildren<DropdownLinkProps>) {
  const [show, setShow] = React.useState<boolean>(false);

  const onDropdownClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.nativeEvent.stopImmediatePropagation();
    setShow(!show);
  };

  React.useEffect(() => {
    const onClick = () => {
      setShow(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="dropdown show">
      <button className="btn btn-outline-light dropdown-toggle" type="button" onClick={onDropdownClick}>
        {props.text}
      </button>
      {show && <ul className="dropdown-menu show">{props.children}</ul>}
    </div>
  );
}

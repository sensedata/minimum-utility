import React, {useRef, useState} from "react";

const DEFAULT_TIMEOUT = 5000;
const DEFAULT_MESSAGE = "Confirm";

export function ButtonConfirmable(props) {
  const [confirming, setConfirming] = useState(false);
  const confirmingTimeout = useRef();

  const onClick = (event) => {
    if (confirming) {
      setConfirming(false);
      confirmingTimeout.current = null;
      if (props.onClick) {
        props.onClick(event);
      }
      return;
    }

    setConfirming(true);
    confirmingTimeout.current = setTimeout(
      () => setConfirming(false),
      props.confirmingTimeoutMs ?? DEFAULT_TIMEOUT
    );
  }

  const className = `confirmable ${props.className ?? ""} ${(confirming) ? "confirming" : ""}`;

  let children = props.children;
  if (confirming) {
    children = React.createElement(
      "span", {className: "confirming-message"}, props.confirmingMessage ?? DEFAULT_MESSAGE
    );
  }
  return React.createElement("button", {...props, children, onClick, className});

  // return (
  //   <button {...props} className={className} onClick={onClick}>
  //     {confirming && (
  //       <span className="confirming-message">{props.confirmingMessage ?? DEFAULT_MESSAGE}</span>
  //     )}
  //     {!confirming && (
  //       props.children
  //     )}
  //   </button>
  // );
}

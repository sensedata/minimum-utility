import React, {useRef, useState} from "react";

const DEFAULT_TIMEOUT = 3000;

export function ButtonCopy(props) {
  const [copied, setCopied] = useState(false);
  const copiedTimeout = useRef();

  const onClick = () => {
    navigator.clipboard.writeText(props.text);
    setCopied(true);
    clearTimeout(copiedTimeout.current);
    copiedTimeout.current = setTimeout(
      () => setCopied(false),
      props.copiedTimeout ?? DEFAULT_TIMEOUT
    );
  }

  const className = `copy ${props.className ?? ""} ${(copied) ? "copied" : ""}`;

  return React.createElement("button", {...props, onClick, className});

  // return (
  //   <button {...props} className={className} onClick={handleClick}>
  //     {props.children}
  //   </button>
  // );
}

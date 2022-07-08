import React, {useState} from "react";

export function InputValidatable(props) {
  const [invalid, setInvalid] = useState(null);

  const onInvalid = (event) => {
    e.target.setCustomValidity(props.invalidMessage);
    setInvalid(true);
    if (props.onInvalid) {
      props.onInvalid(event);
    }
  }
  const onInput = (event) => {
    e.target.setCustomValidity("");
    setInvalid(false);
    if (props.onInput) {
      props.onInput(event);
    }
  }

  const className = `validatable ${(invalid) ? "in" : ""}valid ${props.className ?? ""}`;

  return React.createElement("input", {...props, onInvalid, onInput, className});
}

import React, {useState} from "react";

export function InputValidatable(props) {
  const [invalid, setInvalid] = useState(null);

  const onInvalid = (event) => {
    event.target.setCustomValidity(props.invalidMessage);
    setInvalid(true);
    if (props.onInvalid) {
      props.onInvalid(event);
    }
  }
  const onInput = (event) => {
    event.target.setCustomValidity("");
    setInvalid(false);
    if (props.onInput) {
      props.onInput(event);
    }
  }

  const className = `validatable ${(invalid) ? "in" : ""}valid ${props.className ?? ""}`;

  let cleaned = Object.assign({}, props);
  delete cleaned.invalidMessage;
  return React.createElement("input", {...cleaned, onInvalid, onInput, className});
}

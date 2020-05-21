import React from "react";

import "components/Button.scss";

const classNames = require("classnames");

export default function Button(props) {
  //function renders a button element
  let buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger, //
  });

  return (
    <button //uses props.children value as the button text
      className={buttonClass} //button element is wrapped in Button component
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

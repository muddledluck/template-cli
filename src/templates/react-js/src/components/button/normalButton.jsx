import React from "react";

function NormalButtonComponent({ children, ...rest }) {
  return <button {...rest}>{children}</button>;
}

export default NormalButtonComponent;

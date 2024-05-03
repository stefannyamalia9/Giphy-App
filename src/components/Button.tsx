import React from "react";

interface Props {
  onClick: () => void;
  label: string;
}

const Button = (props: Props) => {
  return (
    <React.Fragment>
      <button onClick={props.onClick}>{props.label}</button>
    </React.Fragment>
  );
};

export default Button;

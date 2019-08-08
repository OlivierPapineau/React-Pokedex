import React from "react";

export enum EButtonColors {
  NORMAL = "",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
  INFO = "info",
  LIGHT = "light",
  DARK = "dark",
}

interface IBsButtonProps {
  children?: JSX.Element | JSX.Element[] | string;
  color?: EButtonColors;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => any;
  outline: boolean;
  type: "submit" | "reset" | "button";
}

const BsButton = (props: IBsButtonProps) => {
  const { type, color = EButtonColors.PRIMARY, outline, onClick } = props;
  const clName = outline ? `btn btn-outline-${color}` : `btn btn-${color}`;

  return (
    <button type={type} className={clName} onClick={onClick}>
      {props.children}
    </button>
  );
};

export default BsButton;

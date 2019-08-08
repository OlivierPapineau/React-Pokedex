import React from "react";

export enum ECardColors {
  NORMAL = "",
  PRIMARY = "bg-primary",
  SECONDARY = "bg-secondary",
  SUCCESS = "bg-success",
  DANGER = "bg-danger",
  WARNING = "bg-warning",
  INFO = "bg-info",
  LIGHT = "bg-light",
  DARK = "bg-dark",
}

export interface IBsCardProps {
  cardTitle: string;
  children?: JSX.Element | JSX.Element[];
  color?: ECardColors;
  positionProp?: string; //Ex: mb-3
}

const BsCard = (props: IBsCardProps) => {
  const {
    cardTitle,
    children,
    color = ECardColors.NORMAL,
    positionProp = "mt-3",
  } = props;
  const textCls =
    color === ECardColors.NORMAL
      ? ""
      : color === ECardColors.LIGHT
      ? "text-dark"
      : "text-white";
  const clName = `card ${textCls} ${color} ${positionProp}`;

  return (
    <div className={clName}>
      <div className="card-header">{cardTitle}</div>
      {children && <div className="card-body">{children}</div>}
    </div>
  );
};

export default BsCard;

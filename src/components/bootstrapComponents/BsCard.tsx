import React from 'react';

export enum ECardColors {
  NORMAL = '',
  PRIMARY = 'bg-primary',
  SECONDARY = 'bg-secondary',
  SUCCESS = 'bg-success',
  DANGER = 'bg-danger',
  WARNING = 'bg-warning',
  INFO = 'bg-info',
  LIGHT = 'bg-light',
  DARK = 'bg-dark',
}

export interface IBsCardProps {
  cardTitle: string;
  color?: ECardColors;
  whiteText: boolean;
  positionProp?: string; //Ex: mb-3
  children?: JSX.Element | JSX.Element[];
}

const BsCard = (props: IBsCardProps) => {
  const { cardTitle, color = ECardColors.NORMAL, whiteText = 'true', positionProp } = props;
  const textColor = whiteText === true ? 'text-white' : '';
  const clName = `card ${textColor} ${color} ${positionProp}`;

  return (
    <div className={clName}>
      <div className="card-header">{cardTitle}</div>
      <div className="card-body">{props.children}</div>
    </div>
  );
};

export default BsCard;

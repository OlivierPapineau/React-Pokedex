import React from 'react';

export enum EButtonColors {
  NORMAL = '',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  LIGHT = 'light',
  DARK = 'dark',
}

interface IBsButtonProps {
  type: 'submit' | 'reset' | 'button';
  color?: EButtonColors;
  outline: boolean;
  children?: JSX.Element | JSX.Element[] | string;
}

const BsButton = (props: IBsButtonProps) => {
  const { type, color = EButtonColors.PRIMARY, outline } = props;
  const clName = outline ? `btn btn-outline-${color}` : `btn btn-${color}`;

  return (
    <button type={type} className={clName}>
      {props.children}
    </button>
  );
};

export default BsButton;

import React from "react";

interface IBsListItemProps {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
  style?: React.CSSProperties;
}

const BsListItem = (props: IBsListItemProps) => {
  const { className = "", style = {} } = props;
  const clsName = `${className} list-group-item`;

  return (
    <li className={clsName} style={style}>
      {props.children}
    </li>
  );
};

export default BsListItem;

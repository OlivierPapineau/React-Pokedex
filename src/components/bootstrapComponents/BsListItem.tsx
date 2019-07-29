import React from 'react';

interface IBsListItemProps {
  children: JSX.Element | JSX.Element[] | string;
  style?: string;
}

const BsListItem = (props: IBsListItemProps) => {
  const { style = '' } = props;
  const clName = `${style} list-group-item`;

  return <li className={clName}>{props.children}</li>;
};

export default BsListItem;

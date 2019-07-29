import React from 'react';

interface IBsListProps {
  children: JSX.Element | JSX.Element[];
  style?: string;
  listType: 'ordered' | 'unordered';
}

const BsList = (props: IBsListProps) => {
  const { style = '', listType } = props;
  const clName = `${style} list-group`;
  const listElement =
    listType === 'unordered' ? (
      <ol className={clName}>{props.children}</ol>
    ) : (
      listType === 'ordered' && <ul className={clName}>{props.children}</ul>
    );

  return <div>{listElement}</div>;
};

export default BsList;

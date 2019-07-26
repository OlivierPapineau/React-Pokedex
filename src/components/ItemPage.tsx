import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IItemPageProps extends RouteComponentProps<{ id: string }> {}

interface IItemPageState {
  item: {};
  isLoading: true;
  error: '';
}

const ItemPage = (props: IItemPageProps) => {
  const { match } = props;
  const [state, setState] = useState<{}>({});

  const fetchItemData = () => {
    fetch(`https://pokeapi.co/api/v2/item/${match.params.id}`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
      });
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>{`Item ${match.params.id}`}</h2>
    </div>
  );
};

export default ItemPage;

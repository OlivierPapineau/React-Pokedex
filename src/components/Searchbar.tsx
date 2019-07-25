import React from 'react';

interface ISearchbarProps {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  onClick: () => any;
  value: string;
}

const Searchbar = (props: ISearchbarProps) => {
  const { className, value, onChange, onClick } = props;
  const clName = `${className} form-control mr-sm-2`;

  return (
    <div>
      <form className="form-inline mb-3">
        <input
          className={clName}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={value}
          onChange={onChange}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={onClick}>
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;

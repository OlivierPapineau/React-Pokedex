import React from "react";

interface ISearchbarProps {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  onClick: (event: React.FormEvent | React.MouseEvent) => any;
  value: string;
}

const Searchbar = (props: ISearchbarProps) => {
  const { className, value, onChange, onClick } = props;
  const clName = `${className} form-control mr-sm-2`;

  return (
    <div>
      <form className="form-inline mb-3" onSubmit={onClick}>
        <input
          aria-label="Search"
          className={clName}
          name="searchBar"
          onChange={onChange}
          placeholder="Search"
          type="search"
          value={value}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="button"
          onClick={onClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;

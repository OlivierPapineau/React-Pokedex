import React from 'react';

interface ISearchbarProps {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  value: string;
}

const Searchbar = (props: ISearchbarProps) => {
  const { className, onChange, value } = props;
  const clName = `${className} form-control mr-sm-2`;

  return (
    <div>
      <form className="form-inline">
        <input
          className={clName}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={value}
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default Searchbar;

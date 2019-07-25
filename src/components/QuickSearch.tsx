import React from 'react';

interface IQuickSearchProps {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  value: string;
}

const QuickSearch = (props: IQuickSearchProps) => {
  const { className, onChange, value } = props;
  const clName = `${className} form-control`;

  return (
    <div>
      <input
        className={clName}
        type="text"
        placeholder="Search on page"
        aria-label="Search on page"
        value={value}
        onChange={onChange}
        name="quickSearch"
      />
    </div>
  );
};

export default QuickSearch;

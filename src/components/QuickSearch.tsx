import React from "react";

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
        aria-label="Search on page"
        className={clName}
        name="quickSearch"
        onChange={onChange}
        placeholder="Search on page"
        type="text"
        value={value}
      />
    </div>
  );
};

export default QuickSearch;

import React from 'react';

interface IPageSizeChangerProps {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  onClick: () => any;
  value: string;
}

const PageSizeChanger = (props: IPageSizeChangerProps) => {
  const { className, onChange, onClick, value } = props;
  const clName = `${className} form-control mr-sm-2`;

  return (
    <div>
      <form className="form-inline mb-3">
        <button className="btn btn-info my-2 my-sm-0 mr-2" type="button" onClick={onClick}>
          Change Page Size
        </button>
        <input
          className={clName}
          type="number"
          placeholder="Page Size"
          aria-label="Page Size"
          value={value}
          onChange={onChange}
          name="pageSize"
        />
      </form>
    </div>
  );
};

export default PageSizeChanger;

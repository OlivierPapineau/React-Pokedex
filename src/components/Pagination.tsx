import React from 'react';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom';

interface IPaginationProps {
  elementsPerPage: number;
  totalElements: number;
  paginate: (pageNumber: number) => any;
  className?: string;
}

type TParams = { id?: string };

const Pagination = (props: IPaginationProps) => {
  const { elementsPerPage, totalElements, paginate, className = '' } = props;
  const pageNumbers = [];
  const clName = `${className}`;

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={clName}>
      <ul className="pagination">
        {pageNumbers.map(number => {
          return (
            <li key={number} className="page-item">
              <span onClick={() => paginate(number)} className="page-link">
                {number}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;

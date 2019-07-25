import React from 'react';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom';

interface IPaginationProps {
  elementsPerPage: number;
  totalElements: number;
  offset: number;
  paginate: (pageNumber: number) => any;
  className?: string;
}

//type TParams = { id?: string };

const Pagination = (props: IPaginationProps) => {
  const { elementsPerPage, totalElements, paginate, offset, className = '' } = props;
  const pageNumbers = [];
  const clName = `${className}`;
  const numberOfPages = totalElements / elementsPerPage;

  //console.log(numberOfPages);
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={clName}>
      <ul className="pagination">
        {pageNumbers.map(number => {
          return (
            <li key={number} className="page-item">
              <span onClick={() => paginate(elementsPerPage * (number - 1))} className="page-link">
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

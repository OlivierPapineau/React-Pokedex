import React from 'react';

interface IPaginationProps {
  elementsPerPage: number;
  totalElements: number;
}

const Pagination = (props: IPaginationProps) => {
  const { elementsPerPage, totalElements } = props;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => {
          return (
            <li key={number} className="page-item">
              <a href="!#" className="page-link">
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;

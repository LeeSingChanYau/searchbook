import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePage, search } from '../../redux/searchSlice';
import type { AppDispatch, RootState } from '../../redux/store';
import './Pagination.css';

const Pagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(
    (state: RootState) => state.search.currentPage
  );
  const totalPages = useSelector((state: RootState) => state.search.totalPages);
  const firstFiveItems = [1, 2, 3, 4, 5];
  const [firstNItems, setFirstNItems] = useState<number[]>([]);
  //const lastFiveItems = [totalPages - 2, totalPages - 1, totalPages];
  const pagesBetweenCurrent = [currentPage - 1, currentPage, currentPage + 1];

  const handlePrev = () => {
    dispatch(updatePage(currentPage - 1));
    dispatch(search());
  };

  const handleNext = () => {
    dispatch(updatePage(currentPage + 1));
    dispatch(search());
  };

  const handleUpdatePage = (pageNumber: number) => {
    dispatch(updatePage(pageNumber));
    dispatch(search());
  };

  const generateArraySizeN: (n: number) => number[] = (n: number) => {
    let array: number[] = [];
    for (let i = 0; i < n; i++) {
      array.push(i + 1);
    }
    return array;
  };

  useEffect(() => {
    if (totalPages <= 5) {
      setFirstNItems(generateArraySizeN(totalPages));
    }
  }, [totalPages]);

  return (
    <div className="pagination">
      <button onClick={handlePrev}>prev</button>
      <ul className="page-list">
        {totalPages <= 6 &&
          firstNItems.map((index) => (
            <li key={index} onClick={() => handleUpdatePage(index)}>
              {index}
            </li>
          ))}
        {totalPages > 6 && currentPage < 6 && (
          <>
            {firstFiveItems.map((index) => (
              <li
                className="page-number"
                key={index}
                onClick={() => handleUpdatePage(index)}
              >
                {index}
              </li>
            ))}
            <li key="ellipsis">...</li>
            <li
              className="page-number"
              key={totalPages}
              onClick={() => handleUpdatePage(totalPages)}
            >
              {totalPages}
            </li>
          </>
        )}
        {totalPages > 6 && currentPage >= 6 && (
          <>
            <li
              className="page-number"
              key={1}
              onClick={() => handleUpdatePage(1)}
            >
              1
            </li>
            <li key="ellipsis">...</li>
            {pagesBetweenCurrent.map((index) => (
              <li
                className="page-number"
                key={index}
                onClick={() => handleUpdatePage(index)}
              >
                {index}
              </li>
            ))}
            {currentPage < totalPages - 2 && <li key="ellipsis">...</li>}
            <li
              className="page-number"
              key={totalPages}
              onClick={() => handleUpdatePage(totalPages)}
            >
              {totalPages}
            </li>
          </>
        )}
      </ul>
      <button onClick={handleNext}>next</button>
    </div>
  );
};

export default Pagination;

import React, { FC, useState } from 'react';
import './Search.css';
import { fetchBookByName } from '../../API/API';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setValue, setBooks } from '../../redux/searchSlice';
import BookItem from '../../components/BookItem/BookItem';
import { ReactComponent as Spinner } from './Spinner.svg';

const Search: FC = () => {
  const inputValue = useSelector((state: RootState) => state.search.value);
  const books = useSelector((state: RootState) => state.search.books);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setShowErrorMessage] = useState('');

  const handleSearch = () => {
    setLoading(true);
    setShowError(false);
    setShowErrorMessage('');

    fetchBookByName(inputValue)
      .then((res) => {
        dispatch(setBooks(res));
      })
      .catch((err) => {
        setShowErrorMessage(err);
        setShowError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  return (
    <div className="search-page">
      <h1>Search Page</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => dispatch(setValue(e.target.value))}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <Spinner />}
      {showError && <h2>{errorMessage}</h2>}
      <ul>
        {books.length > 0 &&
          !loading &&
          books.map((book) => <BookItem key={book.id} book={book} />)}
      </ul>
    </div>
  );
};

export default Search;

import React, { FC } from 'react';
import './Search.css';
import { fetchBookByName } from '../../API/API';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setValue, setBooks } from '../../redux/searchSlice';
import BookItem from '../../components/BookItem/BookItem';

const Search: FC = () => {
  const inputValue = useSelector((state: RootState) => state.search.value);
  const books = useSelector((state: RootState) => state.search.books);
  const dispatch = useDispatch();

  const handleSearch = () => {
    fetchBookByName(inputValue).then((res) => {
      console.log(res ? res : []);
      dispatch(setBooks(res));
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
      <ul>
        {books.length > 0 &&
          books.map((book) => <BookItem key={book.id} book={book} />)}
      </ul>
    </div>
  );
};

export default Search;

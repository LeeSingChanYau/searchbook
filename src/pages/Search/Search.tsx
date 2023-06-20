import React, { FC, useEffect, useRef, useCallback } from 'react';
import './Search.css';
import type { AppDispatch, RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setValue, search } from '../../redux/searchSlice';
import BookItem from '../../components/BookItem/BookItem';
import { ReactComponent as Spinner } from './Spinner.svg';
import Pagination from '../../components/Pagination/Pagination';
import {
  searchSuggestions,
  updateShowSuggestion,
} from '../../redux/suggestionSlice';
import _ from 'lodash';

const Search: FC = () => {
  const inputValue = useSelector((state: RootState) => state.search.value);
  const books = useSelector((state: RootState) => state.search.books);
  const isLoading = useSelector((state: RootState) => state.search.isLoading);
  const suggestions = useSelector(
    (state: RootState) => state.suggestion.suggestions
  );
  const showSuggestions = useSelector(
    (state: RootState) => state.suggestion.showSuggestion
  );

  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputTextRef = useRef<HTMLInputElement>(null);

  const myDebounce = (cb: (...args: any) => any, waitTime: number) => {
    let timer: NodeJS.Timeout;

    return (...args: any[]) => {
      const self = this;

      clearTimeout(timer);
      timer = setTimeout(() => {
        cb.apply(self, args);
      }, waitTime);
    };
  };

  const myThrottle = (cb: (...args: any) => any, waitTime: number) => {
    let lastArgs: any[] = [];
    let isThrottled = false;

    const throttledFunction = (...args: any[]) => {
      if (isThrottled) {
        lastArgs = args;
        return;
      }

      cb.apply(this, args);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;

        if (lastArgs.length > 0) {
          throttledFunction.apply(this, lastArgs);
          lastArgs = [];
        }
      }, waitTime);
    };

    return throttledFunction;
  };

  const handleSearch = () => {
    dispatch(updateShowSuggestion(false));
    dispatch(search());
  };

  const handleOnChange = useCallback(
    myThrottle((value: string) => {
      dispatch(setValue(value));
      dispatch(searchSuggestions());
      dispatch(updateShowSuggestion(true));
    }, 3000),
    []
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      dispatch(updateShowSuggestion(false));
    }
  };

  const handleInputClick = () => {
    dispatch(updateShowSuggestion(true));
  };

  const handleSuggestionClick = (item: string) => {
    dispatch(setValue(item));
    dispatch(updateShowSuggestion(false));
    dispatch(search());
  };

  const handleEnter = (event: KeyboardEvent) => {
    if (
      inputTextRef.current &&
      inputTextRef.current.contains(event.target as Node) &&
      event.key === 'Enter'
    ) {
      dispatch(updateShowSuggestion(false));
      dispatch(search());
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEnter);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEnter);
    };
  }, []);

  return (
    <div className="search-page">
      <h1>Search Page</h1>
      <div className="input-container">
        <div className="input-text-suggestions" ref={inputRef}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleOnChange(e.target.value)}
            onClick={handleInputClick}
            ref={inputTextRef}
          />
          {showSuggestions && suggestions && suggestions.length > 0 && (
            <ul className="suggestions-container">
              {suggestions.map((item, index) => (
                <li
                  className="suggestion-element"
                  key={index}
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {isLoading && <Spinner />}
      <ul>
        {books &&
          books.length > 0 &&
          !isLoading &&
          books.map((book) => <BookItem key={book.id} book={book} />)}
      </ul>
      <Pagination />
    </div>
  );
};

export default Search;

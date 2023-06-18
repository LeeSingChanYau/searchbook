import React, { FC, useState } from 'react';
import { Book } from '../../types/types';
import './BookItem.css';
import { saveWishlistToLS } from '../../redux/wishlistSlice';
import { useDispatch } from 'react-redux';

interface BookItemProps {
  book: Book;
}

const BookItem: FC<BookItemProps> = ({ book }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <li key={book.id} className="item-card">
      {book.thumbnail ? (
        <img src={book.thumbnail} alt={book.title} />
      ) : (
        <h3>N/A</h3>
      )}

      <h3>{book.title}</h3>
      {showOptions && (
        <>
          {book.authors && <h3>{book.authors.join(', ')}</h3>}
          <p>{book.description}</p>
          <button
            onClick={() => {
              console.log('Clicked!');
              dispatch(saveWishlistToLS(book));
            }}
          >
            Add to Wishlist
          </button>
        </>
      )}
      {showOptions ? (
        <div>
          <button onClick={() => setShowOptions(!showOptions)}>
            Show less
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => setShowOptions(!showOptions)}>
            Show more
          </button>
        </div>
      )}
    </li>
  );
};

export default BookItem;

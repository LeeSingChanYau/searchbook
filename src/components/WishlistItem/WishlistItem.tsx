import React, { FC, useState } from 'react';
import { Book } from '../../types/types';
import './WishlistItem.css';
import { saveWishlistToLocalStorage } from '../../redux/searchSlice';
import { useDispatch } from 'react-redux';

interface WishlistItemProps {
  book: Book;
}

const WishlistItem: FC<WishlistItemProps> = ({ book }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <li key={book.id} className="item-card">
      <img src={book.thumbnail} alt={book.title} />
      <h3>{book.title}</h3>
      {showOptions && (
        <>
          <h3>{book.authors.join(', ')}</h3>
          <p>{book.description}</p>
          <button
            onClick={() => {
              console.log('Clicked!');
              dispatch(saveWishlistToLocalStorage(book));
            }}
          >
            Remove From Wishlist
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

export default WishlistItem;

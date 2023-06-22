import React, { FC, useState } from 'react';
import { Book } from '../../types/types';
import './WishlistItem.css';
import { saveWishlistToLS } from '../../redux/wishlistSlice';
import { useDispatch } from 'react-redux';

interface WishlistItemProps {
  book: Book;
}

const WishlistItem: FC<WishlistItemProps> = ({ book }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <li key={book.id} className="item-card" data-testid={book.id}>
      <img src={book.thumbnail} alt={book.title} />
      <h3>{book.title}</h3>
      {showOptions && (
        <>
          <h3>{book.authors.join(', ')}</h3>
          <p>{book.description}</p>
          <button
            data-testid={`Remove-${book.id}`}
            onClick={() => {
              console.log('Clicked!');
              dispatch(saveWishlistToLS(book));
            }}
          >
            Remove From Wishlist
          </button>
        </>
      )}
      {showOptions ? (
        <div>
          <button
            data-testid={`ShowLess-${book.id}`}
            onClick={() => setShowOptions(!showOptions)}
          >
            Show less
          </button>
        </div>
      ) : (
        <div>
          <button
            data-testid={`ShowMore-${book.id}`}
            onClick={() => setShowOptions(!showOptions)}
          >
            Show more
          </button>
        </div>
      )}
    </li>
  );
};

export default WishlistItem;

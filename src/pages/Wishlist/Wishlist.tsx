import React, { FC } from 'react';
import './Wishlist.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import WishlistItem from '../../components/WishlistItem/WishlistItem';

const Wishlist: FC = () => {
  const wishlist = useSelector((state: RootState) => state.search.wishlist);

  return (
    <div className="wishlist-page">
      <h1>Wishlist</h1>
      <ul>
        {wishlist.length > 0 ? (
          wishlist.map((book) => {
            return <WishlistItem book={book} />;
          })
        ) : (
          <li>No Items in wishlist. Add Items to wishlist</li>
        )}
      </ul>
    </div>
  );
};

export default Wishlist;

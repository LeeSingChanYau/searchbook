import React, { FC, useEffect } from 'react';
import './Wishlist.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import WishlistItem from '../../components/WishlistItem/WishlistItem';
import { initWishlist } from '../../redux/searchSlice';

const Wishlist: FC = () => {
  const wishlist = useSelector((state: RootState) => state.search.wishlist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initWishlist());
  }, []);

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

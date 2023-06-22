import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div className="navbar">
        <Link
          data-testid="search-link"
          to="/search"
          style={{ textDecoration: 'none' }}
        >
          <h3>Search</h3>
        </Link>
        <Link
          data-testid="wishlist-link"
          to="/wishlist"
          style={{ textDecoration: 'none' }}
        >
          <h3>Wishlist</h3>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;

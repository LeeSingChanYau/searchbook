import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// React Router v5

test('full app rendering/navigating', async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  expect(screen.getByText('Search Page')).toBeInTheDocument();
});

test('Navigation to links work', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  const searchLink = screen.getByTestId('search-link');
  const wishlistLink = screen.getByTestId('wishlist-link');

  fireEvent.click(wishlistLink);
  expect(screen.getByText('Wishlist Page')).toBeInTheDocument();
  fireEvent.click(searchLink);
  expect(screen.getByText('Search Page')).toBeInTheDocument();
});

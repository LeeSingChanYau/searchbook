/* eslint-disable no-restricted-globals */
import '@testing-library/jest-dom';
import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Wishlist from './Wishlist';
import { Provider } from 'react-redux';
import searchSlice from '../../redux/searchSlice';
import wishlistSlice from '../../redux/wishlistSlice';
import { configureStore } from '@reduxjs/toolkit';

const createMockStore = (
  preloadedState = {
    search: {
      value: '',
      books: [],
      suggestions: [],
      isLoading: false,
      itemsPerPage: 20,
      totalPages: 1,
      currentPage: 1,
    },
    wishlist: {
      books: [],
    },
  }
) => {
  return configureStore({
    reducer: {
      search: searchSlice,
      wishlist: wishlistSlice,
    },
    preloadedState,
  });
};

let mockWishlistBooks = [
  {
    id: 'gDnuBQAAQBAJ',
    title: 'Messi',
    subtitle: 'The must-read biography of the World Cup champion',
    authors: ['Guillem Balague'],
    publishedDate: '2013-12-05',
    description:
      "UPDATED TO INCLUDE MESSI'S FIRST SEASON AT PSG The story of the 2022 World Cup Champion and one of the greatest footballers of all time, Argentina's Lionel Messi. 'I have seen the player who will inherit my place in Argentine football and his name is Messi' Diego Maradona On 10 August 2021, Lionel Messi's beautiful Barcelona fairy tale came to an end as he completed a dramatic move to Paris Saint-Germain. Despite flourishing in the blue and white of the national side, delivering Argentina their first silverware in twenty-eight years - beating Brazil on their home soil to win the Copa América - Messi endured a difficult first season in Paris. Guillem Balagué has had unprecedented access to Messi's inner circle including the player himself: his coaches, team-mates and family. From tracing the origins of Messi's precocious talent in Rosario, Argentina, to chronicling his peerless seventeen-season career at Barcelona, and his tumultuous Parisian adventure, Guillem presents an authoritative and compelling account of an enigmatic footballing genius. 'I can tell my grandkids one day that I coached Lionel Messi' Pep Guardiola",
    thumbnail:
      'http://books.google.com/books/content?id=gDnuBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  },
  {
    id: 'p1FHAwAAQBAJ',
    title: 'Cristiano Ronaldo - The Rise of a Winner',
    subtitle: '',
    authors: ['Sole Books', 'Michael Part'],
    publishedDate: '2014-03-27',
    description:
      'Cristiano Ronaldo - The Rise of a Winner is the gripping life story of a boy who rose from the streets of Madeira to become one of the greatest soccer players ever. A heartfelt, startling tale of his journey to glory and what made him the man he is.',
    thumbnail:
      'http://books.google.com/books/content?id=p1FHAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  },
];

describe('wishlist', () => {
  test('renders the component without errors', () => {
    render(
      <Provider store={createMockStore()}>
        <Wishlist />
      </Provider>
    );
    expect(screen.getByText('Wishlist Page')).toBeInTheDocument();
  });

  test('renders message when no items are in wishlist', () => {
    render(
      <Provider store={createMockStore()}>
        <Wishlist />
      </Provider>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const liEl = screen.getAllByRole('listitem');
    expect(liEl).toHaveLength(1);
    expect(
      screen.getByText(`No Items in wishlist. Add Items to wishlist`)
    ).toBeInTheDocument();
  });

  test('renders books when there are books in the wishlist', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => {
          return JSON.stringify(mockWishlistBooks);
        }),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    render(
      <Provider store={createMockStore()}>
        <Wishlist />
      </Provider>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    let liEls = screen.getAllByRole('listitem');
    expect(liEls).toHaveLength(2);
    /*     await waitFor(() => {
            liEls = screen.getAllByRole("listitem");
            expect(liEls).toHaveLength(2);
        }); */
  });

  test('updates wishlist after removing book item.', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => {
          return JSON.stringify(mockWishlistBooks);
        }),
        setItem: jest.fn((key, value) => {
          if (key === 'wishlist') {
            mockWishlistBooks = JSON.parse(value);
          }
        }),
      },
      writable: true,
    });
    render(
      <Provider store={createMockStore()}>
        <Wishlist />
      </Provider>
    );

    let liEls = screen.getAllByRole('listitem');
    expect(liEls).toHaveLength(2);

    let showMoreEl = screen.getByTestId('ShowMore-p1FHAwAAQBAJ');
    fireEvent.click(showMoreEl);

    let removeEl = screen.getByTestId('Remove-p1FHAwAAQBAJ');
    fireEvent.click(removeEl);

    await waitFor(() => {
      liEls = screen.getAllByRole('listitem');
      expect(liEls).toHaveLength(1);
    });
  });
});

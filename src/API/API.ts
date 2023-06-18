import axios from 'axios';
import { Result, Book } from '../types/types';

export const fetchBookByName = async (
  query: string,
  currentPage: number,
  itemsPerPage: number
): Promise<Result> => {
  try {
    // currentPage, itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const maxResults = itemsPerPage;
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`
    );
    const books: Result = {
      items: res.data.items.map((item: any) => {
        const volumeInfo = item.volumeInfo;
        const book: Book = {
          id: item.id,
          title: volumeInfo.title,
          subtitle: volumeInfo.subtitle,
          authors: volumeInfo.authors,
          publishedDate: volumeInfo.publishedDate,
          description: volumeInfo.description,
          thumbnail: volumeInfo.imageLinks
            ? volumeInfo.imageLinks.thumbnail
            : undefined,
        };
        return book;
      }),
      kind: res.data.kind,
      totalItems: res.data.totalItems,
    };
    console.log(books);
    return books;
  } catch (err) {
    console.log(err);
    return { items: [], kind: '', totalItems: 0 };
  }
};

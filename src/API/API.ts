import axios from 'axios';
import { Book } from '../types/types';

export const fetchBookByName = async (query: string): Promise<Book[]> => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=20`
    );
    const books: Book[] = res.data.items.map((item: any) => {
      const volumeInfo = item.volumeInfo;
      const book: Book = {
        id: item.id,
        title: volumeInfo.title,
        subtitle: volumeInfo.subtitle,
        authors: volumeInfo.authors,
        publishedDate: volumeInfo.publishedDate,
        description: volumeInfo.description,
        thumbnail: volumeInfo.imageLinks.thumbnail,
      };
      return book;
    });

    return books;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  publishedDate: string;
  description: string;
  thumbnail?: string;
}

export interface Result {
  items: Book[];
  kind: string;
  totalItems: number;
}

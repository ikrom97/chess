import { Pagination } from './pagination';

export type Article = {
  id: number;
  image: string;
  thumbImage: string;
  date: string;
  title: string;
  content: string;
  slug: string;
}

export type Articles = Article[]

export type ArticlesData = {
  sort: string;
  order: string;
  count: number;
  page: number;
  keyword?: string;
  onSuccess: (data: { articles: Article[], pagination: Pagination }) => void;
}

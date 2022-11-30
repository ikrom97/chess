import { Pagination } from './pagination';

export type News = {
  id: number;
  image: string;
  thumbImage: string;
  date: string;
  title: string;
  content: string;
  slug: string;
}

export type NewsData = {
  sort: string;
  order: string;
  count: number;
  page: number;
  keyword: string;
  onSuccess: (data: { news: News[], pagination: Pagination }) => void;
}

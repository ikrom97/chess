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
  orderby: string;
  ordertype: string;
  count: number;
  page: number;
  onSuccess: (data: { news: News[], pagination: Pagination }) => void;
}

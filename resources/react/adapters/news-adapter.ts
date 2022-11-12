import { News } from '../types/news';

type ServerNews = {
  id: number;
  image: string;
  thumb_image: string;
  date: string;
  title: string;
  content: string;
  slug: string;
}

export const adaptNewsToClient = (serverNews: ServerNews): News => ({
  id: serverNews.id,
  image: serverNews.image,
  thumbImage: serverNews.thumb_image,
  date: serverNews.date,
  title: serverNews.title,
  content: serverNews.content,
  slug: serverNews.slug,
});

export const adaptNewsArrayToClient = (serverNews: ServerNews[]): News[] =>
  serverNews.map((news) => adaptNewsToClient(news));

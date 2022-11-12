import { Article, Articles } from '../types/article';

type ServerArticle = {
  id: number;
  image: string;
  thumb_image: string;
  date: string;
  title: string;
  content: string;
  slug: string;
}

type ServerArticles = ServerArticle[];

export const adaptArticleToClient = (serverArticle: ServerArticle): Article => ({
  id: serverArticle.id,
  image: serverArticle.image,
  thumbImage: serverArticle.thumb_image,
  date: serverArticle.date,
  title: serverArticle.title,
  content: serverArticle.content,
  slug: serverArticle.slug,
});

export const adaptArticlesToClient = (serverArticles: ServerArticles): Articles =>
  serverArticles.map((serverArticle) => adaptArticleToClient(serverArticle));

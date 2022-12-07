import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { fetchArticleBySlug } from '../../store/api-actions/articles-api-actions';
import { Article } from '../../types/article';

function ArticlesSelectedScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const slug = params.slug;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    slug && dispatch(fetchArticleBySlug({ slug, onSuccess: setArticle }));
  }, [dispatch, slug]);

  if (!article) {
    return <div></div>;
  }

  return (
    <main className="articles-selected-screen container">
      <h1 className="articles-selected-screen__category">Статьи</h1>

      <img
        className="articles-selected-screen__image"
        src={article?.image}
        width={600}
        height={340}
        alt={article?.title}
        loading="lazy"
      />

      <div className="articles-selected-screen__right">
        <time
          className="articles-selected-screen__time"
          dateTime={article?.date}
        >
          {dayjs(article?.date).format('DD.MM.YYYY')}
        </time>

        <h2 className="articles-selected-screen__title">{article?.title}</h2>

        <div className="articles-selected-screen__body">{article && parse(article.content)}</div>

        <Link className="articles-selected-screen__all" to={AppRoute.ARTICLES}>
          Вернуться ко всем статьям
        </Link>
      </div>
    </main>
  );
}

export default ArticlesSelectedScreen;

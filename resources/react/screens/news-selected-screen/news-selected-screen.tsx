import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { fetchNewsBySlug } from '../../store/api-actions/news-api-actions';
import { News } from '../../types/news';

function NewsSelectedScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const slug = params.slug;
  const [news, setNews] = useState<News | null>(null);

  useEffect(() => {
    slug && dispatch(fetchNewsBySlug({ slug, onSuccess: setNews }));
  }, [dispatch, slug]);

  return (
    <main className="news-selected-screen container">
      <h1 className="news-selected-screen__category">Новости</h1>

      <img
        className="news-selected-screen__image"
        src={news?.image}
        width={600}
        height={340}
        alt={news?.title}
        loading="lazy"
      />

      <div className="news-selected-screen__right">
        <time className="news-selected-screen__time" dateTime={news?.date}>
          {dayjs(news?.date).format('DD.MM.YYYY')}
        </time>

        <h2 className="news-selected-screen__title">{news?.title}</h2>

        <div className="news-selected-screen__body">{news && parse(news.content)}</div>

        <Link className="news-selected-screen__all" to={AppRoute.NEWS}>
          Вернуться ко всем новостям
        </Link>
      </div>
    </main>
  );
}

export default NewsSelectedScreen;

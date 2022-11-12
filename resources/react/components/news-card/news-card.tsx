import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { News } from '../../types/news';
import parse from 'html-react-parser';
import dayjs from 'dayjs';

type NewsCardProps = {
  news: News;
}

function NewsCard({ news }: NewsCardProps): JSX.Element {
  const { thumbImage, date, title, content, slug } = news;

  return (
    <article className="news-card">
      <img
        className="news-card__image"
        src={thumbImage}
        width={300}
        height={169}
        alt={title}
        loading="lazy"
      />

      <div className="news-card__inner">
        <time className="news-card__time" dateTime={date}>
          {dayjs(date).format('DD.MM.YYYY')}
        </time>

        <h3 className="news-card__title">{title}</h3>

        <div className="news-card__description">{parse(content)}</div>

        <Link
          className="news-card__button button"
          to={generatePath(AppRoute.NEWS_SELECTED, { slug })}
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
}

export default NewsCard;

import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Article } from '../../types/article';
import parse from 'html-react-parser';
import dayjs from 'dayjs';

type ArticleCardProps = {
  article: Article;
}

function ArticlesCard({ article }: ArticleCardProps): JSX.Element {
  const { thumbImage, date, title, content, slug } = article;

  return (
    <article className="articles-card">
      <img
        className="articles-card__image"
        src={thumbImage}
        width={300}
        height={169}
        alt={title}
        loading="lazy"
      />

      <div className="articles-card__inner">
        <time className="articles-card__time" dateTime={date}>
          {dayjs(date).format('DD.MM.YYYY')}
        </time>

        <h3 className="articles-card__title">{title}</h3>

        <div className="articles-card__description">{parse(content)}</div>

        <Link
          className="articles-card__button button"
          to={generatePath(AppRoute.ARTICLES_SELECTED, { slug })}
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
}

export default ArticlesCard;

import { Link } from 'react-router-dom';

function PageFooter(): JSX.Element {
  return (
    <footer className="page-footer">
      <div className="page-footer__container container">
        <section className="page-footer__links">
          <h2 className="page-footer__links-title">Полезные ссылки:</h2>

          <ul className="page-footer__links-list">
            <li className="page-footer__links-item">
              <Link to="#">Президент Республики Таджикистан</Link>
            </li>
            <li className="page-footer__links-item">
              <Link to="#">Федерация Футбола Таджикистана</Link>
            </li>
            <li className="page-footer__links-item">
              <Link to="#">World Chess Federation</Link>
            </li>
            <li className="page-footer__links-item">
              <Link to="#">Шахматные турниры</Link>
            </li>
            <li className="page-footer__links-item">
              <Link to="#">ChessPro</Link>
            </li>
            <li className="page-footer__links-item">
              <Link to="#">Олимпийский Комитет Республики Таджикистан</Link>
            </li>
            <li className="page-footer__links-item">
              <Link to="#">Варзиш-Спорт</Link>
            </li>
            <li className="page-footer__links-item">
              <Link to="#">Новости шахмата</Link>
            </li>
            <li className="page-footer__links-item">
              <Link to="#">Шахматы на Евроспорте</Link>
            </li>
            <li className="page-footer__links-item">
              <Link to="#">Сrestbook</Link>
            </li>
          </ul>
        </section>

        <div className="page-footer__details">
          <Link className="page-footer__detail" to="#">
            <span className="page-footer__detail-icon">
              <svg width={20} height={20}>
                <use xlinkHref="#location" />
              </svg>
            </span>
            <p>734000, Республика Таджикистан, <br /> ул. Шамси 4 «Б»</p>
          </Link>

          <div className="page-footer__detail">
            <span className="page-footer__detail-icon">
              <svg width={19} height={20}>
                <use xlinkHref="#phone" />
              </svg>
            </span>
            <p>
              <a href="tel:+992936000169">+992 93 600 01 69</a> <br />
              <a href="tel:+992988624900">+992 98 862 49 00</a>
            </p>
          </div>

          <div className="page-footer__detail">
            <span className="page-footer__detail-icon">
              <svg width={20} height={16}>
                <use xlinkHref="#email" />
              </svg>
            </span>
            <p>
              <a href="mailto:info@tjchess.tj">info@tjchess.tj</a> <br />
              <a href="mailto:marketing@tjchess.tj">marketing@tjchess.tj</a>
            </p>
          </div>
        </div>
      </div>

      <p className="page-footer__copyright">2022© Все права защищены</p>
    </footer>
  );
}

export default PageFooter;

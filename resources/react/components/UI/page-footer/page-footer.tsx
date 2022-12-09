import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function PageFooter(): JSX.Element {
  return (
    <footer className="page-footer">
      <div className="page-footer__container container">
        <section className="page-footer__links">
          <h2 className="page-footer__links-title">Полезные ссылки:</h2>

          <ul className="page-footer__links-list">
            <li className="page-footer__links-item">
              <a href="http://president.tj/" target="blank">Президент Республики Таджикистан</a>
            </li>
            <li className="page-footer__links-item">
              <a href="https://fft.tj/" target="blank">Федерация Футбола Таджикистана</a>
            </li>
            <li className="page-footer__links-item">
              <a href="https://www.fide.com/" target="blank">World Chess Federation</a>
            </li>
            <li className="page-footer__links-item">
              <a href="https://chessok.net/chess_news/" target="blank">Шахматные турниры</a>
            </li>
            <li className="page-footer__links-item">
              <a href="https://chesspro.ru/" target="blank">ChessPro</a>
            </li>
            <li className="page-footer__links-item">
              <a href="http://www.olympic.tj/" target="blank">Олимпийский Комитет Республики Таджикистан</a>
            </li>
            <li className="page-footer__links-item">
              <a href="http://www.varzish-sport.tj/" target="blank">Варзиш-Спорт</a>
            </li>
            <li className="page-footer__links-item">
              <a href="http://chess-news.ru/" target="blank">Шахматные новости</a>
            </li>
            <li className="page-footer__links-item">
              <a href="http://www.eurosport.ru/chess/" target="blank">Шахматы на Евроспорте</a>
            </li>
            <li className="page-footer__links-item">
              <a href="https://www.crestbook.com/" target="blank">Сrestbook</a>
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
            <p>734000, Республика Таджикистан, <br /> г. Душанбе, ул. Шамси 4Б</p>
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
            </p>
          </div>
        </div>
      </div>

      <p className="page-footer__copyright">{dayjs().format('YYYY')}© Все права защищены</p>
    </footer>
  );
}

export default PageFooter;

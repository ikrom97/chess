function ChessmenSection(): JSX.Element {
  return (
    <section className="chessmen-section">
      <h2 className="visually-hidden">Шахматные фигуры</h2>

      <ul className="chessmen-section__list">
        <li className="chessmen-section__item">
          <h3 className="chessmen-section__name">
            <small className="chessmen-section__figure">Фигура</small> Король
          </h3>
          <p className="chessmen-section__description">
            Самая ценная фигура, поскольку неустранимая угроза взятия (эта ситуация называется «мат») означает проигрыш партии. Ходит на одно поле по вертикали, горизонтали или диагонали, но не может ходить на поле, находящееся под ударом другой фигуры (ходить «под шах»).
          </p>
          <img
            className="chessmen-section__image"
            src="/images/king.webp"
            alt="Фигура король"
            width={155}
            height={401}
            loading="lazy"
          />
        </li>

        <li className="chessmen-section__item">
          <h3 className="chessmen-section__name">
            <small className="chessmen-section__figure">Фигура</small> Ферзь
          </h3>
          <p className="chessmen-section__description">
            Самая сильная фигура, поскольку ходит на любое число полей по вертикали, горизонтали
            или диагонали — соединяет в себе ходы ладьи и слона. Изначально (в старом арабском
            шатрандже) ферзь ходил лишь на одно поле по диагонали и был слабой фигурой.
          </p>
          <img
            className="chessmen-section__image"
            src="/images/queen.webp"
            alt="Фигура ферзь"
            width={155}
            height={361}
            loading="lazy"
          />
        </li>

        <li className="chessmen-section__item">
          <h3 className="chessmen-section__name">
            <small className="chessmen-section__figure">Фигура</small> Слон
          </h3>
          <p className="chessmen-section__description">
            В чатуранге и шатрандже ходил через одно поле по диагонали, являясь, как и конь,
            «прыгающей» фигурой (при ходе перешагивал через свои и чужие фигуры, стоящие на
            пути). В силу раскраски шахматной доски, слон перемещается только по полям одного
            цвета.
          </p>
          <img
            className="chessmen-section__image"
            src="/images/bishop.webp"
            alt="Фигура слон"
            width={139}
            height={282}
            loading="lazy"
          />
        </li>

        <li className="chessmen-section__item">
          <h3 className="chessmen-section__name">
            <small className="chessmen-section__figure">Фигура</small> Ладья
          </h3>
          <p className="chessmen-section__description">
            Ходит на любое число полей по вертикали или горизонтали. Может участвовать в рокировке.
            В начале партии у каждого игрока по две ладьи, расположенные на крайних полях первой
            или восьмой горизонталей — белые ладьи на a1 и h1, чёрные на a8 и h8.
          </p>
          <img
            className="chessmen-section__image"
            src="/images/rook.webp"
            alt="Фигура ладья"
            width={141}
            height={253}
            loading="lazy"
          />
        </li>

        <li className="chessmen-section__item">
          <h3 className="chessmen-section__name">
            <small className="chessmen-section__figure">Фигура</small> Конь
          </h3>
          <p className="chessmen-section__description">
            Может пойти на одно из полей, ближайших к тому, на котором он стоит, но не на той же
            самой горизонтали, вертикали или диагонали. Всегда попадает на поле противоположного
            цвета. Одна из двух фигур, ход которой не изменился со времён чатуранги.
          </p>
          <img
            className="chessmen-section__image"
            src="/images/knight.webp"
            alt="Фигура конь"
            width={154}
            height={270}
            loading="lazy"
          />
        </li>

        <li className="chessmen-section__item">
          <h3 className="chessmen-section__name">
            <small className="chessmen-section__figure">Фигура</small> Пешка
          </h3>
          <p className="chessmen-section__description">
            Ходит на одно поле по вертикали вперёд. Из исходного положения может также сделать
            первый ход на два поля вперёд. Бьёт на одно поле по диагонали вперёд. При выполнении
            хода на два поля может быть следующим ходом взята на проходе пешкой противника.
          </p>
          <img
            className="chessmen-section__image"
            src="/images/pawn.webp"
            alt="Фигура пешка"
            width={135}
            height={232}
            loading="lazy"
          />
        </li>
      </ul>
    </section>
  );
}

export default ChessmenSection;

function ContactsScreen(): JSX.Element {
  return (
    <main className="contacts-screen container">
      <h1 className="contacts-screen__title">Контакты</h1>

      <p className="contacts-screen__description">
        Для связи с нами, предложений и пожеланий, а также для более оперативного получения информации о деятельности Федерации шахмат Таджикистана представляем контактные номера и электронную почту. Наши двери в Душанбе всегда открыты для новых идей.
      </p>

      <dl className="contacts-screen__details details">
        <div className="details__item">
          <dt className="details__term">
            Адрес офиса:
            <span className="details__icon">
              <svg width={20} height={20}>
                <use xlinkHref="#location" />
              </svg>
            </span>
          </dt>

          <dd className="details__definition">
            734000, Республика Таджикистан, <br />
            г. Душанбе, ул. Шамси 4Б
          </dd>
        </div>

        <div className="details__item">
          <dt className="details__term">
            Телефон:
            <span className="details__icon">
              <svg width={19} height={20}>
                <use xlinkHref="#phone" />
              </svg>
            </span>
          </dt>

          <dd className="details__definition">+992 93 600 01 69</dd>
          <dd className="details__definition">+992 98 862 49 00</dd>
        </div>

        <div className="details__item">
          <dt className="details__term">
            Электронная почта:
            <span className="details__icon">
              <svg width={20} height={16}>
                <use xlinkHref="#email" />
              </svg>
            </span>
          </dt>

          <dd className="details__definition">info@tjchess.tj</dd>
          <dd className="details__definition">marketing@tjchess.tj</dd>
        </div>
      </dl>

      <div className="contacts-screen__map">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3119.0997071837996!2d68.7494225797177!3d38.577551683506165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b5d226118d0233%3A0x464642d757c4b337!2zU3BpdGFtZW4gQmFuaywg0YPQuy4g0KjQsNC80YHQuCA0LCDQlNGD0YjQsNC90LHQtSwg0KLQsNC00LbQuNC60LjRgdGC0LDQvQ!5e0!3m2!1sru!2s!4v1667397782047!5m2!1sru!2s"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        >
        </iframe>
      </div>
    </main>
  );
}

export default ContactsScreen;

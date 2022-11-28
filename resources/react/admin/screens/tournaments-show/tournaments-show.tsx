import { useState } from 'react';
import { Tournament } from '../../../types/tournament';

function TournamentsShow(): JSX.Element {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [title, setTitle] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [tel1, setTel1] = useState<string>('');
  const [tel2, setTel2] = useState<string>('');
  const [email1, setEmail1] = useState<string>('');
  const [email2, setEmail2] = useState<string>('');

  return (
    <main>
      <form className="form">
        <div className="form__element form__element--wide">
          <input
            className="form__field"
            id="title"
            type="text"
            name="title"
            placeholder="Lorem ipsum, dolor sit amet consectetur"
            required
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
          <label className="form__label" htmlFor="title">Заголовок</label>
        </div>

        <div className="form__element form__element--image">
          <label className="form__field form__field--image">
            <input
              className="visually-hidden"
              type="file"
              name="image"
              accept=".jpeg, .jpg, .webp"
              onChange={(evt) => evt.target.files && setImage(URL.createObjectURL(evt.target.files[0]))}
              required
            />
            {!image &&
              <>
                <span className="form__upload-icon">
                  <svg width={24} height={24}>
                    <use xlinkHref="#upload" />
                  </svg>
                </span>
                <span className="form__upload-text">Нажмите сюда чтобы загрузить картинку</span>
                <span className="form__upload-requirements">
                  (Формат: .jpg, .jpeg, .webp | Разрешение: 640x360)
                </span>
              </>}
            {image &&
              <>
                <span className="form__label">Картинка</span>
                <img
                  className="form__image"
                  src={image}
                  width={300}
                  height={169}
                  alt="Tournament poster"
                />
              </>}
          </label>
        </div>

        <div className="form__element">
          <input
            className="form__field"
            id="date"
            type="datetime-local"
            name="date"
            required
            value={dateTime}
            onChange={(evt) => setDateTime(evt.target.value)}
          />
          <label className="form__label" htmlFor="date">Дата проведения</label>
        </div>

        <div className="form__element">
          <input
            className="form__field"
            id="address"
            type="text"
            name="address"
            required
            placeholder="734000, Республика Таджикистан, ул. Шамси 4 «Б»"
            value={address}
            onChange={(evt) => setAddress(evt.target.value)}
          />
          <label className="form__label" htmlFor="address">Адрес</label>
        </div>

        <div className="form__element">
          <input
            className="form__field"
            id="tel-1"
            type="text"
            name="tel_1"
            required
            placeholder="+992 93 600 01 69"
            value={tel1}
            onChange={(evt) => setTel1(evt.target.value)}
          />
          <label className="form__label" htmlFor="tel-1">Тел 1</label>
        </div>

        <div className="form__element">
          <input
            className="form__field"
            id="email-1"
            type="email"
            name="email_1"
            required
            placeholder="info@tjchess.tj"
            value={email1}
            onChange={(evt) => setEmail1(evt.target.value)}
          />
          <label className="form__label" htmlFor="email-1">E-mail 1</label>
        </div>

        <div className="form__element">
          <input
            className="form__field"
            id="tel-2"
            type="text"
            name="tel_2"
            required
            placeholder="+992 98 862 49 00"
            value={tel2}
            onChange={(evt) => setTel2(evt.target.value)}
          />
          <label className="form__label" htmlFor="tel-2">Тел 2 (Необязательно)</label>
        </div>

        <div className="form__element">
          <input
            className="form__field"
            id="email-2"
            type="email"
            name="email_2"
            required
            placeholder="marketing@tjchess.tj"
            value={email2}
            onChange={(evt) => setEmail2(evt.target.value)}
          />
          <label className="form__label" htmlFor="email-2">E-mail 2 (Необязательно)</label>
        </div>

        <div className="form__element form__element--text">
          <textarea className="form__field form__field--text" name="content"></textarea>
          <label className="form__label" htmlFor="content">Контент</label>
        </div>
      </form>
    </main >
  );
}

export default TournamentsShow;

import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { useAppDispatch } from '../../../hooks';
import { fetchTournamentBySlug, storeTournament, updateTournament } from '../../../store/api-actions/tournaments-api-actions';
import { Tournament } from '../../../types/tournament';

function TournamentsShow(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [title, setTitle] = useState<string>(tournament?.title ?? '');
  const [dateTime, setDateTime] = useState<string>(tournament?.date ?? '');
  const [image, setImage] = useState(tournament?.image ?? '');
  const [address, setAddress] = useState<string>(tournament?.ticket?.address ?? '');
  const [tel1, setTel1] = useState<string>(tournament?.ticket?.tel1 ?? '');
  const [tel2, setTel2] = useState<string>(tournament?.ticket?.tel2 ?? '');
  const [email1, setEmail1] = useState<string>(tournament?.ticket?.email1 ?? '');
  const [email2, setEmail2] = useState<string>(tournament?.ticket?.email2 ?? '');
  const [content, setContent] = useState<string>(tournament?.content ?? '');

  const resetForm = () => {
    setTitle(tournament?.title ?? '');
    setDateTime(tournament?.date ?? '');
    setImage(tournament?.image ?? '');
    setAddress(tournament?.ticket?.address ?? '');
    setTel1(tournament?.ticket?.tel1 ?? '');
    setTel2(tournament?.ticket?.tel2 ?? '');
    setEmail1(tournament?.ticket?.email1 ?? '');
    setEmail2(tournament?.ticket?.email2 ?? '');
    setContent(tournament?.content ?? '');
  };

  const handleFormSubmit = (evt: BaseSyntheticEvent) => {
    evt.preventDefault();

    if (!tournament) {
      dispatch(storeTournament({
        form: new FormData(evt.target),
        onSuccess() {
          setTitle('');
          setDateTime('');
          setImage('');
          setAddress('');
          setTel1('');
          setTel2('');
          setEmail1('');
          setEmail2('');
          setContent('');
        },
      }));
      return;
    }

    dispatch(updateTournament({
      form: new FormData(evt.target),
      onSuccess(updatedTournament) {
        setTitle(updatedTournament.title);
        setDateTime(updatedTournament.date);
        setImage(updatedTournament.image);
        setAddress(updatedTournament.ticket?.address ?? '');
        setTel1(updatedTournament.ticket?.tel1 ?? '');
        setTel2(updatedTournament.ticket?.tel2 ?? '');
        setEmail1(updatedTournament.ticket?.email1 ?? '');
        setEmail2(updatedTournament.ticket?.email2 ?? '');
        setContent(updatedTournament.content);
      },
    }));
  };

  useEffect(() => {
    slug && dispatch(fetchTournamentBySlug({
      slug,
      onSuccess(data) {
        setTournament(data);
        setTitle(data.title);
        setDateTime(data.date);
        setImage(data.image);
        setAddress(data.ticket?.address ?? '');
        setTel1(data.ticket?.tel1 ?? '');
        setTel2(data.ticket?.tel2 ?? '');
        setEmail1(data.ticket?.email1 ?? '');
        setEmail2(data.ticket?.email2 ?? '');
        setContent(data.content);
      },
    }));
  }, [dispatch, slug]);

  return (
    <main>
      <form className="form" onSubmit={handleFormSubmit}>
        {tournament && <input type="hidden" name="id" value={tournament.id} />}

        <div className="form__grid">
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
                required={!tournament}
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
              placeholder="marketing@tjchess.tj"
              value={email2}
              onChange={(evt) => setEmail2(evt.target.value)}
            />
            <label className="form__label" htmlFor="email-2">E-mail 2 (Необязательно)</label>
          </div>
        </div>

        <div className="form__text-editor">
          <span className="form__editor-label">Контент</span>
          <DefaultEditor value={content} onChange={(evt) => setContent(evt.target.value)} />
          <textarea
            className="visually-hidden"
            name="content"
            value={content}
            onChange={(evt) => setContent(evt.target.value)}
            required
          >
          </textarea>
        </div>

        <div className="form__grid">
          <div className="form__buttons">
            <button
              className="form__button form__button--error"
              type="reset"
              onClick={resetForm}
            >
              Сбросить
            </button>
            <button className="form__button" type="submit">Сохранить</button>
          </div>
        </div>
      </form>
    </main >
  );
}

export default TournamentsShow;

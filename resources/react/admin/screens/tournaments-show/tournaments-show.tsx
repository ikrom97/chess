import { useState } from 'react';
import { Tournament } from '../../../types/tournament';

function TournamentsShow(): JSX.Element {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [title, setTitle] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');

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
            value={tournament?.title ?? title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
          <label className="form__label" htmlFor="title">Заголовок</label>
        </div>

        <div className="form__element form__element--image">
          <label className="form__field">
            <input
              className="visually-hidden"
              type="file"
              name="image"
              accept="image/*"
              required
            />
          </label>
        </div>

        <div className="form__element">
          <input
            className="form__field"
            id="date"
            type="datetime-local"
            name="date"
            required
            value={tournament?.date ?? dateTime}
            onChange={(evt) => setDateTime(evt.target.value)}
          />
          <label className="form__label" htmlFor="date">Дата проведения</label>
        </div>
      </form>
    </main >
  );
}

export default TournamentsShow;

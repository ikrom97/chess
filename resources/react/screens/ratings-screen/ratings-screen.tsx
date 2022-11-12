import 'dayjs/locale/ru';
import { Fragment, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import PlayersList from '../../components/players-list/players-list';
import { useAppSelector } from '../../hooks';
import { getAllPlayers } from '../../store/selectors/players-selector';
import { Players } from '../../types/player';
import TopLocalPlayersSection from './top-local-players-section/top-local-players-section';
import TopPlayersSection from './top-players-section/top-players-section';

function RatingsScreen(): JSX.Element {
  const players = useAppSelector(getAllPlayers);
  const [keyword, setKeyword] = useState<string>('');
  const [filteredPlayers, setFilteredPlayers] = useState<Players>([]);

  return (
    <main className="ratings-screen container">
      <h1 className="ratings-screen__title">Рейтинг</h1>

      <p className="ratings-screen__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames tincidunt sociis facilisi
        ac euismod pulvinar bibendum adipiscing. Eget sodales gravida viverra sed morbi
        elementum laoreet. Cum fringilla sodales vel congue mattis quis est mauris, nunc.
      </p>

      <form className="ratings-screen__search-form search-form">
        <label className="search-form__label">
          <DebounceInput
            className="search-form__input"
            type="search"
            placeholder="Введите запрос поиска игрока"
            debounceTimeout={300}
            onChange={(evt) => {
              setKeyword(evt.target.value);
              setFilteredPlayers(
                players.filter(({ name }) =>
                  name.toLowerCase().includes(evt.target.value.toLowerCase()))
              );
            }}
          />
        </label>

        <button className="search-form__submit" type="submit">
          <svg className="search-form__icon" width={14} height={14}>
            <use xlinkHref="#search"></use>
          </svg>
          Найти
        </button>
      </form>

      {keyword.length > 0
        ?
        <section className="rating-section">
          <h2 className="rating-section__title">
            Результаты поиска
          </h2>

          {filteredPlayers.length > 0
            ?
            <PlayersList players={filteredPlayers} />
            :
            <p>Ничего не найдено</p>}
        </section>
        :
        <Fragment>
          <TopPlayersSection />
          <TopLocalPlayersSection />
        </Fragment>}
    </main>
  );
}

export default RatingsScreen;

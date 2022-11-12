import { useEffect } from 'react';
import PlayersCard from '../../../components/player-card/player-card';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchPlayers } from '../../../store/api-actions/players-api-actions';
import { getPlayers, getPlayersLoadedStatus } from '../../../store/selectors/players-selector';
import SwiperCore, { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function TopPlayers(): JSX.Element {
  const dispatch = useAppDispatch();
  const players = useAppSelector(getPlayers);
  const isPlayersLoaded = useAppSelector(getPlayersLoadedStatus);

  SwiperCore.use([Scrollbar]);

  useEffect(() => {
    !isPlayersLoaded && dispatch(fetchPlayers());
  }, [dispatch, isPlayersLoaded]);

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      draggable
      scrollbar={{ draggable: true, dragSize: 64 }}
      breakpoints={{
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      }}
    >
      {players.slice(0, 10).map((player) => (
        <SwiperSlide key={player.id}>
          <PlayersCard player={player} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default TopPlayers;

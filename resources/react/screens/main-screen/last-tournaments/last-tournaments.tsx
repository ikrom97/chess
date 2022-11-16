import { useEffect } from 'react';
import TournamentCard from '../../../components/tournament-card/tournament-card';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getLastTournaments,
  getLastTournamentsLoadedStatus
} from '../../../store/selectors/tournaments-selector';
import SwiperCore, { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchPreviousTournaments } from '../../../store/api-actions/tournaments-api-actions';
import { setLastTournaments } from '../../../store/slices/tournaments-slice';

function LastTournaments(): JSX.Element {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector(getLastTournaments);
  const isTournamentsLoaded = useAppSelector(getLastTournamentsLoadedStatus);

  SwiperCore.use([Scrollbar]);

  useEffect(() => {
    if (!isTournamentsLoaded) {
      dispatch(fetchPreviousTournaments({
        orderby: 'date',
        ordertype: 'desc',
        count: 10,
        page: 1,
        onSuccess(data) {
          dispatch(setLastTournaments(data.tournaments));
        },
      }));
    }
  }, [dispatch, isTournamentsLoaded]);

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      draggable
      scrollbar={{ draggable: true, dragSize: 64 }}
      breakpoints={{
        576: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 32,
        },
      }}
    >
      {tournaments.map((tournament) => (
        <SwiperSlide key={tournament.id}>
          <TournamentCard tournament={tournament} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default LastTournaments;

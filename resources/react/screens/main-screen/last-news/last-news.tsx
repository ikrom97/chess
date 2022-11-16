import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getLastNews, getLastNewsLoadedStatus } from '../../../store/selectors/news-selector';
import SwiperCore, { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import NewsCard from '../../../components/news-card/news-card';
import { fetchNews } from '../../../store/api-actions/news-api-actions';
import { setLastNews } from '../../../store/slices/news-slice';

function LastNews(): JSX.Element {
  const dispatch = useAppDispatch();
  const news = useAppSelector(getLastNews);
  const isNewsLoaded = useAppSelector(getLastNewsLoadedStatus);

  SwiperCore.use([Scrollbar]);

  useEffect(() => {
    if (!isNewsLoaded) {
      dispatch(fetchNews({
        orderby: 'date',
        ordertype: 'desc',
        count: 10,
        page: 1,
        onSuccess(data) {
          dispatch(setLastNews(data.news));
        },
      }));
    }
  }, [dispatch, isNewsLoaded]);

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
      {news.map((newsItem) => (
        <SwiperSlide key={newsItem.id}>
          <NewsCard news={newsItem} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default LastNews;

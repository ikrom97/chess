import NewsPagination from './news-pagination/news-pagination';

function NewsScreen(): JSX.Element {
  return (
    <main className="news-screen container">
      <h1 className="news-screen__title">Новости</h1>

      <p className="news-screen__description">
        В данном разделе представлены все актуальные новости Федерации шахмат Таджикистана, а также мировые знаковые события в области шахмат. Результаты турниров, новые звезды, претенденты на звание лучших – все это вы можете узнать на нашем сайте.
      </p>

      <NewsPagination />
    </main>
  );
}

export default NewsScreen;

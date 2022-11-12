import NewsPagination from './news-pagination/news-pagination';

function NewsScreen(): JSX.Element {
  return (
    <main className="news-screen container">
      <h1 className="news-screen__title">Новости</h1>

      <p className="news-screen__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames tincidunt sociis facilisi ac
        euismod pulvinar bibendum adipiscing. Eget sodales gravida viverra sed morbi
        elementum laoreet. Cum fringilla sodales vel congue mattis quis est mauris, nunc.
      </p>

      <NewsPagination />
    </main>
  );
}

export default NewsScreen;

import ArticlesPagination from './articles-pagination/articles-pagination';

function ArticlesScreen(): JSX.Element {
  return (
    <main className="articles-screen container">
      <h1 className="articles-screen__title">Статьи</h1>

      <p className="articles-screen__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames tincidunt sociis facilisi
        ac euismod pulvinar bibendum adipiscing. Eget sodales gravida viverra sed morbi elementum
        laoreet. Cum fringilla sodales vel congue mattis quis est mauris, nunc.
      </p>

      <ArticlesPagination />
    </main>
  );
}

export default ArticlesScreen;

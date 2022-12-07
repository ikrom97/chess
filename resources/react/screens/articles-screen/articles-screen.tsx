import ArticlesPagination from './articles-pagination/articles-pagination';

function ArticlesScreen(): JSX.Element {
  return (
    <main className="articles-screen container">
      <h1 className="articles-screen__title">Статьи</h1>

      <p className="articles-screen__description">
        В разделе мы попытались собрать все возможные нюансы правил игры в шахматы, в статьях будем рассматривать интересные партии, необычные и сложные ситуации в шахматах. Здесь вы можете расширить свои знания в области шахмат и почерпнуть много нового.
      </p>

      <ArticlesPagination />
    </main>
  );
}

export default ArticlesScreen;

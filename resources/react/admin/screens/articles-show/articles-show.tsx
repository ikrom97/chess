import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { useAppDispatch } from '../../../hooks';
import { fetchArticleBySlug, storeArticle, updateArticle }
  from '../../../store/api-actions/articles-api-actions';
import { Article } from '../../../types/article';

function ArticlesShow(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState<string>(article?.title ?? '');
  const [dateTime, setDateTime] = useState<string>(article?.date ?? '');
  const [image, setImage] = useState(article?.image ?? '');
  const [content, setContent] = useState<string>(article?.content ?? '');

  const resetForm = () => {
    setTitle(article?.title ?? '');
    setDateTime(article?.date ?? '');
    setImage(article?.image ?? '');
    setContent(article?.content ?? '');
  };

  const handleFormSubmit = (evt: BaseSyntheticEvent) => {
    evt.preventDefault();

    if (!article) {
      dispatch(storeArticle({
        form: new FormData(evt.target),
        onSuccess() {
          setTitle('');
          setDateTime('');
          setImage('');
          setContent('');
        },
      }));
      return;
    }

    dispatch(updateArticle({
      form: new FormData(evt.target),
      onSuccess(updatedArticle) {
        setTitle(updatedArticle.title);
        setDateTime(updatedArticle.date);
        setImage(updatedArticle.image);
        setContent(updatedArticle.content);
      },
    }));
  };

  useEffect(() => {
    slug && dispatch(fetchArticleBySlug({
      slug,
      onSuccess(data) {
        setArticle(data);
        setTitle(data.title);
        setDateTime(data.date);
        setImage(data.image);
        setContent(data.content);
      },
    }));
  }, [dispatch, slug]);

  return (
    <main>
      <form className="form" onSubmit={handleFormSubmit}>
        {article && <input type="hidden" name="id" value={article.id} />}

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
                required={!article}
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
                    alt="News poster"
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
            <label className="form__label" htmlFor="date">Выберите дату</label>
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

export default ArticlesShow;

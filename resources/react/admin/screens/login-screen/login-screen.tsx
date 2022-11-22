import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminRoute, AuthorizationStatus } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { loginAction } from '../../../store/api-actions/user-api-actions';
import { getAuthorizationStatus } from '../../../store/selectors/user-selector';

function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return <Navigate to={AdminRoute.MAIN} />;
  }

  const handeFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction({ email, password }));
  };

  return (
    <form className="form form--small" onSubmit={handeFormSubmit}>
      <div className="form__element">
        <input
          className="form__field"
          id="email"
          type="text"
          name="email"
          placeholder="example@domain.com"
          autoComplete="off"
          required
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <label className="form__label" htmlFor="email">Логин</label>
      </div>
      <div className="form__element">
        <input
          className="form__field"
          id="password"
          type="password"
          name="password"
          placeholder="********"
          required
          value={password}
          autoComplete="current-password"
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <label className="form__label" htmlFor="password">Пароль</label>
      </div>

      <div className="form__buttons">
        <button className="form__button" type="submit">Войти</button>
      </div>
    </form>
  );
}

export default LoginScreen;

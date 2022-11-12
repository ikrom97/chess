export enum AppRoute {
  MAIN = '/',
  ABOUT = '/about',
  NEWS = '/news',
  NEWS_SELECTED = '/news/:slug',
  TOURNAMENTS = '/tournaments',
  TOURNAMENTS_SELECTED = '/tournaments/:slug',
  RATINGS = '/ratings',
  ARTICLES = '/articles',
  ARTICLES_SELECTED = '/articles/:slug',
  CONTACTS = '/contacts',
  LOGIN = '/login',
  NOT_FOUND = '*',
}

export enum ApiRoute {
  ARTICLES = '/api/articles',
  ARTICLES_SELECTED = '/api/articles/:slug',
  NEWS = '/api/news',
  NEWS_SELECTED = '/api/news/:slug',
  PLAYERS = '/api/players',
  TOURNAMENTS = '/api/tournaments',
  TOURNAMENTS_SELECTED = '/api/tournaments/:slug',
  LOGIN = '/api/login',
}

export enum SliceName {
  ARTICLES = 'articles',
  NEWS = 'news',
  PLAYERS = 'players',
  TOURNAMENTS = 'tournaments',
  USER = 'user',
}

export const NavigationItems = [
  { url: AppRoute.MAIN, text: 'Главная' },
  { url: AppRoute.NEWS, text: 'Новости' },
  { url: AppRoute.TOURNAMENTS, text: 'Турниры' },
  { url: AppRoute.RATINGS, text: 'Рейтинг' },
  { url: AppRoute.ARTICLES, text: 'Статьи' },
  { url: AppRoute.CONTACTS, text: 'Контакты' },
];

export enum Viewport {
  SMALL = 576,
  MEDIUM = 768,
  LARGE = 992,
  X_LARGE = 1200,
  X_X_LARGE = 1400,
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

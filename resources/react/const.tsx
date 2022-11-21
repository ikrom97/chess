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
  NOT_FOUND = '*',
}

export enum AdminRoute {
  MAIN = '/admin',
  LOGIN = '/admin/login',
  TOURNAMENTS = '/admin/tournaments',
  TOURNAMENTS_SHOW = '/admin/tournaments/show',
  NEWS = '/admin/news',
  NEWS_SHOW = '/admin/news/show',
  ARTICLES = '/admin/articles',
  ARTICLES_SHOW = '/admin/articles/show',
}

export enum ApiRoute {
  ARTICLES = '/api/articles',
  ARTICLES_SELECTED = '/api/articles/:slug',
  NEWS = '/api/news',
  NEWS_SELECTED = '/api/news/:slug',
  PLAYERS = '/api/players',
  TOURNAMENTS = '/api/tournaments',
  TOURNAMENTS_UPCOMING = '/api/tournaments/upcoming',
  TOURNAMENTS_PREVIOUS = '/api/tournaments/previous',
  TOURNAMENTS_SELECTED = '/api/tournaments/:slug',

  LOGIN = '/api/login',
  ADMIN_TOURNAMENTS = '/api/admin/tournaments',
}

export enum SliceName {
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

export const AdminNavigations = [
  { url: AdminRoute.TOURNAMENTS, text: 'Турниры' },
  { url: AdminRoute.NEWS, text: 'Новости' },
  { url: AdminRoute.ARTICLES, text: 'Статьи' },
];

export enum AuthorizationStatus {
  AUTH = 'authorized',
  NO_AUTH = 'unauthorized',
  UNKNOWN = 'unknown',
}

export const EmptyPaginationData = {
  currentPage: 0,
  firstPageUrl: '',
  from: 0,
  lastPage: 0,
  lastPageUrl: '',
  links: [],
  nextPageUrl: '',
  path: '',
  perPage: 0,
  prevPageUrl: '',
  to: 0,
  total: 0,
};

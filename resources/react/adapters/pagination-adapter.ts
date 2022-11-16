import { Pagination } from '../types/pagination';

type ServerPagination = {
  current_page: number;
  data: [];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export const adaptPaginationToClient = (serverPagination: ServerPagination): Pagination => ({
  currentPage: serverPagination.current_page,
  firstPageUrl: serverPagination.first_page_url,
  from: serverPagination.from,
  lastPage: serverPagination.last_page,
  lastPageUrl: serverPagination.last_page_url,
  links: serverPagination.links,
  nextPageUrl: serverPagination.next_page_url,
  path: serverPagination.path,
  perPage: serverPagination.per_page,
  prevPageUrl: serverPagination.prev_page_url,
  to: serverPagination.to,
  total: serverPagination.total,
});

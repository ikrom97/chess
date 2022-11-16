import { Pagination } from './pagination';

type Ticket = {
  address: string;
  tel1: string;
  tel2: string;
  email1: string;
  email2: string;
}
export type Tournament = {
  id: number;
  image: string;
  thumbImage: string;
  date: string;
  title: string;
  content: string;
  slug: string;
  ticket?: Ticket;
}

export type Tournaments = Tournament[];

export type TournamentData = {
  slug: string;
  onSuccess: (tournament: Tournament) => void;
};

export type TournamentsData = {
  orderby: string;
  ordertype: string;
  count: number;
  page: number;
  onSuccess: (data: { tournaments: Tournaments, pagination: Pagination }) => void;
};

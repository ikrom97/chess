import { Tournament, Tournaments } from '../types/tournament';

type ServerTicket = {
  id: number;
  address: string;
  tel_1: string;
  tel_2: string;
  email_1: string;
  email_2: string;
  updated_at: string;
  created_at: string;
}

type ServerTournament = {
  id: number;
  image: string;
  thumb_image: string;
  date: string;
  title: string;
  content: string;
  slug: string;
  ticket?: ServerTicket;
}

type ServerTournaments = ServerTournament[];

export const adaptTournamentToClient = (serverTournament: ServerTournament): Tournament => {
  if (serverTournament.ticket) {
    return {
      id: serverTournament.id,
      image: serverTournament.image,
      thumbImage: serverTournament.thumb_image,
      date: serverTournament.date,
      title: serverTournament.title,
      content: serverTournament.content,
      slug: serverTournament.slug,
      ticket: {
        address: serverTournament.ticket.address,
        tel1: serverTournament.ticket.tel_1,
        tel2: serverTournament.ticket.tel_2,
        email1: serverTournament.ticket.email_1,
        email2: serverTournament.ticket.email_2,
      }
    };
  }

  return {
    id: serverTournament.id,
    image: serverTournament.image,
    thumbImage: serverTournament.thumb_image,
    date: serverTournament.date,
    title: serverTournament.title,
    content: serverTournament.content,
    slug: serverTournament.slug,
  };
};

export const adaptTournamentsToClient = (serverTournaments: ServerTournaments): Tournaments =>
  serverTournaments.map((serverTournament) => adaptTournamentToClient(serverTournament));

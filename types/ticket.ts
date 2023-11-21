import { ShowDate } from "./showDate";

export interface Ticket {
  id: string;
  movieId: string;
  seats: string[];
  showDate: ShowDate;
}

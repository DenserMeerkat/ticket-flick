import { Ticket } from "./ticket";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  tickets: Ticket[];
}

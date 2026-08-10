export type TicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "CLOSED";

export type TicketPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";


export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  created_at: string;
  updated_at: string;
}


export interface CreateTicketPayload {
  title: string;
  description: string;
  status?: TicketStatus;
  priority?: TicketPriority;
}


export interface UpdateTicketPayload {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
}
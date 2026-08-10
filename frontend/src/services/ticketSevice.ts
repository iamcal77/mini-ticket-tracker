import axios from "axios";
import type { CreateTicketPayload, Ticket, UpdateTicketPayload } from "../types/tickets";




const api = axios.create({
  baseURL: "http://localhost:8000",
});


export const getTickets = async (): Promise<Ticket[]> => {
  const response = await api.get<Ticket[]>("/tickets");

  return response.data;
};


export const getTicket = async (
  id: number
): Promise<Ticket> => {
  const response = await api.get<Ticket>(
    `/tickets/${id}`
  );

  return response.data;
};


export const createTicket = async (
  payload: CreateTicketPayload
): Promise<Ticket> => {
  const response = await api.post<Ticket>(
    "/tickets",
    payload
  );

  return response.data;
};


export const updateTicket = async (
  id: number,
  payload: UpdateTicketPayload
): Promise<Ticket> => {
  const response = await api.patch<Ticket>(
    `/tickets/${id}`,
    payload
  );

  return response.data;
};


export const deleteTicket = async (
  id: number
): Promise<void> => {
  await api.delete(`/tickets/${id}`);
};
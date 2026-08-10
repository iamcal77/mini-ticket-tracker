import { useQuery } from "@tanstack/react-query";

import type { Ticket } from "../types/tickets";
import TicketCard from "./TicketCard";
import { getTickets } from "../services/ticketSevice";

interface TicketListProps {
  filter: string;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: number) => void;
}

export default function TicketList({
  filter,
  onEdit,
  onDelete,
}: TicketListProps) {
  const {
    data: tickets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-700">
          Failed to load tickets.
        </p>

        <p className="mt-1 text-sm text-red-600">
          Make sure the FastAPI server is running.
        </p>
      </div>
    );
  }

  const filteredTickets =
    filter === "ALL"
      ? tickets
      : tickets?.filter(
          (ticket) => ticket.status === filter
        );

  if (!filteredTickets?.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <h3 className="font-semibold text-gray-900">
          No tickets found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          There are no tickets matching this filter.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
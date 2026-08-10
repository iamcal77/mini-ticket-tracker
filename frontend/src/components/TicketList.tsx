import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../services/ticketSevice";




export default function TicketList() {
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
      <p className="text-gray-500">
        Loading tickets...
      </p>
    );
  }


  if (isError) {
    return (
      <p className="text-red-500">
        Failed to load tickets.
      </p>
    );
  }


  if (!tickets?.length) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        <p className="text-gray-500">
          No tickets found.
        </p>
      </div>
    );
  }


  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="rounded-lg border bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                {ticket.title}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {ticket.description}
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
              {ticket.status}
            </span>
          </div>

          <div className="mt-4">
            <span className="text-sm text-gray-500">
              Priority:
            </span>

            <span className="ml-2 text-sm font-medium">
              {ticket.priority}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
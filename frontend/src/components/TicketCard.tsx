import type { Ticket } from "../types/tickets";

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: number) => void;
}

const statusStyles = {
  OPEN: "bg-blue-50 text-blue-700",
  IN_PROGRESS: "bg-yellow-50 text-yellow-700",
  CLOSED: "bg-green-50 text-green-700",
};

const priorityStyles = {
  LOW: "bg-gray-100 text-gray-700",
  MEDIUM: "bg-orange-50 text-orange-700",
  HIGH: "bg-red-50 text-red-700",
};

export default function TicketCard({
  ticket,
  onEdit,
  onDelete,
}: TicketCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-400">
              #{ticket.id}
            </span>

            <h3 className="truncate text-lg font-semibold text-gray-900">
              {ticket.title}
            </h3>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {ticket.description}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            statusStyles[ticket.status]
          }`}
        >
          {ticket.status.replace("_", " ")}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            Priority
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              priorityStyles[ticket.priority]
            }`}
          >
            {ticket.priority}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(ticket)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(ticket.id)}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
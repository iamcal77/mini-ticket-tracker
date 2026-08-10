import { useState } from "react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import TicketForm from "./components/TicketForm";

import TicketList from "./components/ticketList";
import type { Ticket, TicketPriority, TicketStatus } from "./types/tickets";
import { createTicket, deleteTicket, updateTicket } from "./services/ticketSevice";



type Filter =
  | "ALL"
  | "OPEN"
  | "IN_PROGRESS"
  | "CLOSED";


function App() {
  const queryClient = useQueryClient();

  const [filter, setFilter] =
    useState<Filter>("ALL");

  const [showForm, setShowForm] =
    useState(false);

  const [editingTicket, setEditingTicket] =
    useState<Ticket | null>(null);


  const createMutation = useMutation({
    mutationFn: createTicket,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });

      setShowForm(false);
    },
  });


  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: {
        title: string;
        description: string;
        status: TicketStatus;
        priority: TicketPriority;
      };
    }) => updateTicket(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });

      setEditingTicket(null);
      setShowForm(false);
    },
  });


  const deleteMutation = useMutation({
    mutationFn: deleteTicket,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
    },
  });


  const handleSubmit = (data: {
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
  }) => {
    if (editingTicket) {
      updateMutation.mutate({
        id: editingTicket.id,
        data,
      });
    } else {
      createMutation.mutate(data);
    }
  };


  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setShowForm(true);
  };


  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (confirmed) {
      deleteMutation.mutate(id);
    }
  };


  const openCreateForm = () => {
    setEditingTicket(null);
    setShowForm(true);
  };


  const closeForm = () => {
    setShowForm(false);
    setEditingTicket(null);
  };


  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending;


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Mini Ticket Tracker
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage and track support tickets.
              </p>
            </div>

            <button
              onClick={openCreateForm}
              className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
            >
              + New Ticket
            </button>
          </div>
        </div>
      </header>


      {/* Dashboard */}

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Tickets
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View and manage all support requests.
          </p>
        </div>


        {/* Filters */}

        <div className="mb-6 flex flex-wrap gap-2">
          {[
            ["ALL", "All"],
            ["OPEN", "Open"],
            ["IN_PROGRESS", "In Progress"],
            ["CLOSED", "Closed"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() =>
                setFilter(value as Filter)
              }
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === value
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>


        {/* Tickets */}

        <TicketList
          filter={filter}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>


      {/* Modal */}

      {showForm && (
        <TicketForm
          ticket={editingTicket}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}
    </div>
  );
}


export default App;
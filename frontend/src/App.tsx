import TicketList from "./components/ticketList";


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900">
            Mini Ticket Tracker
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track support tickets.
          </p>
        </div>
      </header>


      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Tickets
          </h2>

          <button
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            + New Ticket
          </button>
        </div>

        <TicketList />
      </main>
    </div>
  );
}


export default App;
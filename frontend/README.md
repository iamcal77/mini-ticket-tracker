# Mini Ticket Tracker

A lightweight full-stack ticket tracking application built as part of the Lodwar Services Mid-Level Full-Stack Developer take-home assignment.

## Tech Stack

### Backend

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic

### Frontend

* React
* TypeScript
* Tailwind CSS
* TanStack React Query
* Axios
* Vite

## Features

* View all tickets
* Filter tickets by status
* Create new tickets
* Edit existing tickets
* Delete tickets
* Set ticket priority
* Set ticket status
* RESTful API
* Request validation using Pydantic
* Server-state management using TanStack React Query
* Responsive UI using Tailwind CSS

## Project Structure

```text
mini-ticket-tracker/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   └── tickets.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TicketCard.tsx
│   │   │   ├── TicketForm.tsx
│   │   │   └── TicketList.tsx
│   │   ├── services/
│   │   │   └── ticketService.ts
│   │   ├── types/
│   │   │   └── ticket.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env
│   └── package.json
│
└── README.md
```

## API Endpoints

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/tickets`      | Retrieve all tickets       |
| GET    | `/tickets/{id}` | Retrieve a specific ticket |
| POST   | `/tickets`      | Create a ticket            |
| PATCH  | `/tickets/{id}` | Update a ticket            |
| DELETE | `/tickets/{id}` | Delete a ticket            |

Interactive API documentation is available through FastAPI Swagger:

```text
http://localhost:8000/docs
```

## Ticket Fields

Each ticket contains:

* `id`
* `title`
* `description`
* `status`
* `priority`
* `created_at`
* `updated_at`

### Statuses

```text
OPEN
IN_PROGRESS
CLOSED
```

### Priorities

```text
LOW
MEDIUM
HIGH
```

## Running the Backend

### 1. Create a virtual environment

```bash
cd backend

python -m venv venv
```

Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Linux/macOS:

```bash
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure the database

Create a PostgreSQL database named:

```text
ticket_tracker
```

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ticket_tracker
```

Update the connection string to match your local PostgreSQL configuration.

### 4. Start the API

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

## Running the Frontend

From the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Design Decisions

### FastAPI

FastAPI was selected because it provides a lightweight REST API framework with automatic request validation and interactive API documentation.

### SQLAlchemy

SQLAlchemy provides a clean separation between the API layer and database operations while keeping the data model straightforward for the scope of this assignment.

### TanStack React Query

TanStack React Query is used for server-state management. Mutations invalidate the relevant ticket query so the UI stays synchronized with the backend without manually managing duplicated server state.

### Tailwind CSS

Tailwind was used to keep the UI lightweight and responsive while avoiding unnecessary styling infrastructure.

## Assumptions

* Authentication was intentionally excluded because it was not required for the core ticket-tracking functionality.
* Ticket statuses are limited to `OPEN`, `IN_PROGRESS`, and `CLOSED`.
* Ticket priorities are limited to `LOW`, `MEDIUM`, and `HIGH`.
* PostgreSQL is used as the relational database.
* The application is designed as a small single-service application rather than being split into multiple services because of the scope of the assignment.

## Error Handling

The API returns appropriate HTTP status codes for common cases, including:

* `201` when a ticket is successfully created
* `200` for successful reads and updates
* `204` when a ticket is successfully deleted
* `404` when a requested ticket does not exist

The frontend also provides loading, error, and empty states.

## Future Improvements

If this application were expanded beyond the assignment scope, possible improvements would include:

* Authentication and role-based access control
* Pagination
* Search
* Ticket assignment
* Comments/activity history
* Database migrations with Alembic
* Automated backend and frontend tests
* CI/CD
* Production deployment

## Author

Calvin Kipkirui

# Task Management REST API

A clean, light-weight, type-safe RESTful Task Management API built with Node.js, Express, and TypeScript. Uses an in-memory data store with comprehensive unit and integration tests using Vitest and Supertest.

## Technology Stack

- **Runtime**: Node.js (v24+)
- **Language**: TypeScript (v5+)
- **Framework**: Express (v4+)
- **Development Tooling**: `tsx` (TypeScript Execute / Watch)
- **Testing**: Vitest, Supertest
- **Linter**: ESLint (Modern Flat Config `eslint.config.js`)

## Project Structure

```text
task-api/
├── src/
│   ├── controllers/
│   │   └── task.controller.ts
│   ├── routes/
│   │   └── task.routes.ts
│   ├── services/
│   │   └── task.service.ts
│   ├── types/
│   │   └── task.ts
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── task.service.test.ts
│   └── task.api.test.ts
├── .gitignore
├── eslint.config.js
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Installation Instructions

Clone the repository and install dependencies using `npm`:

```bash
npm install
```

## Development Instructions

Start the development server with live reload powered by `tsx`:

```bash
npm run dev
```

The server runs on `http://localhost:3000`.

## Testing Instructions

Run all unit and integration tests once:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

## Lint Instructions

Run ESLint to check for code style issues and static analysis across `src/` and `tests/`:

```bash
npm run lint
```

## Build Instructions

Compile TypeScript files into JavaScript in the `dist/` directory:

```bash
npm run build
```

## Production Start Instructions

Run the compiled JavaScript application from the `dist/` output directory:

```bash
npm start
```

## API Endpoint Documentation

### 1. `GET /`
Return welcome message.

- **Response** (`200 OK`):
  ```json
  {
    "message": "Task Management API"
  }
  ```

### 2. `GET /tasks`
Retrieve all tasks.

- **Response** (`200 OK`):
  ```json
  [
    {
      "id": 1,
      "title": "Learn TypeScript",
      "completed": false
    }
  ]
  ```

### 3. `GET /tasks/:id`
Retrieve a specific task by numeric ID.

- **Response** (`200 OK`):
  ```json
  {
    "id": 1,
    "title": "Learn TypeScript",
    "completed": false
  }
  ```
- **Error Response** (`404 Not Found`):
  ```json
  {
    "error": "Task not found"
  }
  ```

### 4. `POST /tasks`
Create a new task.

- **Request Body**:
  ```json
  {
    "title": "Learn TypeScript"
  }
  ```
- **Success Response** (`201 Created`):
  ```json
  {
    "id": 1,
    "title": "Learn TypeScript",
    "completed": false
  }
  ```
- **Error Response** (`400 Bad Request`):
  ```json
  {
    "error": "Title is required"
  }
  ```

### 5. `PATCH /tasks/:id`
Update an existing task (title and/or completed status).

- **Request Body** (both fields optional):
  ```json
  {
    "title": "Learn TypeScript properly",
    "completed": true
  }
  ```
- **Success Response** (`200 OK`):
  ```json
  {
    "id": 1,
    "title": "Learn TypeScript properly",
    "completed": true
  }
  ```
- **Error Response** (`404 Not Found`):
  ```json
  {
    "error": "Task not found"
  }
  ```

### 6. `DELETE /tasks/:id`
Delete a task by numeric ID.

- **Success Response** (`200 OK`):
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```
- **Error Response** (`404 Not Found`):
  ```json
  {
    "error": "Task not found"
  }
  ```

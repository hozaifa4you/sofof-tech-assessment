# Todo Miner

The Sofof Tech Assessment project, Todo Miner, is a full-stack application designed to help users manage their tasks efficiently. The application features a user-friendly interface for creating, viewing, and managing todos, along with an AI-powered assistant that provides insights and answers related to the user's tasks.

## Features

-  User Authentication: Secure sign-up and login functionality. Backend with Passport and frontend with fully custom cookie based.
-  Todo Management: Create, read, update, and delete todos.
-  AI Agent: An integrated AI agent that can answer questions and provide insights about the user's todos using Groq AI (`groq-sdk`) unlike Grok.
-  Responsive Design: Optimized for both desktop and mobile devices.
-  RESTful API: Backend built with NestJs, providing a robust API for frontend interactions.
-  Database Integration: Uses a relational (mysql) database to store user and todo data securely.
-  Language and Framework: Backend with NestJs (Typescript) and frontend with Nextjs (TypeScript)
-  ORM: TypeOrm with Repository Pattern
-  UI Library: ShadcnUI with TailwindCss and lucied icons.

## Installations

### Database using Docker

```bash
docker compose up -d
```

The command run MySQL database.

### Backend

Copy the `.env.example` file and make a `.env` file and fill with relevant data.

```bash
# Install dependency
npm install
# or
bun install # if bun is installed

# Build project
npm run build

# run project
npm run start:prod
```

Congratulation! The backend is running on port `3333` or your specific port.

### Frontend

Copy the `.env.example` file and make a `.env` file and fill with relevant data.

```bash
# Install dependency
npm install
# or
bun install # if bun is installed

# Build project
npm run build

# run project
npm run start
```

Congratulation! Your full stack Todo Miner app is running well.

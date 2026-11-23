# Vibe

A real-time chat app built with React, Node.js, Express, MongoDB and Socket.io. Users sign in with Google, find other users, exchange messages instantly and share files.

[Demo video](https://github.com/Anubhav6205/Vibe/assets/82750157/b2c1b783-6028-4df5-b71e-e10d15ac263e)

**Status:** finished prototype (2023).

## Features

- One-to-one conversations with instant delivery over WebSockets
- Google sign-in
- File sharing (images, PDFs, videos), stored in MongoDB GridFS
- Profile drawer with an editable "about" section
- User search

## Tech stack

| Layer | Tools |
|---|---|
| Client | React 18, Vite, Material UI, Socket.io client, `@react-oauth/google` |
| Server | Node.js, Express, Socket.io, Mongoose, multer with GridFS storage |
| Database | MongoDB |

## Project structure

```
client/   React app (components for chats, menu, profile drawer, login)
server/   Express API, Socket.io handlers, controllers, Mongoose models
```

## Run locally

Requirements: Node.js 18 or later, a running MongoDB, and a Google OAuth client ID (set in `client/src/constants/data.jsx`).

```bash
# Server (listens on port 8000)
cd server
cp .env.example .env      # set URI to your MongoDB connection string
npm install
npm run dev

# Client (in a second terminal)
cd client
npm install
npm run dev               # http://localhost:5173
```

The client expects the API at `http://localhost:8000`. These steps are written from the code and have not been re-verified on a clean machine.

## Limitations

- One-to-one chat only, no group conversations.
- The API URL and port are hard-coded.
- No automated tests.

## License

MIT, see [LICENSE](LICENSE).

## Contact

Anubhav Gupta, [LinkedIn](https://www.linkedin.com/in/anubhav-gupta-92410a244/)

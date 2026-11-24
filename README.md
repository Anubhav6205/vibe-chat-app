# Vibe

A real-time chat app built with React, Node.js, Express, MongoDB and Socket.io. Users sign in with Google, find other users, exchange messages instantly and share files.

**Live demo:** https://vibe-chat-app-one.vercel.app (offline demo mode, see below)

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

## Hosted demo

The Vercel deployment hosts only the React client, built in demo mode. It does not run the real backend: Vercel cannot host the long-lived Socket.io server, and the MongoDB database and Google OAuth setup are not available there. In demo mode:

- There is no sign-in. "Enter demo" signs you in as a local demo user.
- The contacts are scripted bots that answer with canned replies to a few keywords.
- Messages, shared files and the "about" text live in browser memory only and are lost on reload.
- A banner at the top of the page says it is an offline demo.

Demo mode is on for production builds that have no `VITE_API_URL` set, or when `VITE_DEMO_MODE=true`. For local development with the real server, nothing changes: the client uses `http://localhost:8000`, or the URL in `VITE_API_URL` if you set it. Real-time chat, Google sign-in and MongoDB-backed history only work when you run the server yourself as described above.

## Limitations

- One-to-one chat only, no group conversations.
- The server's file URLs still point at `http://localhost:8000`.
- No automated tests.

## License

MIT, see [LICENSE](LICENSE).

## Contact

Anubhav Gupta, [LinkedIn](https://www.linkedin.com/in/anubhavgupta8/)

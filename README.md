# Movie Review Platform
Full-stack Movie Review platform (React frontend, Node.js backend proxy, Firebase Firestore for reviews & Auth).
**What you get**
- React frontend (Vite + React) with pages: Home, Movies, Movie Details (with reviews), Add Review, Edit Review, Profile
- Node.js Express backend that proxies TMDB requests (store TMDB_API_KEY in .env)
- Firestore integration for storing reviews and Firebase Auth (email/password)
- Setup instructions for GitHub push and Firebase hosting
- Ready-to-run project (you must provide your own API keys and install dependencies)

## Quick setup (local)
1. Clone or unzip this folder.
2. Frontend:
   ```bash
   cd frontend
   npm install
   # set Firebase config in src/firebaseConfig.js and TMDB proxy URL in src/config.js
   npm run dev
   ```
3. Backend:
   ```bash
   cd backend
   npm install
   # create .env using .env.example and set TMDB_API_KEY and PORT
   node server.js
   ```
4. Firestore & Firebase Auth: create a Firebase project, enable Firestore and Email/Password auth. Paste config into `frontend/src/firebaseConfig.js`.
5. To deploy frontend to Firebase Hosting follow the README instructions in the frontend folder.

## Important files to update
- `frontend/src/firebaseConfig.js` — replace placeholder values with your Firebase project's config
- `backend/.env` — add `TMDB_API_KEY=your_tmdb_api_key_here`
- `frontend/src/config.js` — set `API_BASE` to your backend URL (e.g., http://localhost:4000)

## TMDB
Get a free key at https://www.themoviedb.org/

## Notes
This scaffold is intended for development and educational purposes. For production consider security best-practices for API keys and rules.

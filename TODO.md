# TODO List for Movie Review Platform Enhancements

## 1. Firebase Auth Setup
- [x] Update `frontend/src/firebase.js` to export auth
- [x] Create `frontend/src/AuthContext.jsx` for user state management
- [x] Create `frontend/src/pages/Login.jsx` page
- [x] Create `frontend/src/pages/Register.jsx` page
- [x] Update `frontend/src/App.jsx` to wrap with AuthContext and add protected routes

## 2. Search Functionality
- [x] Add `/api/search` endpoint to `backend/server.js`
- [x] Update `frontend/src/pages/Movies.jsx` to include search bar and fetch/search logic

## 3. Star Ratings
- [x] Create `frontend/src/components/StarRating.jsx` component
- [x] Update `frontend/src/pages/AddReview.jsx` to use StarRating instead of number input
- [x] Update `frontend/src/pages/EditReview.jsx` to use StarRating instead of number input

## 4. Loading States and Error Handling
- [x] Add loading spinners and error messages to `frontend/src/pages/Movies.jsx`
- [x] Add loading spinners and error messages to `frontend/src/pages/MovieDetails.jsx`
- [x] Add loading states and error handling to `frontend/src/pages/AddReview.jsx`
- [x] Add loading states and error handling to `frontend/src/pages/EditReview.jsx`
- [x] Update `frontend/src/pages/Profile.jsx` to show user info if authenticated

## 5. Testing
- [ ] Run frontend and backend
- [ ] Test auth flow (login/register)
- [ ] Test search functionality
- [ ] Test star ratings
- [ ] Test loading states and error handling
- [ ] Ensure protected routes work

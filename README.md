React Movie App
A responsive and modern web application for browsing, searching, and managing your favorite movies, built with React and Vite. This app connects to The Movie Database (TMDB) API for real-time movie data and features user authentication to save favorites to a TMDB account.

Features
Browse & Search: Discover popular movies on the homepage or use the search bar to find specific titles.

Detailed Information: Click on a movie to view its details, including the synopsis, rating, release date, director, and main cast.

Trailer Playback: Watch movie trailers directly within the app in a responsive modal.

TMDB User Authentication: A secure, three-step login process that connects the app to a user's personal TMDB account.

Persistent Favorites: Add or remove movies from a personal favorites list that is saved to the user's account and persists across sessions and devices.

Responsive Design: A seamless user experience on both desktop and mobile devices.

Desktop: Features a "glassmorphism" side-popup for movie details.

Mobile: Uses a centered modal overlay for details to ensure readability.

Modern UI: A sleek, dark-themed interface inspired by modern streaming services, using a purple and dark blue color palette.

Tech Stack
Frontend: React, Vite

Routing: React Router

State Management: React Context API (useState, useContext, useEffect)

Styling: Plain CSS with a responsive design (Flexbox, Grid, Media Queries)

API: The Movie Database (TMDB) API

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (v16 or later)
A TMDB API Key - You can get one for free by creating an account on the TMDB website.

Installation

Clone the repository:
git clone https://github.com/your-username/your-repo-name.git


Navigate into the project directory:
cd your-repo-name

Install NPM packages:
npm install


Create an environment file:

Create a file named .env in the root of your project and add your TMDB API key:
VITE_TMDB_API_KEY="your_actual_api_key_here"


Start the development server:
npm run dev
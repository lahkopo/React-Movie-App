# React Movie App 🎬

A responsive and modern web application for browsing, searching, and managing your favorite movies, built with React and Vite. This app connects to The Movie Database (TMDB) API for real-time movie data and features user authentication to save favorites to a TMDB account.



---
## ✨ Features

* **Browse & Search:** Discover popular movies on the homepage or use the search bar to find specific titles.
* **Detailed Information:** Click on a movie to view its details, including the synopsis, rating, release date, director, and main cast.
* **Trailer Playback:** Watch movie trailers directly within the app in a responsive modal.
* **TMDB User Authentication:** A secure, three-step login process that connects the app to a user's personal TMDB account.
* **Persistent Favorites:** Add or remove movies from a personal favorites list that is saved to the user's account and persists across sessions and devices.
* **Responsive Design:** A seamless user experience on both desktop and mobile devices.
    * **Desktop:** Features a "glassmorphism" side-popup for movie details.
    * **Mobile:** Uses a centered modal overlay for details to ensure readability.
* **Modern UI:** A sleek, dark-themed interface inspired by modern streaming services, using a purple and dark blue color palette.

---
## 🛠️ Tech Stack

* **Frontend:** [React](https://reactjs.org/), [Vite](https://vitejs.dev/)
* **Routing:** [React Router](https://reactrouter.com/)
* **State Management:** React Context API (`useState`, `useContext`, `useEffect`)
* **Styling:** Plain CSS with a responsive design (Flexbox, Grid, Media Queries)
* **API:** [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)

---
## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* **Node.js** (v16 or later)
* A **TMDB API Key** - You can get one for free by creating an account on the [TMDB website](https://www.themoviedb.org/signup).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/lahkopo/React-Movie-App
    ```

2.  **Navigate into the project directory:**
    ```bash
    cd your-repo-name
    ```

3.  **Install NPM packages:**
    ```bash
    npm install
    ```

4.  **Create an environment file:**
    Create a file named **`.env`** in the root of your project and add your TMDB API key:
    ```
    VITE_TMDB_API_KEY="your_actual_api_key_here"
    ```

5.  **Start the development server:**
    ```bash
    npm run dev
    ```
The application should now be running on `http://localhost:5174`.

---
## 🙏 Acknowledgements

This project uses the [TMDB API](https://www.themoviedb.org/) but is not endorsed or certified by TMDB. A huge thank you to their team for providing the data that makes this app possible.

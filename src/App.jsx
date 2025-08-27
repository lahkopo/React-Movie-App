import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import NavBar from "./components/NavBar";
import ApprovedPage from "./pages/ApprovedPage.jsx";

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/approved" element={<ApprovedPage />} /> {}
          </Routes>
        </main>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
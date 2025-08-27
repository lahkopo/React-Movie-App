import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import '../css/Navbar.css';

function NavBar() {
    const { sessionId, login, logout } = useAuth();

    const handleLoginClick = () => {
      console.log("Login button click registered!");
      login();
    };

    const handleLogoutClick = () => {
        console.log("Logout button click registered!");
        logout();
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movie App</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
                {sessionId ? (
                    <button onClick={handleLogoutClick} className="nav-link auth-btn">Logout</button>
                ) : (
                    <button onClick={handleLoginClick} className="nav-link auth-btn">Login</button>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
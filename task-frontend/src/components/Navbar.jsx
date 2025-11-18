import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="nav">
      <h2>Task Manager</h2>
      <div>
        <Link to="/">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Login</h2>

      <input type="email" name="email" placeholder="Email" onChange={handle} />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handle}
      />

      <button type="submit">Login</button>
    </form>
  );
}

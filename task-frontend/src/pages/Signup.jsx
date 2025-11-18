import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Signup</h2>
      <input type="text" name="name" placeholder="Name" onChange={handle} />
      <input type="email" name="email" placeholder="Email" onChange={handle} />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handle}
      />
      <button type="submit">Signup</button>
    </form>
  );
}

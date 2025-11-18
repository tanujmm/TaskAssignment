import { useState } from "react";
import axios from "axios";

export default function TaskForm({ refresh }) {
  const [form, setForm] = useState({
    purpose: "",
    time: "",
    description: "",
    isImportant: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/tasks", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      refresh();
      setForm({ purpose: "", time: "", description: "", isImportant: false });
    } catch (err) {
      alert("Error adding task");
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>Add Task</h3>
      <input
        type="text"
        name="purpose"
        placeholder="Task purpose"
        value={form.purpose}
        onChange={handleChange}
      />

      <input
        type="datetime-local"
        name="time"
        value={form.time}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <label>
        <input
          type="checkbox"
          name="isImportant"
          checked={form.isImportant}
          onChange={handleChange}
        />
        Important
      </label>

      <button type="submit">Add Task</button>
    </form>
  );
}

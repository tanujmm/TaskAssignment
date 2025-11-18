import { useState } from "react";
import axios from "axios";

export default function TaskList({ tasks, refresh }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    purpose: "",
    time: "",
    description: "",
    isImportant: false,
  });

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    refresh();
  };

  const startEdit = (task) => {
    setEditing(task._id);
    setForm({
      purpose: task.purpose,
      time: task.time.slice(0, 16),
      description: task.description,
      isImportant: task.isImportant,
    });
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const updateTask = async () => {
    await axios.put(`http://localhost:5000/api/tasks/${editing}`, form, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    setEditing(null);
    refresh();
  };

  return (
    <div>
      <h3>Your Tasks</h3>

      {tasks.map((t) => (
        <div className="task-card" key={t._id}>
          {editing === t._id ? (
            <div className="card">
              <h4>Edit Task</h4>

              <input
                type="text"
                name="purpose"
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

              <button onClick={updateTask}>Save</button>
              <button onClick={() => setEditing(null)}>Cancel</button>
            </div>
          ) : (
            <>
              <h4>{t.purpose}</h4>
              <p>{new Date(t.time).toLocaleString()}</p>
              <p>{t.description}</p>
              <p>Important: {t.isImportant ? "Yes" : "No"}</p>

              <button onClick={() => startEdit(t)}>Edit</button>
              <button onClick={() => deleteTask(t._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

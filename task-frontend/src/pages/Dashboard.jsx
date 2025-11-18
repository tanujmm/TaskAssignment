import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const load = async () => {
    const res = await axios.get(`http://localhost:5000/api/tasks?q=${search}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    load();
  }, [search]);

  return (
    <div className="page">
      <div>
        <input
          type="text"
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <TaskForm refresh={load} />
      </div>

      <TaskList tasks={tasks} refresh={load} />
    </div>
  );
}

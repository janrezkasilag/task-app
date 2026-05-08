import { useEffect, useState } from "react";
import axios from "axios";
/* kjfkd */

function App() {
  const [task, setTask]  = useState("");
  const [tasks, setTasks] = useState([]);

  const API_URL = "https://your-api.vercel.app";

  // LOAD TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {
    if (!task) return;

    try {
      await axios.post(`${API_URL}/add-task`, {
        task,
      });

      setTask("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Task App</h2>

      <div className="d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul className="list-group mt-4">
        {tasks.map((item) => (
          <li key={item._id} className="list-group-item">
            {item.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
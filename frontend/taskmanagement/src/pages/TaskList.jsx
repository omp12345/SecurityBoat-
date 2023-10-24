import axios from "axios";
import React, { useState, useEffect } from "react";
import Taskdata from "./Taskdata";
import "./Tasklist.css";
import { useNavigate } from "react-router-dom";
import { url } from "../backend";

function TaskList() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setNewTask({
        ...newTask,
        [name]: checked,
        completed: true,
      });
    } else {
      setNewTask({
        ...newTask,
        [name]: value,
      });
    }
  };

  const addTask = async (fun) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const role = localStorage.getItem("role");
      if (role === "user") {
        const response = await axios
          .post(`${url}/api/task/tasks`, newTask, {
            headers: headers,
          })
          .then((res) => {});
        alert("task is cerated");
      } else {
        alert("Admin can not add the data");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-input-form">
        <h1 style={{ marginTop: "40px" }}>Add Task</h1>
        {!isLoggedIn && (
          <p style={{ color: "white", fontSize: "30px" }}>
           Please Login First You are not Authorized
          </p>
        )}
        {isLoggedIn && (
          <div>
            <input
              style={{ marginTop: "20px" }}
              type="text"
              placeholder="Title"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
            />
            <br />
            <input
              style={{ marginTop: "20px" }}
              type="text"
              placeholder="Description"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="completed">Completed:</label>
            <input
              style={{ marginTop: "20px" }}
              type="checkbox"
              name="completed"
              value={newTask.completed}
              checked={newTask.completed}
              onChange={handleInputChange}
            />
            <button onClick={addTask}>Add Task</button>
          </div>
        )}
      </div>
      <div>
        <Taskdata />
      </div>
    </div>
  );
}

export default TaskList;

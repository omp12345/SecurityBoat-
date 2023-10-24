import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Taskdata.css";
import { useNavigate } from "react-router-dom";
import { url } from "../backend";

function Taskdata() {
  const [taskdata, setTaskdata] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    getTaskData();
  }, []);

  const getTaskData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (role === "admin") {
        const res = await axios.get(`${url}/admin/admintask`, {
          headers: headers,
        });
        setTaskdata(res.data.reverse());
      } else {
        const res = await axios.get(`${url}/api/task/tasks`, {
          headers: headers,
        });
        setTaskdata(res.data);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (role === "admin") {
        await axios
          .delete(`${url}/admin/admintask/${id}`, {
            headers: headers,
          })
          .then((res) => {
            getTaskData();
          });
      } else {
        await axios
          .delete(`${url}/api/task/tasks/${id}`, {
            headers: headers,
          })
          .then((res) => {
            getTaskData();
          });
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleUpdate = (id) => {
    navigate(`task/${id}`);
  };

  return (
    <>
      <h1>Task-List</h1>
      {taskdata.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="task-card-container">
          {taskdata?.map((task, index) => (
            <div className="task-card" key={index}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              {task.completed ? (
                <span role="img" aria-label="Completed">
                  ✅
                </span>
              ) : (
                <span role="img" aria-label="Pending">
                  ⏳
                </span>
              )}
              <button style={{ color: "red", backgroundColor: "black" }} onClick={() => handleDelete(task._id)}>Delete</button>
              <button style={{ color: "green", backgroundColor: "navy" }} onClick={() => handleUpdate(task._id)}>Edit</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Taskdata;

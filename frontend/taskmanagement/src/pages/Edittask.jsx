import React, { useState } from "react";
import "./Edittask.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../backend";

function Edittask() {
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For checkboxes, use the 'checked' property to determine the value
    const newValue = type === "checkbox" ? checked : value;

    setEditedTask({
      ...editedTask,
      [name]: newValue,
    });
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const role = localStorage.getItem("role");
      // Send a PATCH request to update the task
      if (role === "admin") {
        const response = await axios.patch(
          `${url}/admin/admintask/${id}`,
          editedTask,
          {
            headers: headers,
          }
        );
      } else {
        const response = await axios.patch(
          `${url}/api/task/tasks/${id}`,
          editedTask,
          {
            headers: headers,
          }
        );
      }

      // Show a success message or handle the response as needed
      alert("Task Updated successfully");

      // Redirect back to the task list page
      navigate("/task");
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const handleClose = () => {
    navigate("/task");
  };

  return (
    <div className="edit-task-container">
      <h2>Edit Task</h2>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={handleInputChange}
        placeholder="Enter new title"
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        value={editedTask.description}
        onChange={handleInputChange}
        placeholder="Enter new description"
      />
      <label style={{ color: "white" }}>
        {editedTask.completed ? "✅ Completed" : "⏳ Pending"}:
        <input
          type="checkbox"
          name="completed"
          checked={editedTask.completed}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleEdit}>Save Changes</button>
      <button onClick={handleClose} className="close-button">
        Close
      </button>
    </div>
  );
}

export default Edittask;

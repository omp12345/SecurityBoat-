import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Taskdata.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';

function Taskdata() {
  const [taskdata, setTaskdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTaskData();
  }, []);

  const getTaskData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Fetch the task data from the API
      const res = await axios.get('http://localhost:8080/api/task/tasks', {
        headers: headers,
      });
      setTaskdata(res.data);
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Fetch the task data from the API
      const response = await axios.delete(`http://localhost:8080/api/task/tasks/${id}`, {
        headers: headers,
      }).then((res)=>{
        getTaskData()
      })
     

      setTaskdata(response.data);
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }

  const handleUpdate = (id) => {
    navigate(`task/${id}`);
  }

  return (
    <>
    <h1>Task-List</h1>
    <div className="task-card-container">
      
      {taskdata?.map((task, index) => (
        <div className="task-card" key={index}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {task.completed ? (
            <span role="img" aria-label="Completed">✅</span>
          ) : (
            <span role="img" aria-label="Pending">⏳</span>
          )}
          <button onClick={() => handleDelete(task._id)}>Delete</button>
          <button onClick={() => handleUpdate(task._id)}>Edit</button>
        </div>
      ))}
    </div>
    </>
  );
}

export default Taskdata;

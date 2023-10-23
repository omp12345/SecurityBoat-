import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Taskdata from './Taskdata';
import './Tasklist.css';
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    // Check the user's login status when the component mounts
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkboxes separately
    if (type === 'checkbox') {
      setNewTask({
        ...newTask,
        [name]: checked,
      });
    } else {
      setNewTask({
        ...newTask,
        [name]: value,
      });
    }
  };

  const addTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Update the state with the new data immediately
      const response = await axios.post('http://localhost:8080/api/task/tasks', newTask, {
        headers: headers,
      }).then((res)=>{
        
      })
      
      

      // After successful submission, you can add the new blog to the addedBlogs state or perform any other actions as needed.

    } 
    
    catch (error) {
      console.error('An error occurred:', error.message);
    }
    
  };

  return (
    <div className="task-list-container">
      <div className="task-input-form">
        <h1 style={{marginTop:"40px"}}>Add Task</h1>
        {!isLoggedIn && (
          <p style={{color:"red"}}>Please login first to add a task.</p>
        )}
        {isLoggedIn && (
          <div>
            <input style={{marginTop:"20px"}}
              type="text"
              placeholder="Title"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
            />
            <br />
            <input style={{marginTop:"20px"}}
              type="text"
              placeholder="Description"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="completed">Completed:</label>
            <input style={{marginTop:"20px"}}
              type="checkbox"
              name="completed"
              checked={newTask.completed}
              onChange={handleInputChange}
            />
            <button onClick={addTask}>Add Task</button>
            
          </div>
        )}
      </div>
      <div>
        <Taskdata  />
      </div>
    </div>
  );
}

export default TaskList;

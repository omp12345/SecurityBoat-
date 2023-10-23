import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css"
import axios from 'axios';
import { url } from '../backend';

function Navbar() {
  const navigate = useNavigate();

  const handlelogout = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        // User is not authenticated, no need to logout
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${url}/api/user/logout`, {
        headers: headers,
      });

      if (response.status === 200) {
        // Logout successful
        localStorage.removeItem('token'); // Clear the token from localStorage
        navigate('/login'); // Redirect to the login page
        alert('User Logout');
      } else {
        console.error('Logout failed.');
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/task">Tasks</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {localStorage.getItem('token') ? ( 
          <li onClick={handlelogout}>
            <Link to="#">Logout</Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navbar;

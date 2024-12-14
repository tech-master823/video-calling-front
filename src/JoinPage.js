// src/JoinPage.js

import React, { useState } from 'react';
import { Video } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

const JoinPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { roomId } = useParams();

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const getToken = () => new Promise((resolve) => {
    resolve({ data: uuidv4() });
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    getToken().then(res => {
      navigate(`/room/${roomId}?token=${res.data}`);
    })
    // Handle join logic further
    alert(`Welcome, ${username}!`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex items-center mb-4 justify-center gap-4">
          <Video size={30}/>
          <h1 className="text-2xl font-semibold text-center">Joining Lecture</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleInputChange}
              required
              className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your username"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
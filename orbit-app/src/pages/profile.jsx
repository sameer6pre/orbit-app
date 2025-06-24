import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../util';

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${BASE_URL}/delete-user/${userId}`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    console.log(`Failed to delete user with ID: ${userId}, Status: ${response.status}`);
    return { success: false, message: `Failed to delete user with ID: ${userId}` };
  }

  return response.data;
};

async (userId) => {
  if (!/^[a-zA-Z0-9_-]+$/.test(userId)) {
    throw new Error('Invalid userId format');
  }
  const response = await axios.get(`${BASE_URL}/get-user/${userId}`);
  return response.data;
}

function Profile() {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState('1');

  useEffect(() => {
    fetchUserProfile(userId).then((data) => {
      setUserData(data);
    }).catch((err) => {
      console.error('Error fetching user profile:', err);
    });
  }, [userId]);

  const handleDelete = () => {
    deleteUser(userId)
      .then((res) => {
        alert('User deleted successfully!');
      })
      .catch((err) => {
        console.error('Error deleting user:', err);
      });
  };

  return (
    <div>
      <h1>Profile Page</h1>

      <pre>{JSON.stringify(userData, null, 2)}</pre>

      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <button onClick={handleDelete}>
        Delete User
      </button>
    </div>
  );
}

export default Profile;

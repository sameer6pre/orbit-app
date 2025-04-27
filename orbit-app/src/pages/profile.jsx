import React from 'react'

// Delete user
export const deleteUser = async (userId) => {
  const response = await axios.delete(`${BASE_URL}/delete-user`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    console.log(`Failed to delete user with ID: ${userId}, Status: ${response.status}`);
    return { success: false, message: `Failed to delete user with ID: ${userId}` };
  }

  return response.data;
};

function Profile() {
  return (
    <button onClick={deleteUser(userId)}>Delete User</button>
  )
}

export default Profile
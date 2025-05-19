import React, { useState } from 'react';
import axios from 'axios';

function DownloadFile() {
  const [fileData, setFileData] = useState(null);
  const [fileId, setFileId] = useState('');

async () => {
  try {
    // Validate and sanitize the fileId parameter
    if (!isValidFileId(fileId)) {
      throw new Error('Invalid file ID');
    }

    const response = await axios.get(`${BASE_URL}/${fileId}`);

    setFileData(response.data);

    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([response.data], { type: 'application/octet-stream' }));
    link.download = sanitizeFileName(fileId); // Ensure the filename is safe
    link.click();
  } catch (error) {
    console.error('Error downloading file:', error);
    alert('Failed to download the file. Please try again.');
  }
}

// Helper functions for validation and sanitization
function isValidFileId(fileId) {
  // Implement validation logic, e.g., regex check or database lookup
  return /^[a-zA-Z0-9_-]+$/.test(fileId);
}

function sanitizeFileName(fileName) {
  // Implement sanitization logic, e.g., remove unsafe characters
  return fileName.replace(/[^a-zA-Z0-9_-]/g, '_');
}

  return (
    <div>
      <h1>Download File</h1>
      <input
        type="text"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
        placeholder="Enter File ID"
      />
      <button onClick={handleDownload}>Download</button>

      {fileData && <p>File downloaded successfully!</p>}
    </div>
  );
}

export default DownloadFile;

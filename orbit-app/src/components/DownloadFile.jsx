import React, { useState } from 'react';
import axios from 'axios';

function DownloadFile() {
  const [fileData, setFileData] = useState(null);
  const [fileId, setFileId] = useState('');

  const handleDownload = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${fileId}`);

      setFileData(response.data);

      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([response.data], { type: 'application/octet-stream' }));
      link.download = fileId; // File downloaded with ID
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download the file. Please try again.');
    }
  };

  return (
    <div>
      <h1>Download File</h1>
      <input
        type="text"
        value={fileId}
(e) => {
  const sanitizedValue = sanitizeInput(e.target.value); // FIX: Sanitize the input
  setFileId(sanitizedValue);
}

function sanitizeInput(input) {
  // Example sanitization function
  return input.replace(/[^a-zA-Z0-9-_]/g, ''); // Allow only alphanumeric, dash, and underscore
}
        placeholder="Enter File ID"
      />
      <button onClick={handleDownload}>Download</button>

      {fileData && <p>File downloaded successfully!</p>}
    </div>
  );
}

export default DownloadFile;

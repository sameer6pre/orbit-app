import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../util';

function CommentsSection() {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    // Fetch all comments
    axios.get(`${BASE_URL}/comments`)
      .then(response => {
        setCommentsList(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/comments`, { comment })
      .then(response => {
        alert('Comment added!');
        setCommentsList([...commentsList, { comment }]);
        setComment('');
      })
      .catch(error => {
        console.error('Error posting comment:', error);
      });
  };

  // FIX: Helper function to escape HTML special characters
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
        />
        <button type="submit">Submit</button>
      </form>

      <div className="comments-list">
        {commentsList.map((cmt, index) => (
          // FIX: Render comment as plain text, escaping HTML
          <div key={index}>{escapeHtml(cmt.comment)}</div>
        ))}
      </div>
    </div>
  );
}
// FIX EXPLANATION: This fix removes the use of 'dangerouslySetInnerHTML' and instead escapes HTML special characters in user comments before rendering. This prevents any injected HTML or JavaScript from being interpreted by the browser, fully mitigating XSS. For production, consider using a robust library like 'dompurify' for sanitization if HTML formatting is required.

export default CommentsSection;

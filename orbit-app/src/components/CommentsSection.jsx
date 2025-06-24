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

(e) => {
    e.preventDefault();
    const sanitizedComment = sanitizeInput(comment); // FIX: Sanitize the input before sending it to the server
    axios.post(`${BASE_URL}/comments`, { comment: sanitizedComment })
      .then(response => {
        alert('Comment added!');
        setCommentsList([...commentsList, { comment: sanitizedComment }]);
        setComment('');
      })
      .catch(error => {
        console.error('Error posting comment:', error);
      });
  }

function sanitizeInput(input) {
    // Implement a proper sanitization function here
    return input.replace(/<[^>]*>?/gm, ''); // Example: Remove HTML tags
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
          <div key={index} dangerouslySetInnerHTML={{ __html: cmt.comment }} />
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;

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

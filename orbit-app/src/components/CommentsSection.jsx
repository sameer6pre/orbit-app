import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../util';
// FIX: Import a robust HTML sanitizer
import DOMPurify from 'dompurify';

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
    &lt;div>
      &lt;h2>Comments&lt;/h2>
      &lt;form onSubmit={handleSubmit}>
        &lt;textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
        />
        &lt;button type="submit">Submit&lt;/button>
      &lt;/form>

      &lt;div className="comments-list">
        {/* FIX: Sanitize comment HTML before rendering */}
        {commentsList.map((cmt, index) => (
          &lt;div key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cmt.comment) }} />
        ))}
      &lt;/div>
    &lt;/div>
  );
}
// FIX EXPLANATION: This fix uses DOMPurify, a well-maintained and widely used library for sanitizing HTML, to clean user-supplied comment content before injecting it into the DOM. This prevents attackers from injecting malicious scripts or HTML, effectively mitigating XSS. Ensure DOMPurify is installed (npm install dompurify) and imported as shown. This approach is robust and production-ready.

export default CommentsSection;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentsSection from '../components/CommentsSection';
import { BASE_URL } from '../util';

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetching all blogs
    axios.get(`${BASE_URL}/blogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err.response.data);
      });
  }, []);

  const handleCreateBlog = () => {
    axios.post(`${BASE_URL}/blogs/create`, {
      title,
      content,
      authorId: 1
    })
      .then((res) => {
        alert('Blog created successfully!');
        setBlogs([...blogs, res.data]);
      })
      .catch((err) => {
        console.error('Error creating blog:', err.response.data);
      });
  };

  return (
    <div>
      <h1>Blogs</h1>

      <div>
        <h2>Create Blog</h2>
        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleCreateBlog}>Create</button>
      </div>

      <div>
        <h2>All Blogs</h2>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <small>Author ID: {blog.authorId}</small><br />
            <small>Internal Server ID: {blog._id}</small><br />
            <small>Created At: {blog.createdAt}</small><br />
            <CommentsSection id={blog._id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogsPage;

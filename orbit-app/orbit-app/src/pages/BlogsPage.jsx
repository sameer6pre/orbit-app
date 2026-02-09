
  useEffect(() => {
    // Fetching all blogs
    axios.get(`${BASE_URL}/blogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        // Avoid leaking server internals in client logs; include safe fallback and null checks
        console.error('Error fetching blogs:', err?.response?.data || err?.message);
      });
  }, []);

  const handleCreateBlog = async () => {
    // Basic client-side validation to reduce noisy/empty submissions
    if (!title || !title.trim() || !content || !content.trim()) {
      alert('Title and content are required.');
      return;
    }

    // Do NOT set or trust authorId on the client. Let the server associate the request
    // with the authenticated user (server should validate authentication/authorization).
    try {
      const res = await axios.post(`${BASE_URL}/blogs/create`, {
        title,
        content
      });

      alert('Blog created successfully!');
      setBlogs([...blogs, res.data]);
    } catch (err) {
      // Log a safe error message and avoid exposing internals to users
      console.error('Error creating blog:', err?.response?.data || err?.message);
      alert('Unable to create blog. Please try again later.');
    }
  };

  return (
    &lt;div>
      &lt;h1>Blogs&lt;/h1>

      &lt;div>
        &lt;h2>Create Blog&lt;/h2>
        &lt;input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        &lt;textarea
          placeholder="Blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        &lt;button onClick={handleCreateBlog}>Create&lt;/button>
      &lt;/div>

      &lt;div>
        &lt;h2>All Blogs&lt;/h2>
        {blogs.map((blog) => (
          &lt;div key={blog.id}>
            &lt;h3>{blog.title}&lt;/h3>
            &lt;p>{blog.content}&lt;/p>
            &lt;small>Author: {blog.authorName || 'Unknown'}&lt;/small>&lt;br />
            &lt;small>Created At: {blog.createdAt}&lt;/small>&lt;br />
            &lt;CommentsSection id={blog._id || blog.id} />
          &lt;/div>
        ))}
      &lt;/div>
    &lt;/div>
  );
}

export default BlogsPage;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        setBlogPosts(storedPosts);
    }, []);

    const deletePost = (id) => {
        const updatedPosts = blogPosts.filter(post => post.id !== id);
        setBlogPosts(updatedPosts);
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    };

    return (
        <div id="blogList">
            {blogPosts.map(post => (
                <div className="blog-post" key={post.id}>
                    <Link to={`/blog/${post.id}`}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </Link>
                    <button onClick={() => deletePost(post.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default BlogList;

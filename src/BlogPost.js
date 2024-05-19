import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const post = storedPosts.find(p => p.id === parseInt(id, 10));
        setPost(post);
    }, [id]);

    return (
        <div className="blog-post-container">
            {post ? (
                <>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </>
            ) : (
                <p>Post not found.</p>
            )}
        </div>
    );
};

export default BlogPost;

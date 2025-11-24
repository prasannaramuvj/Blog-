import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostList from '../components/PostList';
import Container from 'react-bootstrap/Container';

function Home() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/posts');
            setPosts(res.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handlePostClick = (post) => {
        navigate(`/post/${post._id}`);
    };

    return (
        <>
            <Container className="text-center mb-5 py-4">
                <h1 className="display-4 fw-bold">Welcome to My Tech Blog</h1>
                <p className="lead text-muted">Exploring the world of React, Bootstrap, and Modern Web Development</p>
            </Container>
            <PostList posts={posts} onPostClick={handlePostClick} />
        </>
    );
}

export default Home;

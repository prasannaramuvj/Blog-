import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostDetail from '../components/PostDetail';

function PostDetailPage() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
            setPost(res.data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return <PostDetail post={post} onBack={handleBack} />;
}

export default PostDetailPage;

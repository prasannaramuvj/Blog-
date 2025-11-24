import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

function PostDetail({ post, onBack }) {
    if (!post) return <Container className="py-5"><p>Loading...</p></Container>;

    const imageUrl = post.image?.startsWith('http') ? post.image : `http://localhost:5000${post.image}`;

    return (
        <Container className="py-5">
            <Button variant="outline-secondary" className="mb-4" onClick={onBack}>
                &larr; Back to Posts
            </Button>
            <article>
                <h1 className="display-4 mb-3">{post.title}</h1>
                <div className="text-muted mb-4">
                    <span>By {post.author}</span> &bull; <span>{new Date(post.createdAt || post.date).toLocaleDateString()}</span>
                </div>
                {post.image && <Image src={imageUrl} fluid rounded className="mb-4 w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />}
                <div className="lead">
                    {post.content}
                </div>
            </article>
        </Container>
    );
}

export default PostDetail;

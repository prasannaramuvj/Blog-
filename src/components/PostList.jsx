import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function PostList({ posts, onPostClick }) {
    return (
        <Container>
            <Row xs={1} md={2} lg={3} className="g-4">
                {posts.map((post) => {
                    const imageUrl = post.image?.startsWith('http') ? post.image : `http://localhost:5000${post.image}`;
                    const excerpt = post.content?.substring(0, 150) + '...' || 'No content available';

                    return (
                        <Col key={post._id}>
                            <Card className="h-100 shadow-sm hover-effect">
                                {post.image && <Card.Img variant="top" src={imageUrl} alt={post.title} />}
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text className="text-muted small">
                                        {new Date(post.createdAt).toLocaleDateString()} | {post.author}
                                    </Card.Text>
                                    <Card.Text>
                                        {excerpt}
                                    </Card.Text>
                                    <Button variant="primary" className="mt-auto" onClick={() => onPostClick(post)}>
                                        Read More
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default PostList;

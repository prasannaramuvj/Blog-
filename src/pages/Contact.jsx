import { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus('');

        try {
            // Send contact form data to backend
            await axios.post('http://localhost:5000/api/contact', formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h1 className="mb-4 text-center">Contact Us</h1>
                    <p className="text-center text-muted mb-4">
                        Have questions or feedback? We'd love to hear from you!
                    </p>

                    {status === 'success' && (
                        <Alert variant="success" onClose={() => setStatus('')} dismissible>
                            Thank you for contacting us! We'll get back to you soon.
                        </Alert>
                    )}

                    {status === 'error' && (
                        <Alert variant="danger" onClose={() => setStatus('')} dismissible>
                            Sorry, there was an error sending your message. Please try again.
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="your.email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Subject *</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                placeholder="What is this about?"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Message *</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                name="message"
                                placeholder="Your message..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                            disabled={submitting}
                        >
                            {submitting ? 'Sending...' : 'Send Message'}
                        </Button>
                    </Form>

                    <div className="mt-4 p-3 bg-light rounded">
                        <h5>Other Ways to Reach Us</h5>
                        <p className="mb-1"><strong>Email:</strong> info@mytechblog.com</p>
                        <p className="mb-0"><strong>Response Time:</strong> Within 24-48 hours</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;

import Container from 'react-bootstrap/Container';

function About() {
    return (
        <Container className="py-5">
            <h1 className="mb-4">About Us</h1>
            <p className="lead">
                Welcome to My Tech Blog, your go-to source for the latest in web development, React, and Bootstrap.
            </p>
            <p>
                Our mission is to provide high-quality tutorials, insights, and resources to help developers of all levels improve their skills and build amazing applications.
            </p>
            <p>
                Founded in 2023, we are passionate about open source and community-driven learning.
            </p>
        </Container>
    );
}

export default About;

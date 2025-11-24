import Container from 'react-bootstrap/Container';

function Footer() {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <Container className="text-center">
                <p className="mb-0">&copy; {new Date().getFullYear()} My Tech Blog. All rights reserved.</p>
                <small>Built with React & Bootstrap</small>
            </Container>
        </footer>
    );
}

export default Footer;

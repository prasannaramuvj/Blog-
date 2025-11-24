import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

function Navigation() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <Navbar expand="lg" className="custom-navbar mb-4" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-text">My Tech Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={isActive('/') ? 'nav-link-custom active' : 'nav-link-custom'}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/about"
                            className={isActive('/about') ? 'nav-link-custom active' : 'nav-link-custom'}
                        >
                            About
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/contact"
                            className={isActive('/contact') ? 'nav-link-custom active' : 'nav-link-custom'}
                        >
                            Contact
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/privacy"
                            className={isActive('/privacy') ? 'nav-link-custom active' : 'nav-link-custom'}
                        >
                            Privacy
                        </Nav.Link>
                        {user?.role === 'admin' && (
                            <Nav.Link
                                as={Link}
                                to="/admin"
                                className={isActive('/admin') ? 'nav-link-custom active' : 'nav-link-custom'}
                            >
                                Admin
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                <Navbar.Text className="me-3 user-text">
                                    Signed in as: <strong>{user.username}</strong>
                                </Navbar.Text>
                                <Button variant="outline-danger" size="sm" onClick={logout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link
                                    as={Link}
                                    to="/login"
                                    className={isActive('/login') ? 'nav-link-custom active' : 'nav-link-custom'}
                                >
                                    Login
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/register"
                                    className={isActive('/register') ? 'nav-link-custom active' : 'nav-link-custom'}
                                >
                                    Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;

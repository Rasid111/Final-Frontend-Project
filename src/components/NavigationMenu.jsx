import axios from 'axios';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function NavigationMenu() {
    const [categories, setCategories] = useState();
    useEffect(() => {
        axios.get("https://dummyjson.com/products/categories")
            .then((response) => {
                setCategories(response.data);
            });
    });
    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{ height: "75px" }}>
            <Container className='h-100'>
                <Navbar.Brand className='h-100' as={Link} to="/"><img src="r.png" alt="logo" className='object-fit-contain h-100' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Account">
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/cart">
                            Cart
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationMenu;
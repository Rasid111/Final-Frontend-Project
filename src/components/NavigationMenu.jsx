import { useContext, useDebugValue } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../contexts/ColorModeContex';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
import { CurrencyContext } from '../contexts/CurrencyContext';
import { LangContext } from '../contexts/LangContext';
import { useDispatch } from 'react-redux';
import { logout } from '../tools/actions/accountAction';

function NavigationMenu() {

    const [colorMode, switchColorMode] = useContext(ColorModeContext);
    const [lang, switchLang] = useContext(LangContext);
    const { currency, switchCurrency } = useContext(CurrencyContext);

    const dispatch = useDispatch();

    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{ height: "75px" }}>
            <Container className='h-100'>
                <Navbar.Brand className='h-100' as={Link} to="/"><img src={`/r-${colorMode === "dark" ? "light" : "dark"}.png`} alt="logo" className='object-fit-contain h-100' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">{lang === "en" ? "Home" : "Əsas səhifə"}</Nav.Link>
                        <Nav.Link as={Link} to="/products">{lang === "en" ? "Products" : "Məhsullar"}</Nav.Link>
                    </Nav>
                    <Nav>
                        <Container>
                            <Row>
                                <Col>
                                    <Button variant={colorMode === "dark" ? "light" : "dark"} onClick={switchLang}>{lang === "en" ? "AZ" : "EN"}</Button>
                                </Col>
                                <Col>
                                    <Button variant={colorMode === "dark" ? "light" : "dark"} onClick={switchCurrency}>{currency === "usd" ? "AZN" : "USD"}</Button>
                                </Col>
                                <Col>
                                    <Button variant={colorMode === "dark" ? "light" : "dark"} onClick={switchColorMode}>{colorMode === "dark" ? <FaRegLightbulb /> : <FaLightbulb />}</Button>
                                </Col>
                            </Row>
                        </Container>
                        <NavDropdown title={lang === "en" ? "Account" : "Hesab"}>
                            <Nav.Link as={Link} to="/register">{lang === "en" ? "Register" : "Qeydiyyat"}</Nav.Link>
                            <Nav.Link as={Link} to="/login">{lang === "en" ? "Login" : "Giriş"}</Nav.Link>
                            <Nav.Link onClick={() => dispatch(logout())}>{lang === "en" ? "Logout" : "Çıxış"}</Nav.Link>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/cart">
                            {lang === "en" ? "Cart" : "Səbət"}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationMenu;
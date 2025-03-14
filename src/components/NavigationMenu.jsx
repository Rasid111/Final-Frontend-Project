import { useContext, useDebugValue, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../contexts/ColorModeContex';
import { Container, Col, Row, Button, Offcanvas, InputGroup } from 'react-bootstrap';
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
import { CurrencyContext } from '../contexts/CurrencyContext';
import { LangContext } from '../contexts/LangContext';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../tools/actions/accountAction';

function NavigationMenu() {

    const navigate = useNavigate();
    const location = useLocation();
    const [colorMode, switchColorMode] = useContext(ColorModeContext);
    const [lang, switchLang] = useContext(LangContext);
    const { currency, switchCurrency } = useContext(CurrencyContext);
    const [show, setShow] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const isAuthenticated = useSelector(state => state.accounts.find(account => account.email === state.auth) !== null);

    const dispatch = useDispatch();

    const handleSearch = (ev) => {
        navigate(`/products?q=${searchInput === "" && searchInput === null && searchInput === undefined ? "" : searchInput}`);
    };

    return (
        <>
            <Offcanvas className="offcanva" show={show} onHide={() => setShow(false)}>
                <Container>
                    <Row className='justify-content-between text-center mt-4'>
                        <Col xs={3} className='text-start'>
                            <Button className='p-0' variant="link"><img className='small-icon' src="/icons/az.png" alt="az" /></Button>
                        </Col>
                        <Col xs={3} className='d-flex justify-content-center align-items-center text-center'>
                            <div id='colorModeSwitch' className={`${colorMode} h-100 w-100 position-relative`} onClick={() => switchColorMode()}>
                                <div className="position-absolute rounded-circle overflow-hidden">
                                    <img className='position-absolute object-fit-contain' id="sun" src="/animation_elements/sun.png" alt="sun" />
                                    <img className='position-absolute object-fit-contain' id="moon" src="/animation_elements/moon.png" alt="moon" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col>
                            <div className="ofcanva-dropdown position-relative rounded-5 overflow-hidden" style={{ backgroundColor: "#fff", height: 50 }}>
                                <img className='position-absolute arrow object-fit-contain' src="/animation_elements/arrow.png" alt="arrow" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Offcanvas>
            <Container id='navbar' className='my-5 ps-0'>
                <Row className='d-flex h-100 justify-content-between'>
                    <Col className='h-100' xs={"auto"}>
                        <Link to="/" className='h-100'><img className='h-100 object-fit-contain' src="/icons/r-light.png" alt="logo" /></Link>
                    </Col>
                    <Col className='backgrounded px-1'>
                        <Container className="d-flex align-items-center h-100 px-0">
                            <Row className='w-100 g-1 align-items-center'>
                                <Col xs={"auto"}>
                                    <Button onClick={() => setShow(true)} variant='link'><img className='object-fit-contain' style={{ height: 24 }} src="/icons/menu.png" alt="menu" /></Button>
                                </Col>
                                <Col xs={10}>
                                    <Form id='searchForm' onSubmit={(ev) => {ev.preventDefault(); handleSearch();}}>
                                        <Container fluid>
                                            <Row>
                                                <Col className='px-1'>
                                                    <Form.Control id="search" type="text" onInput={(ev) => { setSearchInput(ev.target.value) }} className='input-form h-100 w-100'></Form.Control>
                                                </Col>
                                                <Col className='px-1' xs={1}>
                                                    <Button onClick={handleSearch} className="h-100 w-100 btn-light">search.</Button>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Form>
                                </Col>
                                <Col className="h-100" xs={"auto"}>
                                    <Link>
                                        <img className="icon p-1" src="/icons/shipping.png" alt="shipping" />
                                    </Link>
                                </Col>
                                <Col className="h-100" xs={"auto"}>
                                    <Link to="/cart">
                                        <img className="icon p-1" src="/icons/cart.png" alt="cart" />
                                    </Link>
                                </Col>
                                <Col className="h-100" xs={"auto"}>
                                    <Link to={`${isAuthenticated ? "/profile" : "/login"}`}>
                                        <img className="icon p-1" src="/icons/profile.png" alt="profile" />
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className='justify-content-end text-center'>
                    <Col xs={2}>
                        <div className='d-flex g-0 justify-content-end pe-4'>
                            <div className='p-1'><Button className='p-0' variant="link"><img className='small-icon' src="/icons/location.png" alt="location" /></Button></div>
                            <div className='p-1'><Button className='p-0' variant="link"><img className='small-icon' src="/icons/dollar.png" alt="dollar" /></Button></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NavigationMenu;
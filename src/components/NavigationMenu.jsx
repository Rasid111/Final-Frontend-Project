import { useContext, useDebugValue, useEffect, useState } from 'react';
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
import supabase from '../../utils/supabase';

function NavigationMenu() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState();
    const auth = useSelector(state => state.auth.id);
    useEffect(() => {
        async function getProfile(id) {
            const { data, error } = await supabase
                .from("Users")
                .select("*")
                .eq("id", id)
                .single();
            if (error)
                console.log(error);
            else
                setProfile(data);
        }
        getProfile(auth);
    }, [auth]);
    const [colorMode, switchColorMode] = useContext(ColorModeContext);
    const [lang, switchLang] = useContext(LangContext);
    const { currency, switchCurrency } = useContext(CurrencyContext);
    const [show, setShow] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const isAuthenticated = useSelector(state => state.auth.id !== null);

    const dispatch = useDispatch();

    const handleSearch = (ev) => {
        navigate(`/products?q=${searchInput === "" && searchInput === null && searchInput === undefined ? "" : searchInput}`);
    };

    return (
        <>
            <Offcanvas className="offcanva" show={show} onHide={() => setShow(false)}>
                <Container>
                    <Row>
                        <Col className='h-100 mt-3 ms-2 p-1 rounded-4' xs={2}  style={{ backgroundColor: "white" }}>
                            <Link to="/" className='w-100'><img className='w-100 object-fit-contain' src="/icons/r-light.png" alt="logo" /></Link>
                        </Col>
                    </Row>
                    <Row className='justify-content-between text-center mt-4'>
                        <Col xs={3} className='text-start'>
                            <Button onClick={() => switchLang()} className='p-0' variant="link"><img className='small-icon w-100' src={`/icons/${lang === "en" ? "az" : "en"}.png`} alt={`${lang === "en" ? "az" : "en"}`} /></Button>
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
                            <Button
                                className="text-start align-bottom ofcanva-dropdown position-relative rounded-5 w-100 overflow-hidden"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    backgroundColor: "#fff",
                                    height: 50,
                                    borderRadius: 255,
                                    fontFamily: "Arial Rounded MT Bold",
                                    color: "#6c6cd9",
                                    fontSize: 20
                                }}
                                as={Link}
                                to={`${auth ? "/profile" : "/login"}`}>
                                {`${profile?.login ? profile.login : "Login"}`}
                                <img className='position-absolute arrow object-fit-contain' src="/animation_elements/arrow.png" alt="arrow" />
                            </Button>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col>
                            <Button
                                className="text-start align-bottom ofcanva-dropdown position-relative rounded-5 w-100 overflow-hidden"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    backgroundColor: "#fff",
                                    height: 50,
                                    borderRadius: 255,
                                    fontFamily: "Arial Rounded MT Bold",
                                    color: "#6c6cd9",
                                    fontSize: 20
                                }}
                                as={Link}
                                to="/products">
                                See Our Products
                                <img className='position-absolute arrow object-fit-contain' src="/animation_elements/arrow.png" alt="arrow" />
                            </Button>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col>
                            <Button
                                className="text-start align-bottom ofcanva-dropdown position-relative rounded-5 w-100 overflow-hidden"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    backgroundColor: "#fff",
                                    height: 50,
                                    borderRadius: 255,
                                    fontFamily: "Arial Rounded MT Bold",
                                    color: "#6c6cd9",
                                    fontSize: 20
                                }}
                                as={Link}
                                to="/about">
                                About Us
                                <img className='position-absolute arrow object-fit-contain' src="/animation_elements/arrow.png" alt="arrow" />
                            </Button>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col>
                            <Button
                                className="text-start align-bottom ofcanva-dropdown position-relative rounded-5 w-100 overflow-hidden"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    backgroundColor: "#fff",
                                    height: 50,
                                    borderRadius: 255,
                                    fontFamily: "Arial Rounded MT Bold",
                                    color: "#6c6cd9",
                                    fontSize: 20
                                }}
                                as={Link}
                                to="/faq">
                                FAQ
                                <img className='position-absolute arrow object-fit-contain' src="/animation_elements/arrow.png" alt="arrow" />
                            </Button>
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
                                    <Form id='searchForm' onSubmit={(ev) => { ev.preventDefault(); handleSearch(); }}>
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
                                    <Link to="/products">
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
                            <div className='p-1'><Button onClick={switchCurrency} className='p-0' variant="link"><img className='small-icon' src={`/icons/${currency === "usd" ? "azn" : "dollar"}.png`} alt="dollar" /></Button></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NavigationMenu;
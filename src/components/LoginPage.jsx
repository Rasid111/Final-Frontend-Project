import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "../contexts/LangContext";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";
import { login } from "../tools/slices/authSlice";
import { clearCart, setCart } from "../tools/slices/cartSlice";
import Swal from "sweetalert2";
import { ColorModeContext } from "../contexts/ColorModeContex";


function LoginPage() {

    const navigate = useNavigate();

    const [goHome, setGoHome] = useState(false);

    useEffect(() => {
        if (goHome) {
            navigate("/");
            setGoHome(false);
        }
    }, [goHome]);

    const auth = useSelector(state => state.auth.id);
    useEffect(() => {
        if (auth !== null) {
            navigate("/profile");
        }
    }, [auth]);

    const lang = useContext(LangContext)[0];
    const colorMode = useContext(ColorModeContext)[0];


    async function getUser(userData) {
        const { data } = await supabase
            .from('Users')
            .select('*')
            .eq('email', userData.email.toLowerCase())
            .eq("password", userData.password)
            .single();
        return data;
    }

    const dispatch = useDispatch();

    const loginHandle = async (ev) => {
        ev.preventDefault();
        const data = Object.fromEntries((new FormData(ev.target)).entries());
        const userData = await getUser(data);
        if (userData) {
            dispatch(login({ id: userData.id }));
            dispatch(setCart(userData.cart));
            setGoHome(true);
        } else {
            Swal.fire({
                title: "Login failed",
                text: "Incorrect email or password",
                icon: "error",
                customClass: {
                    popup: 'swal2-dark',
                }
            });
        }
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col xs={{ span: 2, offset: 1 }} lg={{ span: 1, offset: 2 }}>
                    <div className="backgrounded">
                        <Link to="/"><img className="w-100 object-fit-contain" src="/icons/home.png" alt="home" /></Link>
                    </div>
                </Col>
                <Col xs={6} className="backgrounded text-center d-flex flex-column align-items-center" style={{ borderRadius: 50 }}>
                    <div className="w-75">
                        <Form onSubmit={(ev) => { loginHandle(ev) }}>
                            <Form.Group className="text-center">
                                <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 50 }}>
                                    {lang === "en" ? "email" : "email"}.
                                </Form.Label>
                                <Form.Control name="email" className="rounded-5 py-3" type="email" />
                            </Form.Group>

                            <Form.Group className="text-center">
                                <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 50 }}>
                                {lang === "en" ? "password" : "parol"}.
                                </Form.Label>
                                <Form.Control name="password" className="rounded-5 py-3" type="password" />
                            </Form.Group>

                            <Container className="mb-5 my-2 my-lg-5">
                                <Row className="justify-content-center">
                                    <Col xs={12} xl={8} className="order-xl-2">
                                        <Button type="submit" className="w-100" variant="" style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: colorMode === "light" ? "#6c6cd9" : "black", fontSize: 40 }}>
                                            {lang === "en" ? "sign in" : "daxil olun"}
                                        </Button>
                                    </Col>
                                    <Col xs={8} xl={4} className="order-xl-1 mt-3">
                                        <div className="d-flex h-100">
                                            <img className="object-fit-contain" style={{ width: "33%" }} src="icons/mailru.png" alt="mail.ru" />
                                            <img className="object-fit-contain mx-1" style={{ width: "33%" }} src="icons/facebook.png" alt="facebook" />
                                            <img className="object-fit-contain" style={{ width: "33%" }} src="icons/google.png" alt="google" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center mt-3 text-center">
                                    <Col xs={12} lg={8} style={{ fontFamily: "Arial Rounded MT Bold", color: "white", fontSize: 30 }}>
                                        {lang === "en" ? "don't have an account?" : "hesabınız yoxdur?"}
                                    </Col>
                                </Row>
                                <Row className="mt-1 mt-lg-5 justify-content-center text-center">
                                    <Col xs={12} lg={8}>
                                        <Button as={Link} to="/register" className="w-100" variant="" style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: colorMode === "light" ? "#6c6cd9" : "black", fontSize: 40 }}>
                                            {lang === "en" ? "sign up" : "qeydiyyat"}
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage;
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "../contexts/LangContext";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";
import { login } from "../tools/slices/authSlice";
import { clearCart, setCart } from "../tools/slices/cartSlice";
import Swal from "sweetalert2";


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
                <Col xs={{ span: 1, offset: 2 }}>
                    <div className="backgrounded">
                        <Link to="/"><img className="w-100 object-fit-contain" src="/icons/home.png" alt="home" /></Link>
                    </div>
                </Col>
                <Col xs={6} className="backgrounded text-center d-flex flex-column align-items-center" style={{ borderRadius: 50 }}>
                    <div className="w-75">
                        <Form onSubmit={(ev) => { loginHandle(ev) }}>
                            <Form.Group className="text-center">
                                <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 50 }}>
                                    email.
                                </Form.Label>
                                <Form.Control name="email" className="rounded-5 py-3" type="email" />
                            </Form.Group>

                            <Form.Group className="text-center">
                                <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 50 }}>
                                    password.
                                </Form.Label>
                                <Form.Control name="password" className="rounded-5 py-3" type="password" />
                            </Form.Group>

                            <Container className="my-5">
                                <Row>
                                    <Col xs={4}>
                                        <div className="d-flex h-100">
                                            <img className="object-fit-contain ms-2" style={{ width: "33%" }} src="icons/mailru.png" alt="mail.ru" />
                                            <img className="object-fit-contain ms-2" style={{ width: "33%" }} src="icons/facebook.png" alt="facebook" />
                                            <img className="object-fit-contain ms-2" style={{ width: "33%" }} src="icons/google.png" alt="google" />
                                        </div>
                                    </Col>
                                    <Col xs={8}>
                                        <Button type="submit" variant="">
                                            <img className="object-fit-contain w-100" src="buttons/signin.png" alt="signin" />
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center mt-3 text-center">
                                    <Col xs={8}>
                                        <img className="w-100" src="/titles/donthaveanaccount.png" alt="dont have an account?" />
                                    </Col>
                                </Row>
                                <Row className="mt-5 justify-content-center text-center">
                                    <Col xs={8}>
                                        <Link to="/register">
                                            <img className="object-fit-contain w-100" src="buttons/register.png" alt="register" />
                                        </Link>
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
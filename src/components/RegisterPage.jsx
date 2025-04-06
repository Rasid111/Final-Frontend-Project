import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LangContext } from "../contexts/LangContext";
import { Link, useNavigate } from "react-router-dom";
import FormRange from "react-bootstrap/esm/FormRange";
import Swal from "sweetalert2";
import supabase from "../../utils/supabase";


function RegisterPage() {
    
    const navigate = useNavigate();

    const auth = useSelector(state => state.auth.id);
    useEffect(() => {
        if (auth !== null) {
            navigate("/profile");
        }
    }, [auth]);

    const lang = useContext(LangContext)[0];

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [formData, setFormData] = useState({
        login: null,
        email: null,
        password: null,
        confirmation: null
    });
    const cart = useSelector(state => state.cart);
    console.log(cart);
    const register = async (ev) => {
        ev.preventDefault();
        const user = Object.fromEntries((new FormData(ev.target)).entries());
        if (user.password.length >= 8 && /\d/.test(user.password) && /\D/.test(user.password) && user.password === user.confirmation) {
            const { data, error } = await supabase
                .from('Users')
                .insert([{
                    login: user.login,
                    email: user.email.toLowerCase(),
                    password: user.password,
                    cart: cart,
                    is_admin: false
                }])
                .select();
            if (error) {
                console.log(error);
                Swal.fire({
                    title: "Registration failed",
                    text: "Account with this email already exists",
                    icon: "error",
                    customClass: {
                        popup: 'swal2-dark',
                    }
                });
            } else{
                navigate("/login");
            }
        }
        setFormData(user);
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
                    <div className="w-100 px-2">
                        <Form onSubmit={(ev) => { register(ev) }}>
                            <Form.Group className="text-center">
                                <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                    login.
                                </Form.Label>
                                <Form.Control name="login" className="rounded-5 py-3" type="text" />
                            </Form.Group>

                            <Form.Group className="text-center">
                                <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                    email.
                                </Form.Label>
                                <Form.Control name="email" className="rounded-5 py-3" type="email" />
                            </Form.Group>

                            <Form.Group className="text-center">
                                <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                    password.
                                </Form.Label>
                                <Form.Control name="password" className="rounded-5 py-3" type="password" />
                                <ul>
                                    <li className={`error-span d-${formData.password === null || formData.password.length >= 8 ? "none" : "block"}`}><span>Password length must be 8 symbols or longer</span></li>
                                    <li className={`error-span d-${formData.password === null || /\d/.test(formData.password) ? "none" : "block"}`}><span>Password must conatin at least 1 number (0-9)</span></li>
                                    <li className={`error-span d-${formData.password === null || /\D/.test(formData.password) ? "none" : "block"}`}><span>Password must conatin at least 1 symbol (A-Z)</span></li>
                                </ul>
                            </Form.Group>

                            <Form.Group className="text-center">
                                <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                    password. (confirmation)
                                </Form.Label>
                                <Form.Control name="confirmation" className="rounded-5 py-3" type="password" />
                                <ul>
                                    <li className={`error-span d-${formData.confirmation === null || formData.confirmation === formData.password ? "none" : "block"}`}><span>Passwords must match</span></li>
                                </ul>
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
                                            <img className="object-fit-contain w-100" src="buttons/register.png" alt="register" />
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                        <Container className="my-5">
                            <Row className="mt-5 justify-content-center text-center">
                                <Col xs={8}>
                                    <Link to="/login">
                                        <img className="object-fit-contain w-100" src="buttons/signin.png" alt="signin" />
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterPage;
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../tools/actions/accountAction";
import { useContext, useEffect } from "react";
import { LangContext } from "../contexts/LangContext";
import { Link, useNavigate } from "react-router-dom";


function LoginPage() {

    const lang = useContext(LangContext)[0];

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth !== null) {
            navigate("/");
        }
    }, [auth]);

    const loginHandle = (ev) => {
        ev.preventDefault();
        const data = Object.fromEntries((new FormData(ev.target)).entries());
        navigate("/login");
        dispatch(login({ ...data }));
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
                        <Form onSubmit={(ev) => {loginHandle(ev)}}> 
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
        // <Container className="mt-5">
        //     <Row className="justify-content-center">
        //         <Col xs={6}>
        // <Form onSubmit={(ev) => {
        //     ev.preventDefault();
        //     let userInfo = Object.fromEntries(new FormData(ev.target).entries())
        //     dispatch(login({ ...userInfo }));
        // }}>
        //     <Form.Group className="mb-3">
        //         <Form.Label>{lang === "en" ? "Email address" : "E-poçt ünvanı"}</Form.Label>
        //         <Form.Control name="email" type="email" placeholder={lang === "en" ? "Enter email" : "E-poçtu daxil edin"} />
        //     </Form.Group>

        //     <Form.Group className="mb-3">
        //         <Form.Label>{lang === "en" ? "Password" : "Parol"}</Form.Label>
        //         <Form.Control name="password" type="password" placeholder={lang === "en" ? "Enter password" : "Parol daxil edin"} />
        //     </Form.Group>
        //     <Button variant="primary" type="submit">
        //         {lang === "en" ? "Login" : "Daxil ol"}
        //     </Button>
        // </Form>
        //         </Col>
        //     </Row>
        // </Container>
    )
}

export default LoginPage;
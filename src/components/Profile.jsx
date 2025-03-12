import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
    const profile = useSelector(state => state.accounts.find(account => account.email === state.auth));
    const [formData, setFormData] = useState({
        login: null,
        email: null,
        password: null,
        confirmation: null
    });

    const loginInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const confirmationInput = useRef();
    useEffect(() => {
        if (!profile) {
            return;
        }
        if (loginInput.current) {
            loginInput.current.value = profile.login;
        }
        if (emailInput.current) {
            emailInput.current.value = profile.email;
        }
        if (passwordInput.current) {
            passwordInput.current.value = profile.password;
        }
        if (confirmationInput.current) {
            confirmationInput.current.value = confirmationInput.confirmation;
        }
    }, [profile]);
    console.log(profile);
    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col xs={{ span: 1, offset: 2 }}>
                        <div className="backgrounded">
                            <Link to="/"><img className="w-100 object-fit-contain" src="/icons/home.png" alt="home" /></Link>
                        </div>
                    </Col>
                    <Col xs={6} className="backgrounded text-center d-flex flex-column align-items-center" style={{ borderRadius: 50 }}>
                        <div className="w-75">
                            <Form onSubmit={(ev) => { register(ev) }}>
                                <Form.Group className="text-center">
                                    <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                        login.
                                    </Form.Label>
                                    <Form.Control name="login" ref={loginInput} className="rounded-5 py-3" type="text" />
                                </Form.Group>

                                <Form.Group className="text-center">
                                    <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                        email.
                                    </Form.Label>
                                    <Form.Control name="email" ref={emailInput} className="rounded-5 py-3" type="email" />
                                </Form.Group>

                                <Form.Group className="text-center">
                                    <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                        password.
                                    </Form.Label>
                                    <Form.Control name="password" ref={passwordInput} className="rounded-5 py-3" type="password" />
                                    <ul>
                                        <li className={`error-span d-${formData.password === null || formData.password.length > 8 ? "none" : "block"}`}><span>Password length must be 8 symbols or longer</span></li>
                                        <li className={`error-span d-${formData.password === null || /\d/.test(formData.password) ? "none" : "block"}`}><span>Password must conatin at least 1 number (0-9)</span></li>
                                        <li className={`error-span d-${formData.password === null || /\D/.test(formData.password) ? "none" : "block"}`}><span>Password must conatin at least 1 symbol (A-Z)</span></li>
                                    </ul>
                                </Form.Group>

                                <Form.Group className="text-center">
                                    <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                        password. (confirmation)
                                    </Form.Label>
                                    <Form.Control name="confirmation" ref={confirmationInput} className="rounded-5 py-3" type="password" />
                                    <ul>
                                        <li className={`error-span d-${formData.confirmation === null || formData.confirmation === formData.password ? "none" : "block"}`}><span>Passwords must match</span></li>
                                    </ul>
                                </Form.Group>
                                <Container className="my-5">
                                    <Row className="justify-content-center">
                                        <Col xs={6}>
                                            <Button type="submit" className="w-100 h-100" variant="" style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#6c6cd9", fontSize: 40 }}>
                                                save
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile;
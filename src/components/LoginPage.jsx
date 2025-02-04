import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../tools/actions/accountAction";
import { useContext } from "react";
import { LangContext } from "../contexts/LangContext";
import { Link } from "react-router-dom";


function LoginPage() {

    const lang = useContext(LangContext)[0];

    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);

    return (
        <Container className="mt-5">
            <Row>
                <Col xs={{ span: 1, offset: 2 }}>
                    <div className="backgrounded">
                        <Link to="/"><img className="w-100 object-fit-contain" src="/icons/home.png" alt="home" /></Link>
                    </div>
                </Col>
                <Col xs={6} className="backgrounded text-center d-flex flex-column align-items-center" style={{borderRadius: 50}}>
                    <div className="w-75">
                        <Form>
                            <Form.Group className="text-center">
                                <Form.Label className="my-4">
                                    <img className="w-50 object-fit-contain" src="/titles/login.png" alt="login" />
                                </Form.Label>
                                <Form.Control className="rounded-5 py-3" type="email" />
                            </Form.Group>

                            <Form.Group className="text-center">
                                <Form.Label className="my-4">
                                    <img className="w-50 object-fit-contain" src="/titles/password.png" alt="password" />
                                </Form.Label>
                                <Form.Control className="rounded-5 py-3" type="password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        {/* <Container className="mt-3" fluid>
                            <Row className="justify-content-center text-center">
                                <Col xs={3}>
                                    <img className="w-100 object-fit-contain" src="/titles/login.png" alt="login" />
                                </Col>
                            </Row>
                            <Row>

                            </Row>
                        </Container> */}
                    </div>
                </Col>
            </Row>
        </Container>
        // <Container className="mt-5">
        //     <Row className="justify-content-center">
        //         <Col xs={6}>
        //             <Form onSubmit={(ev) => {
        //                 ev.preventDefault();
        //                 let userInfo = Object.fromEntries(new FormData(ev.target).entries())
        //                 dispatch(login({ ...userInfo }));
        //             }}>
        //                 <Form.Group className="mb-3">
        //                     <Form.Label>{lang === "en" ? "Email address" : "E-poçt ünvanı"}</Form.Label>
        //                     <Form.Control name="email" type="email" placeholder={lang === "en" ? "Enter email" : "E-poçtu daxil edin"} />
        //                 </Form.Group>

        //                 <Form.Group className="mb-3">
        //                     <Form.Label>{lang === "en" ? "Password" : "Parol"}</Form.Label>
        //                     <Form.Control name="password" type="password" placeholder={lang === "en" ? "Enter password" : "Parol daxil edin"} />
        //                 </Form.Group>
        //                 <Button variant="primary" type="submit">
        //                     {lang === "en" ? "Login" : "Daxil ol"}
        //                 </Button>
        //             </Form>
        //         </Col>
        //     </Row>
        // </Container>
    )
}

export default LoginPage;
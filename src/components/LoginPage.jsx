import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../tools/actions/accountAction";
import { useContext } from "react";
import { LangContext } from "../contexts/LangContext";


function LoginPage() {

    const lang = useContext(LangContext)[0];

    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={6}>
                    <Form onSubmit={(ev) => {
                        ev.preventDefault();
                        let userInfo = Object.fromEntries(new FormData(ev.target).entries())
                        dispatch(login({ ...userInfo }));
                    }}>
                        <Form.Group className="mb-3">
                            <Form.Label>{lang === "en" ? "Email address" : "E-poçt ünvanı"}</Form.Label>
                            <Form.Control name="email" type="email" placeholder={lang === "en" ? "Enter email" : "E-poçtu daxil edin"} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>{lang === "en" ? "Password" : "Parol"}</Form.Label>
                            <Form.Control name="password" type="password" placeholder={lang === "en" ? "Enter password" : "Parol daxil edin"} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {lang === "en" ? "Login" : "Daxil ol"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage;
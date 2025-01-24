import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../tools/actions/accountAction";
import { LangContext } from "../contexts/LangContext";


function RegisterPage() {


    const lang = useContext(LangContext)[0];

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={6}>
                    <Form onSubmit={(ev) => {
                        ev.preventDefault();
                        let userInfo = Object.fromEntries(new FormData(ev.target).entries())
                        dispatch(createAccount({ ...userInfo }));
                    }}>
                        <Form.Group className="mb-3">
                            <Form.Label>{lang === "en" ? "Username" : "İstifadəçi adı"}</Form.Label>
                            <Form.Control onInput={(ev) => setUsername(ev.target.value)} name="name" type="text" placeholder={lang === "en" ? "Enter username" : "İstifadəçi adı daxil edin"} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>{lang === "en" ? "Email address" : "E-poçt ünvanı"}</Form.Label>
                            <Form.Control onInput={(ev) => setEmail(ev.target.value)} name="email" type="email" placeholder={lang === "en" ? "Enter email" : "E-poçtu daxil edin"} />
                            <Form.Text className="text-muted">
                                {lang === "en" ? "We'll never share your email with anyone else." : "E-poçtunuzu heç kimlə bölüşməyəcəyik."}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>{lang === "en" ? "Password" : "Parol"}</Form.Label>
                            <Form.Control onInput={(ev) => setPassword(ev.target.value)} name="password" type="password" placeholder={lang === "en" ? "Enter password" : "Parol daxil edin"} />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={!(username.length > 0 && email.length > 0 && password.length >= 6)}>
                            {lang === "en" ? "Register" : "Qeydiyyatdan keçmək"}
                        </Button>
                        <Form.Text className="d-block">{lang === "en" ? "Password must contain at least 6 characters" : "Şifrə ən azı 6 simvoldan ibarət olmalıdır"}</Form.Text>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterPage;
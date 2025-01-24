import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../tools/actions/accountAction";


function RegisterPage() {

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
                            <Form.Label>Username</Form.Label>
                            <Form.Control onInput={(ev) => setUsername(ev.target.value)} name="name" type="text" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onInput={(ev) => setEmail(ev.target.value)} name="email" type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onInput={(ev) => setPassword(ev.target.value)} name="password" type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={!(username.length > 0 && email.length > 0 && password.length >= 6)}>
                            Register
                        </Button>
                        <Form.Text className="d-block">Password must contain at least 6 characters</Form.Text>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterPage;
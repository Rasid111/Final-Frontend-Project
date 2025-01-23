import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AccountContext } from "../contexts/AccountContext";


function RegisterPage() {

    const [isDisabled, setIsDisabled] = useState(true);

    const {
        account,
        setAccount,
        login,
        register
    } = useContext(AccountContext);
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={6}>
                    <Form onSubmit={(ev) => {
                        ev.preventDefault();
                        let userInfo = Object.fromEntries(new FormData(ev.target).entries())
                        register(userInfo.name, userInfo.email, userInfo.password);
                    }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onInput={(ev) => ev.target.value.length >= 6 ? setIsDisabled(false) : setIsDisabled(true)} name="password" type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isDisabled}>
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
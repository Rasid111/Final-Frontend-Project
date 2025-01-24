import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../tools/actions/accountAction";


function LoginPage() {

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
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage;
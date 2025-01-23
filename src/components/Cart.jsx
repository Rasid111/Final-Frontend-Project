import { useContext } from "react";
import { LangContext } from "../contexts/LangContext";
import { ColorModeContext } from "../contexts/ColorModeContex";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Cart() {

    const lang = useContext(LangContext)[0];
    const colorMode = useContext(ColorModeContext)[0];

    if (true)
        return (
            <Container>
                <Row className="mt-5 text-center">
                    <Col>
                        <h1>You cart is empty</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center text-center mt-5">
                    <Col xs={3}>
                        <Button variant={colorMode === "dark" ? "light" : "dark"} className="w-100" as={Link} to="/products"><h3>Go For Purchases</h3></Button>
                    </Col>
                </Row>
            </Container>
        );
    else
        return (
            <></>
        )
}

export default Cart;
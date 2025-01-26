import { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ColorModeContext } from "../contexts/ColorModeContex";
import { Link } from "react-router-dom";

function Footer() {

    const colorMode = useContext(ColorModeContext)[0];

    return (
        <Container className="mt-5 pb-3">
            <Row className="g-5">
                <Col xs={1}>
                    <Link to="/"><img src={`/r-${colorMode === "dark" ? "light" : "dark"}.png`} alt="logo" className='object-fit-contain w-100 h-50' /></Link>
                </Col>
                <Col>
                    <h5 className="text-center mb-4">Make Money with Us</h5>
                    <Container fluid className="p-0">
                        <Row xs={1} className="g-2">
                            <Col className="p-0 text-center"><Button className="w-75" variant="secondary">Careers</Button></Col>
                            <Col className="p-0 text-center"><Button className="w-75" variant="secondary">Sell products on R-Store</Button></Col>
                            <Col className="p-0 text-center"><Button className="w-75" variant="secondary">Advertise Your Products</Button></Col>
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <h5 className="text-center mb-4">Company</h5>
                    <Container fluid className="p-0">
                        <Row xs={1} className="g-2">
                            <Col className="p-0 text-center"><Button className="w-75" variant="secondary">About</Button></Col>
                            <Col className="p-0 text-center"><Button className="w-75" variant="secondary">FAQ</Button></Col>
                            <Col className="p-0 text-center"><Button className="w-75" variant="secondary">Blog</Button></Col>
                        </Row>
                    </Container>
                </Col>
                <Col className="text-center">
                    <h5 className="text-center mb-4">Have something to say?</h5>
                    <Button variant={colorMode === "dark" ? "light" : "dark"} className="w-75">Contact us</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;
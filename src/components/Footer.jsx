import { useContext } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { ColorModeContext } from "../contexts/ColorModeContex";
import { Link } from "react-router-dom";
import { LangContext } from "../contexts/LangContext";

function Footer() {

    const colorMode = useContext(ColorModeContext)[0];
    const lang = useContext(LangContext)[0];

    return (
        <div className="footer">
            <Container className="mt-5 py-3 h-100">
                <Row className="text-white text-center justify-content-center h-100">
                    <Col className="h-100" xs={4}>
                        <div className="rounded-3 p-2 footer-block h-100">
                            <span className="align-middle h6">{lang === "en" ? "for sellers" : "satıcılar üçün"}.</span>
                            <hr></hr>
                            <Container>
                                <Row className="justify-content-center g-3">
                                    <Col xs={12} className="p-0 text-center"><Button variant="link">{lang === "en" ? "Careers" : "Karyera"}</Button></Col>
                                    <Col xs={12} className="p-0 text-center"><Button variant="link">{lang === "en" ? "Sell products on R-Store" : "Məhsulları R-Store-da satmaq"}</Button></Col>
                                    <Col xs={12} className="p-0 text-center"><Button variant="link">{lang === "en" ? "Advertise Your products" : "Məhsullarınızı reklam edin"}</Button></Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col className="h-100" xs={4}>
                        <div className="rounded-3 p-2 footer-block h-100">
                            <span className="align-middle h6">about us.</span>
                            <hr></hr>
                            <Container>
                                <Row className="justify-content-center g-3">
                                    <Col xs={12} className="p-0 text-center"><Button variant="link">{lang === "en" ? "About" : "Haqqımızda"}</Button></Col>
                                    <Col xs={12} className="p-0 text-center"><Button as={Link} to="/faq" variant="link">{lang === "en" ? "FAQ" : "FAQ"}</Button></Col>
                                    <Col xs={12} className="p-0 text-center"><Button variant="link">{lang === "en" ? "Blog" : "Bloq"}</Button></Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col className="h-100" xs={4}>
                        <div className="rounded-3 p-2 footer-block h-100">
                            <span className="align-middle h6">{lang === "en" ? "for customers" : "müştərilər üçün"}.</span>
                            <hr></hr>
                            <Container>
                                <Row className="justify-content-center g-3">
                                    <Col className="text-center">
                                        <Form>
                                            <Container fluid className="mt-2 mb-3">
                                                <Row className="g-3">
                                                    <Col xs={12}>
                                                        <Form.Control type="email" placeholder={`${lang === "en" ? "Enter email" : "E-poçtu daxil edin"}`} />
                                                    </Col>
                                                    <Col xs={12}>
                                                        <Form.Control type="text" placeholder={`${lang === "en" ? "Enter you message" : "Mesajınızı daxil edin"}`} />
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Form>
                                        <Button className="more w-75">{lang === "en" ? "" : ""}{lang === "en" ? "Contact us" : "Bizimlə əlaqə saxlayın"}</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer;
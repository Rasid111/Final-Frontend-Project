import { useContext } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { ColorModeContext } from "../contexts/ColorModeContex";
import { Link } from "react-router-dom";

function Footer() {

    const colorMode = useContext(ColorModeContext)[0];

    return (
        <div className="footer">
            <Container className="mt-5 py-3 h-100">
                <Row className="text-white text-center justify-content-center h-100">
                    <Col className="h-100" xs={4}>
                        <div className="rounded-3 p-2 footer-block h-100">
                            <span className="align-middle h6">for sellsers.</span>
                            <hr></hr>
                            <Container>
                                <Row className="justify-content-center g-3">
                                    <Col xs={8} className="p-0 text-center"><Button variant="link">Careers</Button></Col>
                                    <Col xs={8} className="p-0 text-center"><Button variant="link">Sell products on R-Store</Button></Col>
                                    <Col xs={8} className="p-0 text-center"><Button variant="link">Advertise Your Products</Button></Col>
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
                                    <Col xs={8} className="p-0 text-center"><Button variant="link">About</Button></Col>
                                    <Col xs={8} className="p-0 text-center"><Button variant="link">FAQ</Button></Col>
                                    <Col xs={8} className="p-0 text-center"><Button variant="link">Blog</Button></Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col className="h-100" xs={4}>
                        <div className="rounded-3 p-2 footer-block h-100">
                            <span className="align-middle h6">for customers.</span>
                            <hr></hr>
                            <Container>
                                <Row className="justify-content-center g-3">
                                    <Col className="text-center">
                                        <Form>
                                            <Container fluid className="mt-2 mb-3">
                                                <Row className="g-3">
                                                    <Col xs={12}>
                                                        <Form.Control type="email" placeholder="Enter email" />
                                                    </Col>
                                                    <Col xs={12}>
                                                        <Form.Control type="text" placeholder="Enter you message" />
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Form>
                                        <Button className="more w-75">Contact us</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

        // <Container className="mt-5 pb-3">
        //     <Row className="g-5">
        //         <Col xs={1}>
        //             <Link to="/"><img src={`/r-${colorMode === "dark" ? "light" : "dark"}.png`} alt="logo" className='object-fit-contain w-100 h-50' /></Link>
        //         </Col>
        //         <Col>
        //             <h5 className="text-center mb-4">Make Money with Us</h5>
        //             <Container fluid className="p-0">
        //                 <Row xs={1} className="g-2">
        //                     <Col className="p-0 text-center"><Button className="w-75" variant="secondary">Careers</Button></Col>
        //                     <Col className="p-0 text-center"><Button className="w-75" variant="secondary">Sell products on R-Store</Button></Col>
        //                     <Col className="p-0 text-center"><Button className="w-75" variant="secondary">Advertise Your Products</Button></Col>
        //                 </Row>
        //             </Container>
        //         </Col>
        //         <Col>
        //             <h5 className="text-center mb-4">Company</h5>
        //             <Container fluid className="p-0">
        //                 <Row xs={1} className="g-2">
        //                     <Col className="p-0 text-center"><Button className="w-75" variant="secondary">About</Button></Col>
        //                     <Col className="p-0 text-center"><Button className="w-75" variant="secondary">FAQ</Button></Col>
        //                     <Col className="p-0 text-center"><Button className="w-75" variant="secondary">Blog</Button></Col>
        //                 </Row>
        //             </Container>
        //         </Col>
        //         <Col className="text-center">
        //             <h5 className="text-center mb-4">Have something to say?</h5>
        //             <Button variant={colorMode === "dark" ? "light" : "dark"} className="w-75">Contact us</Button>
        //         </Col>
        //     </Row>
        // </Container>
    )
}

export default Footer;
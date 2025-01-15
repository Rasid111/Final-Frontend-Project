import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [topProducts, setTopProducts] = useState([]);
    useEffect(() => {
        axios.get("https://dummyjson.com/products?sortBy=rating&order=desc&limit=5")
            .then((response) => {
                setTopProducts(response.data);
            });
    }, []);
    console.log(topProducts);
    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <h1 className="text-center">Welcome to RStore!</h1>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="text-center" xs={3}>
                    <h2>Top Products</h2>
                    {
                        topProducts.length === 0 ?
                            (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) :
                            (<Swiper
                                loop={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                modules={[Autoplay]}
                                slidesPerView={1}
                            >
                                {topProducts.products.map((p, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <Card className="border-0">
                                                <Card.Img variant="top" src={p.thumbnail} />
                                                <Card.Body>
                                                    <Card.Title>{p.title}</Card.Title>
                                                    <Card.Text>
                                                        ${p.price}
                                                    </Card.Text>
                                                    <Button variant="primary">Add to cart</Button>
                                                </Card.Body>
                                            </Card>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                            )
                    }
                </Col>
                <Col >

                </Col>
            </Row>
        </Container>
    )
}

export default Home;
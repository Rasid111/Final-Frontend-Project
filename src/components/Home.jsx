import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import 'swiper/css';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Slide from "./Slider";
import { LangContext } from "../contexts/LangContext";

function Home() {

    const lang = useContext(LangContext)[0];

    const [topProducts, setTopProducts] = useState([]);
    const [laptops, setLaptops] = useState([]);
    const [smartphones, setSmartphones] = useState([]);

    useEffect(() => {
        axios.get("https://dummyjson.com/products?sortBy=rating&order=desc&limit=10")
            .then((response) => {
                setTopProducts(response.data.products);
            });
        axios.get("https://dummyjson.com/products/category/laptops")
            .then((response) => {
                setLaptops(response.data.products);
            });
        axios.get("https://dummyjson.com/products/category/smartphones")
            .then((response) => {
                setSmartphones(response.data.products);
            });
    }, []);

    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <h1 className="text-center">{lang === "en" ? "Welcome to RStore!" : "RStore-a xoş gəlmisiniz!"}</h1>
                </Col>
            </Row>
            <Row className="mt-5 justify-content-center g-5">
                <Col className="text-center" xs={12}>
                    <h2 className="mb-5">{lang === "en" ? "Most Popular" : "Ən Populyar"}</h2>
                    {
                        topProducts.length === 0 ?
                            (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) :
                            (
                                <Slide products={topProducts}></Slide>
                            )
                    }
                </Col>
                <Col className="text-center" xs={6}>
                    <h2 className="mb-5">{lang === "en" ? "The Best Laptop Solutions" : "Ən yaxşı noutbuk həlləri"}</h2>
                    {
                        topProducts.length === 0 ?
                            (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) :
                            (
                                <Slide slidesPerView={2} products={laptops}></Slide>
                            )
                    }
                </Col>
                <Col className="text-center" xs={6}>
                    <h2 className="mb-5">{lang === "en" ? "Smarthpones To Be Always Online" : "Həmişə onlayn olmağınız üçün smartfonlar"}</h2>
                    {
                        topProducts.length === 0 ?
                            (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) :
                            (
                                <Slide slidesPerView={2} products={smartphones}></Slide>
                            )
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Home;
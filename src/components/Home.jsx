import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import 'swiper/css';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Slide from "./Slider";
import { LangContext } from "../contexts/LangContext";

function Home() {

    const lang = useContext(LangContext)[0];

    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        axios.get("https://dummyjson.com/products?sortBy=rating&order=desc&limit=5")
            .then((response) => {
                setTopProducts(response.data.products);
            });
    }, []);

    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <h1 className="text-center">{lang === "en" ? "Welcome to RStore!" : "RStore-a xoş gəlmisiniz!"}</h1>
                </Col>
            </Row>
            <Row className="mt-5 justify-content-center">
                <Col className="text-center" xs={4}>
                    <h2>{lang === "en" ? "Most Popular" : "Ən Populyar"}</h2>
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
                {/* <Col className="text-center" xs={4}>
                    <h2>{lang === "en" ? "Your Cart" : "Səbətiniz"}</h2>
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
                </Col> */}
            </Row>
        </Container>
    )
}

export default Home;
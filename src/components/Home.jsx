import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import 'swiper/css';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Slide from "./Slider";
import { LangContext } from "../contexts/LangContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";

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
        <>
            <Container style={{ marginTop: 100 }}>
                <Row className="justify-content-center text-center">
                    <Col className="backgrounded p-3">
                        <Swiper
                            style={{ borderRadius: 14 }}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Pagination]}
                            slidesPerView={1}
                            pagination={{
                                el: '.custom-pagination',
                                clickable: true,
                                renderBullet: (index, className) => {
                                    return `<div class="${className}"></div>`;
                                },
                            }}
                        >
                            <SwiperSlide>
                                <img className="w-100 object-fit-contain" src="./banners/sales1.png" alt="sales1" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="w-100 object-fit-contain" src="./banners/sales2.png" alt="sales2" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="w-100 object-fit-contain" src="./banners/sales3.png" alt="sales3" />
                            </SwiperSlide>
                        </Swiper>
                    </Col>
                    <div className="custom-pagination"></div>
                </Row>
            </Container >
            <Container className="mt-5">
                <Row className="justify-content-center text-center">
                    <Col className="title my-3">
                        <img src="./titles/title1.png" alt="title1" />
                    </Col>
                </Row>
                <Row>
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
                </Row>
            </Container>
            <Container className="mt-5">
                <Row className="justify-content-center text-center">
                    <Col className="title my-3">
                        <img src="./titles/title2.png" alt="title2" />
                    </Col>
                </Row>
                <Row>
                    {
                        [...laptops, ...smartphones].length === 0 ?
                            (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) :
                            (
                                <Slide products={[...laptops, ...smartphones]}></Slide>
                            )
                    }
                </Row>
            </Container>
        </>
        // <Container>
        //     <Row className="mt-5">
        //         <Col>
        //             <h1 className="text-center">{lang === "en" ? "Welcome to RStore!" : "RStore-a xoş gəlmisiniz!"}</h1>
        //         </Col>
        //     </Row>
        //     <Row className="mt-5 justify-content-center g-5">
        //         <Col className="text-center" xs={12}>
        //             <h2 className="mb-5">{lang === "en" ? "Most Popular" : "Ən Populyar"}</h2>
        //             {
        //                 topProducts.length === 0 ?
        //                     (
        //                         <Spinner animation="border" role="status">
        //                             <span className="visually-hidden">Loading...</span>
        //                         </Spinner>
        //                     ) :
        //                     (
        //                         <Slide products={topProducts}></Slide>
        //                     )
        //             }
        //         </Col>
        //         <Col className="text-center" xs={6}>
        //             <h2 className="mb-5">{lang === "en" ? "The Best Laptop Solutions" : "Ən yaxşı noutbuk həlləri"}</h2>
        //             {
        //                 topProducts.length === 0 ?
        //                     (
        //                         <Spinner animation="border" role="status">
        //                             <span className="visually-hidden">Loading...</span>
        //                         </Spinner>
        //                     ) :
        //                     (
        //                         <Slide slidesPerView={2} products={laptops}></Slide>
        //                     )
        //             }
        //         </Col>
        //         <Col className="text-center" xs={6}>
        //             <h2 className="mb-5">{lang === "en" ? "Smarthpones To Be Always Online" : "Həmişə onlayn olmağınız üçün smartfonlar"}</h2>
        //             {
        //                 topProducts.length === 0 ?
        //                     (
        //                         <Spinner animation="border" role="status">
        //                             <span className="visually-hidden">Loading...</span>
        //                         </Spinner>
        //                     ) :
        //                     (
        //                         <Slide slidesPerView={2} products={smartphones}></Slide>
        //                     )
        //             }
        //         </Col>
        //     </Row>
        // </Container>
    )
}

export default Home;
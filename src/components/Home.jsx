import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import 'swiper/css';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Slide from "./Slider";
import { LangContext } from "../contexts/LangContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";
import WOW from "wow.js";
import "animate.css";
import supabase from "../../utils/supabase";

function Home() {

    const lang = useContext(LangContext)[0];

    const [topProducts, setTopProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const wow = new WOW({
                boxClass: "wow",
                animateClass: "animate__animated",
                offset: 0,
                mobile: true,
                live: true,
            });
            wow.init();
        }
    }, []);

    useEffect(() => {
        axios.get("https://dummyjson.com/products?sortBy=rating&order=desc&limit=10")
            .then((response) => {
                setTopProducts(response.data.products);
            });
        axios.get("https://dummyjson.com/products?limit=0")
            .then((response) => {
                setProducts(response.data.products);
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
                <Row className="justify-content-center text-center wow animate__fadeInLeft">
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
                <Row className="justify-content-center text-center wow animate__fadeInRight">
                    <Col className="title my-3">
                        <img src="./titles/title2.png" alt="title2" />
                    </Col>
                </Row>
                <Row xs={4} className='g-4 mt-3 wow'>
                    {
                        products.length > 0 ? (
                            products.map((product, index) =>
                                <Col key={index}>
                                    <ProductCard data-wow-iteration="infinite" className="border rounded wow animate__bounceInUp" product={product} />
                                </Col>)
                        ) : null
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
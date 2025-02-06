import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import 'swiper/css';
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Slide from "./Slider";
import { LangContext } from "../contexts/LangContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";
import WOW from "wow.js";
import "animate.css";
import supabase from "../../utils/supabase";
import { Link } from "react-router-dom";

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
        axios.get("https://dummyjson.com/products?limit=8")
            .then((response) => {
                setProducts(response.data.products);
            });
    }, []);

    const [isVisible, setIsVisible] = useState(false);
    const carRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(carRef.current);
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
            <Container className="my-5">
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
            <Container className="categories mb-5" fluid>
                <Row className="justify-content-center text-center">
                    <Col className="title mt-5">
                        <img src="./titles/categories.png" alt="categories" />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col style={{ maxWidth: "12.5%" }}>
                        <div className="w-100 my-3 mb-5 rounded-circle" style={{ backgroundColor: "#fff", aspectRatio: "1 / 1" }}>
                            <Link className="zoom-category-image d-flex rounded-circle justify-content-center w-100 h-100 align-items-center" style={{ backgroundColor: "#fff" }}>
                                <img className="object-fit-contain" style={{ width: "62.5%", height: "62.5%" }} src="/icons/categories/smartphone.png" alt="smartphone" />
                            </Link>
                        </div>
                    </Col>
                    <Col style={{ maxWidth: "12.5%" }}>
                        <div className="w-100 my-3 mb-5 rounded-circle" style={{ backgroundColor: "#fff", aspectRatio: "1 / 1" }}>
                            <Link className="zoom-category-image d-flex rounded-circle justify-content-center w-100 h-100 align-items-center" style={{ backgroundColor: "#fff" }}>
                                <img className="object-fit-contain" style={{ width: "62.5%", height: "62.5%" }} src="/icons/categories/sport.png" alt="sport" />
                            </Link>
                        </div>
                    </Col>
                    <Col style={{ maxWidth: "12.5%" }}>
                        <div className="w-100 my-3 mb-5 rounded-circle" style={{ backgroundColor: "#fff", aspectRatio: "1 / 1" }}>
                            <Link className="zoom-category-image d-flex rounded-circle justify-content-center w-100 h-100 align-items-center" style={{ backgroundColor: "#fff" }}>
                                <img className="object-fit-contain" style={{ width: "62.5%", height: "62.5%" }} src="/icons/categories/grocery.png" alt="grocery" />
                            </Link>
                        </div>
                    </Col>
                    <Col style={{ maxWidth: "12.5%" }}>
                        <div className="w-100 my-3 mb-5 rounded-circle" style={{ backgroundColor: "#fff", aspectRatio: "1 / 1" }}>
                            <Link className="zoom-category-image d-flex rounded-circle justify-content-center w-100 h-100 align-items-center" style={{ backgroundColor: "#fff" }}>
                                <img className="object-fit-contain" style={{ width: "62.5%", height: "62.5%" }} src="/icons/categories/beauty.png" alt="beauty" />
                            </Link>
                        </div>
                    </Col>
                    <Col style={{ maxWidth: "12.5%" }}>
                        <div className="w-100 my-3 mb-5 rounded-circle" style={{ backgroundColor: "#fff", aspectRatio: "1 / 1" }}>
                            <Link className="zoom-category-image d-flex rounded-circle justify-content-center w-100 h-100 align-items-center" style={{ backgroundColor: "#fff" }}>
                                <img className="object-fit-contain" style={{ width: "62.5%", height: "62.5%" }} src="/icons/categories/kitchen.png" alt="kitchen" />
                            </Link>
                        </div>
                    </Col>
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
            <Container className="mt-5 cards-section">
                <Row className="mt-5 g-5 pb-2">
                    <Col xs={6} className="mt-2">
                        <div onClick={() => { }} className="overflow-hidden" style={{ backgroundColor: "#6464C6", borderRadius: 50, border: "5px solid white", cursor: "pointer" }}>
                            <img className="zoom-image w-100 object-fit-contain" src="/banners/homeproducts.png" alt="homeproducts" />
                        </div>
                    </Col>
                    <Col xs={6} className="mt-2">
                        <div onClick={() => { }} className="overflow-hidden" style={{ backgroundColor: "white", borderRadius: 50, border: "5px solid #6464C6", cursor: "pointer" }}>
                            <img className="zoom-image w-100 object-fit-contain" src="/banners/gamingproducts.png" alt="gamingproducts" />
                        </div>
                    </Col>
                    <Col xs={6} className="mt-2">
                        <div onClick={() => { }} className="overflow-hidden" style={{ backgroundColor: "#6464C6", borderRadius: 50, border: "5px solid white", cursor: "pointer" }}>
                            <img className="zoom-image w-100 object-fit-contain" src="/banners/homeproducts.png" alt="homeproducts" />
                        </div>
                    </Col>
                    <Col xs={6} id="laptop" className="mt-2 position-relative">
                        <div onClick={() => { }} className="overflow-hidden" style={{ backgroundColor: "white", borderRadius: 50, border: "5px solid #6464C6", cursor: "pointer" }}>
                            <img className="w-100 object-fit-contain" src="/banners/laptops.png" alt="laptop" />
                        </div>
                        <div className="red-dot" />
                    </Col>
                </Row>
            </Container>
            <Container className="categories my-5" fluid>
                <Row className="justify-content-center text-center pt-3" style={{ color: "#fff" }}>
                    <Col xs={2}>
                        <h3>for women.</h3>
                    </Col>
                    <Col xs={2}>
                        <h3>for men.</h3>
                    </Col>
                    <Col xs={2}>
                        <h3>for kids.</h3>
                    </Col>
                </Row>
                <Row className="justify-content-center text-center pb-3">
                    <Col className="for" xs={2} id="forWomen">
                        <Link className="d-block w-100 h-100">
                            <div className="w-100 h-100 rounded-circle p-5 overflow-hidden position-relative">
                                <img className="object-fit-contain position-absolute" src="/icons/forwomen.png" alt="forwomen" />
                            </div>
                        </Link>
                    </Col>
                    <Col className="for" xs={2} id="forMen">
                        <Link className="d-block w-100 h-100">
                            <div className="w-100 h-100 rounded-circle p-5 overflow-hidden position-relative">
                                <img className="object-fit-contain position-absolute" src="/icons/formen.png" alt="forwomen" />
                            </div>
                        </Link>
                    </Col>
                    <Col className="for" xs={2} id="forKids">
                        <Link className="d-block w-100 h-100">
                            <div className="w-100 h-100 rounded-circle p-5 overflow-hidden position-relative">
                                <img className="object-fit-contain position-absolute" src="/icons/forkids.png" alt="forwomen" />
                            </div>
                        </Link>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="fluid-section">
                <Row>
                    <Col xs={4} ref={carRef} className="position-relative ps-0" style={{ height: 250 }}>
                        <img id="car" className={`${isVisible ? "scrolled " : ""}position-absolute object-fit-cover`} src="/animation_elements/car.png" alt="car" />
                    </Col>
                    <Col xs={8} className="align-self-center">
                        <h1 className="text-white" style={{fontFamily:"Century Gothic", fontSize: 75}}>Explore available vehicles</h1>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home;
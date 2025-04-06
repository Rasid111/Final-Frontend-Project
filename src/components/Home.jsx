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

function Login() {
    const [products, setProducts] = useState([]);
    
}

function Home() {

    const lang = useContext(LangContext)[0];

    const [topProducts, setTopProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [cars, setCars] = useState([]);
    const [motorcycles, setMotorcycles] = useState([]);

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
        const getTopProducts = async () => {
            const { data } = await supabase
                .from("Products")
                .select("*")
                .limit(10)
                .order('rating', { ascending: false })
            setTopProducts(data);
        }
        const getRecomendedProducts = async () => {
            const { data } = await supabase
                .from("Products")
                .select("*")
                .limit(8);
            setProducts(data);
        }
        const getCars = async () => {
            const { data } = await supabase
                .from("Products")
                .select("*")
                .eq('category', "vehicle")
                .limit(4);
            setCars(data);
        }
        const getMotorcycles = async () => {
            const { data } = await supabase
                .from("Products")
                .select("*")
                .eq('category', "motorcycle")
                .limit(4);
            setMotorcycles(data);
        }
        getTopProducts();
        getRecomendedProducts();
        getCars();
        getMotorcycles();
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

    useEffect(() => {
        document.getElementById("smartphone").querySelectorAll("img").forEach((img, index) => {
            if (index !== 1)
                img.addEventListener("animationcancel", (ev) => {
                    console.log("sometimes works. idk");
                    ev.target.classList.toggle("opacity-0");
                });
        });
    });

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
            <Container className="fluid-section mb-5" fluid>
                <Row className="justify-content-center text-center">
                    <Col className="title mt-5">
                        <img src="./titles/categories.png" alt="categories" />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col style={{ maxWidth: "12.5%" }}>
                        <div className="w-100 my-3 mb-5 rounded-circle" style={{ backgroundColor: "#fff", aspectRatio: "1 / 1" }}>
                            <Link id="smartphone" className="overflow-hidden d-flex position-relative rounded-circle justify-content-center w-100 h-100 align-items-center" style={{ backgroundColor: "#fff" }}>
                                <img onAnimationStart={(ev) => ev.target.classList.toggle("opacity-0")} onAnimationEnd={(ev) => ev.target.classList.toggle("opacity-0")} className="opacity-0 object-fit-contain position-absolute" style={{ width: "5%" }} src="/animation_elements/smartphonebar.png" alt="smartphone" />
                                <img className="object-fit-contain position-absolute" style={{ width: "62.5%", height: "62.5%" }} src="/icons/categories/smartphone.png" alt="smartphone" />
                                <img onAnimationStart={(ev) => ev.target.classList.toggle("opacity-0")} onAnimationEnd={(ev) => ev.target.classList.toggle("opacity-0")} className="opacity-0 object-fit-contain position-absolute" style={{ width: "5%" }} src="/animation_elements/smartphonebar.png" alt="smartphone" />
                            </Link>
                        </div>
                    </Col>
                    <Col style={{ maxWidth: "12.5%" }}>
                        <div className="w-100 my-3 mb-5 rounded-circle" style={{ backgroundColor: "#fff", aspectRatio: "1 / 1" }}>
                            <Link id="sport" className="overflow-hidden d-flex position-relative rounded-circle justify-content-center w-100 h-100 align-items-center" style={{ backgroundColor: "#fff" }}>
                                <img className="object-fit-contain position-absolute" style={{ width: "62.5%", height: "62.5%" }} src="/icons/categories/sport.png" alt="sport" />
                            </Link>
                        </div>
                    </Col>
                    <Col style={{ maxWidth: "12.5%" }}>
                        <div className="w-100 my-3 mb-5 rounded-circle" style={{ backgroundColor: "#fff", aspectRatio: "1 / 1" }}>
                            <Link id="grocery" className="overflow-hidden d-flex position-relative rounded-circle justify-content-center w-100 h-100 align-items-center" style={{ backgroundColor: "#fff" }}>
                                <img className="object-fit-contain position-absolute" style={{ width: "62.5%", height: "62.5%" }} src="/icons/categories/grocery.png" alt="grocery" />
                            </Link>
                        </div>
                    </Col>
                    <Col style={{ maxWidth: "12.5%" }}>
                        <div className="w-100 my-3 mb-5 rounded-circle" style={{ backgroundColor: "#fff", aspectRatio: "1 / 1" }}>
                            <Link id="beauty" className="overflow-hidden d-flex position-relative rounded-circle justify-content-center w-100 h-100 align-items-center" style={{ backgroundColor: "#fff" }}>
                                <img className="object-fit-contain position-absolute" src="/animation_elements/beauty1.png" alt="beauty1" />
                                <img className="object-fit-contain position-absolute" src="/animation_elements/beauty2.png" alt="beauty2" />
                                <img className="object-fit-contain position-absolute" src="/animation_elements/beauty3.png" alt="beauty3" />
                            </Link>
                        </div>
                    </Col>
                    <Col style={{ maxWidth: "12.5%" }}>
                        <div className="w-100 my-3 mb-5 rounded-circle" style={{ backgroundColor: "#fff", aspectRatio: "1 / 1" }}>
                            <Link id="kitchen" className="overflow-hidden d-flex position-relative rounded-circle justify-content-center w-100 h-100 align-items-center" style={{ backgroundColor: "#fff" }}>
                                <img className="object-fit-contain position-absolute" style={{ width: "62.5%", height: "62.5%" }} src="/animation_elements/knife.png" alt="kitchen" />
                                <img className="object-fit-contain position-absolute" style={{ width: "62.5%", height: "62.5%" }} src="/animation_elements/pan.png" alt="kitchen" />
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
                                    <ProductCard data-wow-iteration="infinite" className="wow animate__bounceInUp" product={product} />
                                </Col>)
                        ) : null
                    }
                </Row>
            </Container>
            <Container className="mt-5 cards-section">
                <Row className="g-3 pb-4">
                    <Col xs={6} className="">
                        <div onClick={() => { }} className="overflow-hidden" style={{ backgroundColor: "#6464C6", borderRadius: 50, border: "5px solid white", cursor: "pointer" }}>
                            <img className="zoom-image w-100 object-fit-contain" src="/banners/homeproducts.png" alt="homeproducts" />
                        </div>
                    </Col>
                    <Col xs={6} id="gamingProducts" className="">
                        <div onClick={() => { }} className="overflow-hidden position-relative h-100" style={{ backgroundColor: "#fff", borderRadius: 50, border: "5px solid #6464C6", cursor: "pointer" }}>
                            <img className="w-100 position-absolute object-fit-contain" src="/banners/gamingproducts.png" alt="gamingproducts" />
                            <img className="w-100 position-absolute object-fit-contain" src="/animation_elements/gamepad.png" alt="gamingproducts" />
                            <img className="w-100 position-absolute object-fit-contain" src="/animation_elements/wire.png" alt="gamingproducts" />
                        </div>
                    </Col>
                    <Col xs={6} id="toys" className="">
                        <div onClick={() => { }} className="overflow-hidden position-relative h-100 p-4" style={{ backgroundColor: "#fff", borderRadius: 50, border: "8px solid #6464C6", cursor: "pointer" }}>
                            <img className="w-100 position-absolute object-fit-contain" src="/animation_elements/toys.png" alt="gamingproducts" />
                            <img className="w-100 position-absolute object-fit-contain" src="/animation_elements/bird.png" alt="gamingproducts" />
                            <img className="w-100 position-absolute object-fit-contain" src="/animation_elements/bar.png" alt="gamingproducts" />
                            <img className="w-100 position-absolute object-fit-contain" src="/animation_elements/capsule1.png" alt="gamingproducts" />
                            <img className="w-100 position-absolute object-fit-contain" src="/animation_elements/capsule2.png" alt="gamingproducts" />
                            <img className="w-100 position-absolute object-fit-contain" src="/animation_elements/capsule3.png" alt="gamingproducts" />
                            <img className="w-100 position-absolute object-fit-contain" src="/animation_elements/capsule4.png" alt="gamingproducts" />
                        </div>
                    </Col>
                    <Col xs={6} id="laptop" className="position-relative">
                        <div onClick={() => { }} className="overflow-hidden" style={{ backgroundColor: "white", borderRadius: 50, cursor: "pointer" }}>
                            <img className="w-100 object-fit-contain" src="/banners/laptops.png" alt="laptop" />
                        </div>
                        <div className="red-dot" />
                    </Col>
                </Row>
            </Container>
            <Container className="px-0">
                <Row className="g-0 text-center">
                    <Col xs={6} style={{ backgroundColor: "#6464C6", color: "#6464C6" }}>
                        <div style={{ backgroundColor: "#EAEAEA", borderBottomLeftRadius: 50, borderBottomRightRadius: 50, fontFamily: "Arial Rounded MT Bold", fontSize: 70 }}>
                            top selling from
                        </div>
                    </Col>
                    <Col xs={6} style={{ backgroundColor: "#EAEAEA", color: "#EAEAEA" }}>
                        <div style={{ backgroundColor: "#6464C6", borderTopLeftRadius: 50, borderTopRightRadius: 50, fontFamily: "Arial Rounded MT Bold", fontSize: 70 }}>
                            this categories
                        </div>
                    </Col>
                </Row>
                <Row className="g-0 rounded-bottom-4" xs={5} style={{ backgroundColor: "#6464C6" }}>
                    {
                        products.length > 0 ? (
                            products.slice(0, 5).map((product, index) =>
                                <Col key={index}>
                                    <ProductCard data-wow-iteration="infinite" className="wow animate__bounceInUp" product={product} />
                                </Col>)
                        ) : null
                    }
                </Row>
            </Container>
            <Container fluid className="fluid-section my-5">
                <Row>
                    <Col xs={4} ref={carRef} className="position-relative ps-0" style={{ height: 250 }}>
                        <img id="car" className={`${isVisible ? "scrolled " : ""}position-absolute object-fit-cover`} src="/animation_elements/car.png" alt="car" />
                    </Col>
                    <Col xs={8} className="align-self-center">
                        <h1 className="text-white" style={{ fontFamily: "Century Gothic", fontSize: 75 }}>Explore available vehicles</h1>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row xs={4}>
                    {
                        cars.length > 0 && motorcycles.length > 0 ? (
                            [...cars, ...motorcycles].map((product, index) =>
                                <Col key={index}>
                                    <ProductCard data-wow-iteration="infinite" className="wow animate__bounceInUp" product={product} />
                                </Col>)
                        ) : null
                    }
                </Row>
            </Container>
            <Container className="fluid-section my-4" fluid>
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
            <Container>
                <Row xs={4}>
                    {
                        cars.length > 0 && motorcycles.length > 0 ? (
                            [...cars, ...motorcycles].map((product, index) =>
                                <Col key={index}>
                                    <ProductCard data-wow-iteration="infinite" className="wow animate__bounceInUp" product={product} />
                                </Col>)
                        ) : null
                    }
                </Row>
            </Container>
        </>
    )
}

export default Home;
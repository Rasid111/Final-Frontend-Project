import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { LangContext } from "../contexts/LangContext";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { ColorModeContext } from "../contexts/ColorModeContex";
import supabase from "../../utils/supabase";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../tools/slices/cartSlice";
import Swal from "sweetalert2";
import { RiPolaroidLine } from "react-icons/ri";
import { GiConsoleController } from "react-icons/gi";

function ProductPage() {
    const auth = useSelector(state => state.auth.id);

    const lang = useContext(LangContext)[0];
    const currencyContext = useContext(CurrencyContext);

    const currency = currencyContext.currency;
    const currencyRate = currencyContext.rate;
    const colorMode = useContext(ColorModeContext)[0];

    const params = useParams();
    const [productInfo, setProductInfo] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        async function getProduct(id) {
            const { data, error } = await supabase
                .from("Products")
                .select("*")
                .eq("id", id)
                .single()
            setProductInfo({
                ...data,
                reviews: JSON.parse(data.reviews)
            });
            if (error) {
                console.log(error);
            }
        }
        getProduct(params.id)
    }, [params]);

    const [profile, setProfile] = useState();
    useEffect(() => {
        async function getProfile(id) {
            const { data, error } = await supabase
                .from("Users")
                .select("*")
                .eq("id", id)
                .single();
            if (error)
                console.log(error);
            else
                setProfile(data);
        }
        getProfile(auth);
    }, [auth]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col sm={3}>
                    <img className="w-100 h-100 object-fit-contain" src={productInfo.thumbnail} alt="thumbnail" />
                </Col>
                <Col sm={5} className="align-self-center">
                    <h1>{productInfo.title}</h1>
                    {productInfo.brand ? <h3>{productInfo.brand}</h3> : <></>}
                    <p>
                        {currency === "usd" ?
                            `${productInfo.price} USD` :
                            `${Math.round(productInfo.price / currencyRate * 100) / 100} AZN`
                        }
                    </p>
                    <Container className="p-0 mb-2">
                        <Row className="justify-content-start g-2">
                            <Col xs={12} lg={6}>
                                <Button variant="warning" onClick={async () => {
                                    if (auth !== null) {
                                        const { data, error } = await supabase
                                            .from("Users")
                                            .select("*")
                                            .eq("id", auth)
                                            .single();
                                        const existingProduct = data.cart.find(p => p.id === productInfo.id);
                                        if (existingProduct) {
                                            existingProduct.quantity += 1;
                                        } else {
                                            data.cart.push({ id: productInfo.id, quantity: 1 });
                                            console.log(data);

                                        }
                                        await supabase
                                            .from("Users")
                                            .update({ cart: data.cart })
                                            .eq("id", auth);
                                        Swal.fire({
                                            title: "Producted added to Your cart",
                                            icon: "success"
                                        })
                                    } else {
                                        Swal.fire({
                                            title: "Producted added to Your local cart",
                                            icon: "success"
                                        })
                                    }
                                    dispatch(addToCart({ id: productInfo.id }))
                                }} className="w-100 w-xl-100">{lang === "en" ? "Add to cart" : "Səbətə at"}</Button>
                            </Col>
                            <Col xs={12} lg={6} hidden={auth === null}>
                                <Button
                                    variant=""
                                    hidden={profile && profile.wishlist.includes(productInfo.id)}
                                    className="w-100 add-to-wishlist-btn"
                                    onClick={async () => {
                                        setProfile({
                                            ...profile,
                                            wishlist: [...profile.wishlist, productInfo.id]
                                        })
                                        await supabase
                                            .from("Users")
                                            .update({ wishlist: [...profile.wishlist, productInfo.id] })
                                            .eq("id", auth);
                                    }}
                                >
                                    {lang === "en" ? "Add to wishlist" : "İstək siyahısına at"}
                                </Button>
                                <Button
                                    variant=""
                                    onMouseLeave={(ev) => {
                                        ev.target.style.backgroundColor = "#2C387E";
                                        ev.target.innerHTML = lang === "en" ? "Wishlisted" : "İstək siyahısıdadır";
                                    }}
                                    onMouseEnter={(ev) => {
                                        ev.target.style.backgroundColor = "rgb(211, 1, 1)";
                                        ev.target.innerHTML = lang === "en" ? "Remove" : "Sil";
                                    }}
                                    hidden={profile && !profile.wishlist.includes(productInfo.id)}
                                    className="w-100 add-to-wishlist-btn"
                                    onClick={async () => {
                                        setProfile({
                                            ...profile,
                                            wishlist: profile.wishlist.filter(id => id !== productInfo.id)
                                        })
                                        await supabase
                                            .from("Users")
                                            .update({ wishlist: profile.wishlist.filter(id => id !== productInfo.id) })
                                            .eq("id", auth);
                                    }}
                                >
                                    Wishlisted
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col sm={8}>
                    <p>{productInfo.description}</p>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col sm={8}>
                    <p>{productInfo.rating} / 5</p>
                    <Container fluid className="p-0">
                        <Row sm={1} className="g-3">
                            {productInfo.reviews === undefined ? (<></>) : productInfo.reviews.map((review, index) => {
                                return (
                                    <Col className="border rounded p-2" key={index}>
                                        <p className="m-0">{review.reviewerName}</p>
                                        <p className="m-0">{review.rating} / 5</p>
                                        <p className="m-0">{review.comment}</p>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductPage;
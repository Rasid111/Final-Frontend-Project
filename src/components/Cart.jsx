import { useContext, useEffect, useState } from "react";
import { LangContext } from "../contexts/LangContext";
import { ColorModeContext } from "../contexts/ColorModeContex";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CurrencyContext } from "../contexts/CurrencyContext";
import supabase from "../../utils/supabase";
import { decrementProduuctQuantity, incrementProduuctQuantity, removeFromCart, updateQuantity } from "../tools/slices/cartSlice";
// import { changeProductQuantity, decrementProductQuantity, incrementProductQuantity, removeProduct } from "../tools/actions/accountAction";

function Cart() {

    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();

    const lang = useContext(LangContext)[0];
    const colorMode = useContext(ColorModeContext)[0];
    const {
        currency,
        rate,
    } = useContext(CurrencyContext);

    const auth = useSelector(state => state.auth.id);
    const cart = useSelector(state => state.cart);
    useEffect(() => {
        async function getProducts(cart) {
            const productsData = await Promise.all(
                cart.map(async (product) => {
                    const { data } = await supabase
                        .from("Products")
                        .select("*")
                        .eq("id", product.id)
                        .single();

                    return {
                        ...data,
                        quantity: product.quantity,
                    };
                })
            );
            setProducts(productsData);
        }
        getProducts(cart);
    }, [cart]);

    useEffect(() => {
        async function updateSupabase() {
            const { error } = await supabase
                .from("Users")
                .update({ cart: cart })
                .eq("id", auth);
        }
        if (auth !== null) {
            updateSupabase();
        }
    }, [cart]);

    if (products.length === 0)
        return (
            <Container>
                <Row className="mt-5 text-center">
                    <Col>
                        <h1>{lang === "en" ? "You cart is empty" : "Səbətiniz boşdur"}</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center text-center mt-5">
                    <Col xs={3}>
                        <Button variant={colorMode === "dark" ? "light" : "dark"} className="w-100" as={Link} to="/products"><p className="h4 m-1">{lang === "en" ? "Go For Purchases" : "Satınalmalar üçün gedin"}</p></Button>
                    </Col>
                </Row>
            </Container>
        );
    else
        return (
            <Container>
                {
                    products.map(product => {
                        return (
                            <Row key={product.id} className="justify-content-center">
                                <Col xs={3}>
                                    <img className="w-100 h-100 object-fit-contain" src={product.thumbnail} alt="thumbnail" />
                                </Col>
                                <Col className="mt-5">
                                    <h3>{product.title}</h3>
                                    <h4>{product.brand}</h4>
                                    <p>{product.description}</p>
                                    <p>
                                        {currency === "usd" ?
                                            `${product.price} USD` :
                                            `${Math.round(product.price / rate * 100) / 100} AZN`
                                        }
                                    </p>
                                </Col>
                                <Col className="align-self-center">
                                    <Container fluid>
                                        <Row className="justify-content-center text-center">
                                            <Col xs={2}>
                                                <Button onClick={async () => {
                                                    dispatch(decrementProduuctQuantity(product.id));
                                                }} variant="danger" className="w-100">-</Button>
                                            </Col>
                                            <Col xs={3}>
                                                <Form.Control type="number" onChange={(ev) => {
                                                    setProducts(products.map((p) => {
                                                        if (p.id === product.id) {
                                                            return { ...p, quantity: ev.target.value };
                                                        }
                                                    }))
                                                }} onBlur={(ev) => dispatch(updateQuantity({ id: product.id, quantity: ev.target.value }))} value={product.quantity} className="w-100"></Form.Control>
                                            </Col>
                                            <Col xs={2}>
                                                <Button onClick={async () => {
                                                    dispatch(incrementProduuctQuantity(product.id));
                                                }} variant="success" className="w-100">+</Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center mt-4">
                                                <p>{lang === "en" ? "Total" : "Cəmi"} {currency === "usd" ? `${Math.round(product.price * product.quantity * 100) / 100} USD` : `${product.quantity * Math.round(product.price / rate * 100) / 100} AZN`}</p>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col xs={1} className="align-self-center">
                                    <Button variant="danger" onClick={() => dispatch(removeFromCart(product.id))}>{lang === "en" ? "Remove" : "Sil"}</Button>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Container>
        )
}

export default Cart;
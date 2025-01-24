import { useContext, useEffect, useState } from "react";
import { LangContext } from "../contexts/LangContext";
import { ColorModeContext } from "../contexts/ColorModeContex";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { changeProductQuantity, decrementProductQuantity, incrementProductQuantity, removeProduct } from "../tools/actions/accountAction";

function Cart() {

    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();

    const lang = useContext(LangContext)[0];
    const colorMode = useContext(ColorModeContext)[0];
    const {
        currency,
        rate,
    } = useContext(CurrencyContext);

    const cart = useSelector(state => state.accounts.find(account => account.email === state.auth).cart);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await Promise.all(
                cart.map((product) => 
                    axios.get(`https://dummyjson.com/products/${product.id}`)
                        .then(response => ({ ...response.data, quantity: product.quantity }))
                )
            );
            setProducts(fetchedProducts);
        };
    
        fetchProducts();
    }, [cart])

    if (cart.length === 0)
        return (
            <Container>
                <Row className="mt-5 text-center">
                    <Col>
                        <h1>You cart is empty</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center text-center mt-5">
                    <Col xs={3}>
                        <Button variant={colorMode === "dark" ? "light" : "dark"} className="w-100" as={Link} to="/products"><p className="h4 m-1">Go For Purchases</p></Button>
                    </Col>
                </Row>
            </Container>
        );
    else
        return (
            <Container>
                {
                    products.map(product => (
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
                                            <Button onClick={() => dispatch(decrementProductQuantity(product.id))} variant="danger" className="w-100">-1</Button>
                                        </Col>
                                        <Col xs={2}>
                                            <Form.Control onInput={(ev) => dispatch(changeProductQuantity({ id: product.id, quantity: ev.target.value }))} value={product.quantity} className="w-100"></Form.Control>
                                        </Col>
                                        <Col xs={2}>
                                            <Button onClick={() => dispatch(incrementProductQuantity(product.id))} variant="success" className="w-100">+1</Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-center mt-4">
                                            <p>Total: {currency === "usd" ? `${product.price * product.quantity} USD` : `${product.quantity * Math.round(product.price / rate * 100) / 100} AZN`}</p>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                            <Col xs={1} className="align-self-center">
                                <Button variant="danger" onClick={() => dispatch(removeProduct(product.id))}>Remove</Button>
                            </Col>
                        </Row>
                    ))
                }
            </Container>
        )
}

export default Cart;
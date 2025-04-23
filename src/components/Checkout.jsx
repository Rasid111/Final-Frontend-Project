import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../utils/supabase";
import { Link, useNavigate } from "react-router-dom";
import { LangContext } from "../contexts/LangContext";
import { ColorModeContext } from "../contexts/ColorModeContex";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { clearCart } from "../tools/slices/cartSlice";
import Swal from "sweetalert2";

function Checkout() {
    const lang = useContext(LangContext)[0];
    const colorMode = useContext(ColorModeContext)[0];
    const {
        currency,
        rate,
    } = useContext(CurrencyContext);

    const auth = useSelector(state => state.auth.id);
    const navigate = useNavigate();
    if (auth === null) {
        navigate("/login");
    }

    const cart = useSelector(state => state.cart);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function getProducts(cart) {
            const { data, error } = await supabase
                .from("Products")
                .select("*")
                .in("id", cart.map(p => p.id));
            if (error) {
                console.log(error);
            }
            setProducts(data.map((p, i) => ({ ...p, quantity: cart[i].quantity })));
        }
        getProducts(cart);
    }, [cart]);
    const [total, setTotal] = useState();
    useEffect(() => {
        let sum = 0;
        products.forEach(p => {
            sum += p.quantity * p.price;
        });
        sum = Math.round(sum * 100) / 100;
        setTotal(sum);
    }, [products]);
    const discount = useRef("");
    const dispatch = useDispatch();
    if (total === 0) {
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
    }
    return (
        <Container className="backgrounded p-3">
            <Row className="px-2">
                <Col xs={12} lg={2} style={{ height: 50, fontFamily: "Arial Rounded MT Bold", color: colorMode === "light" ? "#6c6cd9" : "black" }} className="d-flex align-items-center justify-content-center white-backgrounded">
                    {lang === "en" ?
                        `Total: ${currency === "usd" ?
                            `${total} USD` :
                            `${Math.round(total / rate * 100) / 100} AZN`
                        }` :
                        `Cəmi: ${currency === "usd" ?
                            `${total} USD` :
                            `${Math.round(total / rate * 100) / 100} AZN`
                        }`}
                </Col>
            </Row>
            <Row>
                <Col className="px-2">
                    <Form onSubmit={async (ev) => {
                        ev.preventDefault();
                        dispatch(clearCart());
                        await supabase
                            .from("Users")
                            .update({ cart: [] })
                            .eq("id", auth);
                        Swal.fire({
                            title: lang === "en" ? "Products have been ordered" : "Məhsullar sifariş olunub",
                            icon: "success",
                        });
                        navigate("/");
                    }}>
                        <Form.Group className="text-center">
                            <Form.Label className="my-1" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                {lang === "en" ? "card number" : "kart nömrəsi"}.
                            </Form.Label>
                            <Form.Control name="cardNumber" required className="rounded-5 py-3" type="text" />
                        </Form.Group>
                        <Form.Group className="text-center">
                            <Form.Label className="my-1" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                {lang === "en" ? "adress" : "ünvan"}.
                            </Form.Label>
                            <Form.Control name="adress" required className="rounded-5 py-3" type="text" />
                        </Form.Group>
                        <Form.Group className="text-center">
                            <Form.Label className="my-1" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                {lang === "en" ? "discount code" : "endirim kodu"}.
                            </Form.Label>
                            <Form.Control ref={discount} name="discountCode" className="rounded-5 py-3" type="text" />
                        </Form.Group>
                        <Button type="button" className="mt-4 w-100 ms-2" variant="warning" style={{ borderRadius: 255, fontFamily: "Arial Rounded MT Bold", fontSize: 25 }}
                            onClick={async () => {
                                const { data, error } = await supabase
                                    .from("DiscountCodes")
                                    .select("*")
                                    .eq("id", discount.current.value)
                                    .single();
                                if (error)
                                    console.log(error);
                                if (data) {
                                    Swal.fire({
                                        title: lang === "en" ? "You discount code is valid" : "Endirim kodunuz etibarlıdır",
                                        text: lang === "en" ?
                                            `Your discount is ${data.value}% with total sum ${currency === "usd" ?
                                                `${total} USD` :
                                                `${Math.round(total / rate * 100 * (1 - data.value)) / 100} AZN`
                                            }` :
                                            `Endiriminiz ${data.value}% ümumi məbləğ ${currency === "usd" ?
                                                `${Math.round(total * (1 - data.value / 100) * 100) / 100} USD` :
                                                `${Math.round(total * (100 - data.value) / rate * 100) / 100} AZN`
                                            }`,
                                        icon: "success",
                                        customClass: {
                                            popup: 'swal2-dark',
                                        }
                                    });
                                } else {
                                    Swal.fire({
                                        title: lang === "en" ? "You discount code is invalid" : "Endirim kodunuz yanlışdır",
                                        icon: "error",
                                        customClass: {
                                            popup: 'swal2-dark',
                                        }
                                    });
                                }
                            }}
                        >
                            {lang === "en" ? "check discount code" : "endirim kodunu yoxlayın"}
                        </Button>
                        <Button type="submit" className="mt-4 w-100" variant="" style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: colorMode === "light" ? "#6c6cd9" : "black", fontSize: 25 }}>
                            {lang === "en" ? "order" : "sifariş"}.
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Checkout;
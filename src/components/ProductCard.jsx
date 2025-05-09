import { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ColorModeContext } from "../contexts/ColorModeContex";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { LangContext } from "../contexts/LangContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../tools/slices/cartSlice";
import supabase from "../../utils/supabase";
import Swal from "sweetalert2";

function ProductCard({ className, product, thumbHeight = 300 }) {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth.id);

    const lang = useContext(LangContext)[0];
    const colorMode = useContext(ColorModeContext)[0];
    const {
        currency,
        rate,
    } = useContext(CurrencyContext);

    return (
        <div className={"product-card d-flex flex-column m-3 p-2 rounded-4" + ` ${className}`} style={{ backgroundColor: colorMode === "light" ? "white" : "#232358" }} >
            <img className="rounded-3" src={product.thumbnail} alt="thumbnail" style={{ backgroundColor: "rgb(234, 234, 234)" }} />
            <div className="d-flex flex-wrap text-center flex-row justify-items-center">
                <Container fluid className="my-2 px-0">
                    <Row className="align-items-center justify-content-between h-100 g-1">
                        <Col xs={7}>
                            <div className="py-2 rounded-3 h-100 text-center" style={{ backgroundColor: colorMode === "light" ? "rgb(234, 234, 234)" : "#5e5e86" }}>
                                <span className="text-truncate">
                                    {currency === "usd" ?
                                        `${product.price} USD` :
                                        `${Math.round(product.price / rate * 100) / 100} AZN`
                                    }
                                </span>
                            </div>
                        </Col>
                        <Col xs={5}>
                            <div className="py-2 rounded-3 h-100 text-center d-flex align-items-center justify-content-center" style={{ backgroundColor: colorMode === "light" ? "rgb(234, 234, 234)" : "#5e5e86" }}>
                                <img src="./icons/star.png" alt="star" className="object-fit-contain" style={{ width: 18 }} />
                                <span>{`${product.rating} / 5`}</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="d-flex justify-content-center mb-2 align-items-center w-100" style={{ height: 40 }}>
                    <span className="d-block align-middle lh-sm">{product.title}</span>
                </div>
                <Container fluid className="p-0">
                    <Row className="justify-content-start g-1">
                        <Col xs={8}><Button onClick={async () => {
                            if (auth !== null) {
                                const { data, error } = await supabase
                                    .from("Users")
                                    .select("*")
                                    .eq("id", auth)
                                    .single();
                                const existingProduct = data.cart.find(p => p.id === product.id);

                                if (existingProduct) {
                                    existingProduct.quantity += 1;
                                } else {
                                    data.cart.push({ id: product.id, quantity: 1 });
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
                            dispatch(addToCart({ id: product.id }))
                        }} className="w-100 add-to-cart" variant="warning">{lang === "en" ? "Add to cart" : "Səbətə at"}</Button></Col>
                        <Col xs={4}><Button as={Link} to={`/product/${product.id}`} className="w-100 more">{lang === "en" ? "More" : "Ətraflı"}</Button></Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default ProductCard;
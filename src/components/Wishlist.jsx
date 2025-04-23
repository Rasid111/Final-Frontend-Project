import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";
import { LangContext } from "../contexts/LangContext";
import { ColorModeContext } from "../contexts/ColorModeContex";
import { CurrencyContext } from "../contexts/CurrencyContext";
import Swal from "sweetalert2";
import { addToCart } from "../tools/slices/cartSlice";

function Wishlist() {
    const auth = useSelector(state => state.auth.id);
    const navigate = useNavigate();
    if (!auth)
        navigate("/login");

    const dispatch = useDispatch();

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

    const lang = useContext(LangContext)[0];
    const colorMode = useContext(ColorModeContext)[0];
    const {
        currency,
        rate,
    } = useContext(CurrencyContext);

    const [products, setProducts] = useState();
    useEffect(() => {
        async function getProducts(ids) {
            const { data, error } = await supabase.
                from("Products")
                .select("*")
                .in("id", ids)
            if (error)
                console.log(error);
            setProducts(data);
        }
        if (profile) {
            getProducts(profile.wishlist);
        }
    }, [profile]);
    if (!products || products.length === 0)
        return (
            <Container>
                <Row className="mt-5 text-center">
                    <Col>
                        <h1>{lang === "en" ? "Your wishlist is empty" : "İstəkləriniz boşdur"}</h1>
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
            <>
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
                                        <Container className="p-0">
                                            <Row className="justify-contnet-start g-2">
                                                <Col xs={12} lg={4}>
                                                    <Button className="w-100" variant="warning" onClick={async () => {
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
                                                    }}>{lang === "en" ? "Add to cart" : "Səbətə at"}</Button>
                                                </Col>
                                                <Col xs={12} lg={4}>
                                                    <Button className="w-100" variant="danger"
                                                        onClick={async () => {
                                                            setProfile({
                                                                ...profile,
                                                                wishlist: profile.wishlist.filter(id => id !== product.id)
                                                            })
                                                            await supabase
                                                                .from("Users")
                                                                .update({ wishlist: profile.wishlist.filter(id => id !== product.id) })
                                                                .eq("id", auth);
                                                        }}>{lang === "en" ? "Remove from wishlist" : "Sil"}</Button>
                                                </Col>
                                                <Col xs={12} lg={4}>
                                                    <Button as={Link} to={`/product/${product.id}`} className="w-100 more">{lang === "en" ? "More" : "Ətraflı"}</Button>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Container>
            </>
        )
}

export default Wishlist;
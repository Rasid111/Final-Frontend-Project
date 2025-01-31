import { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ColorModeContext } from "../contexts/ColorModeContex";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { LangContext } from "../contexts/LangContext";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../tools/actions/accountAction";

function ProductCard({ className, product, cardHeight = 300 }) {

    const dispatch = useDispatch();

    const lang = useContext(LangContext)[0];
    const colorMode = useContext(ColorModeContext)[0];
    const {
        currency,
        rate,
    } = useContext(CurrencyContext);

    return (
        <div className="d-flex flex-column m-3 p-2 rounded-3" style={{ backgroundColor: "white" }}>
            <img className="rounded-3" src={product.thumbnail} alt="thumbnail" style={{ backgroundColor: "rgb(234, 234, 234)" }} />
            <div className="d-flex flex-wrap text-center flex-row justify-items-center">
                <Container fluid className="my-2">
                    <Row className="align-items-center justify-content-between h-100">
                        <Col className="px-0 rounded-3 h-100 text-center" style={{ backgroundColor: "rgb(234, 234, 234)" }} xs={6}>
                            <span>
                                {currency === "usd" ?
                                    `${product.price} USD` :
                                    `${Math.round(product.price / rate * 100) / 100} AZN`
                                }</span>
                        </Col>
                        <Col className="px-0 rounded-3 h-100 text-center d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgb(234, 234, 234)" }} xs={5}>
                            <img src="./icons/star.png" alt="star" className="object-fit-contain" style={{ width: 18 }} />
                            <span>{`${product.rating} / 5`}</span>
                        </Col>
                    </Row>
                </Container>
                <div className="d-flex justify-content-center mb-2 aling-items-center w-100" style={{ height: 40 }}>
                    <span className="d-block align-middle lh-sm">{product.title}</span>
                </div>
                <Container fluid className="p-0">
                    <Row className="justify-content-start g-1">
                        <Col xs={8}><Button onClick={() => dispatch(addToCart({ id: product.id }))} className="w-100 add-to-cart" variant="warning">{lang === "en" ? "Add to cart" : "Səbətə əlavə et"}</Button></Col>
                        <Col xs={4}><Button as={Link} to={`/product/${product.id}`} className="w-100 more">{lang === "en" ? "More" : "Ətraflı"}</Button></Col>
                    </Row>
                </Container>
            </div>
        </div>


        // <Card className={className} style={{ height: cardHeight }}>
        //     <Card.Img variant="top" className="object-fit-contain" style={{height: 150}} src={product.thumbnail} />
        //     <Card.Body>
        //         <Card.Title>{product.title}</Card.Title>
        //         <Card.Text>
        //             {currency === "usd" ?
        //                 `${product.price} USD` :
        //                 `${Math.round(product.price / rate * 100) / 100} AZN`
        //             }
        //         </Card.Text>
        //         <Container fluid className="p-0">
        //             <Row className="justify-content-start g-1">
        //                 <Col xs={8}><Button onClick={() => dispatch(addToCart({ id: product.id }))} className="w-100" variant="warning">{lang === "en" ? "Add to cart" : "Səbətə əlavə et"}</Button></Col>
        //                 <Col xs={4}><Button as={Link} to={`/product/${product.id}`} className="w-100" variant={colorMode === "dark" ? "light" : "dark"}>{lang === "en" ? "More" : "Ətraflı"}</Button></Col>
        //             </Row>
        //         </Container>
        //     </Card.Body>
        // </Card>
    )
}

export default ProductCard;
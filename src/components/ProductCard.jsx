import { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ColorModeContext } from "../contexts/ColorModeContex";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { LangContext } from "../contexts/LangContext";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../tools/actions/accountAction";

function ProductCard({ className, product, cardHeight = 600 }) {

    const dispatch = useDispatch();

    const lang = useContext(LangContext)[0];
    const colorMode = useContext(ColorModeContext)[0];
    const {
        currency,
        rate,
    } = useContext(CurrencyContext);

    return (
        <Card className={className} style={{ height: cardHeight }}>
            <Card.Img variant="top" className="h-75 object-fit-contain" src={product.thumbnail} />
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                    {currency === "usd" ?
                        `${product.price} USD` :
                        `${Math.round(product.price / rate * 100) / 100} AZN`
                    }
                </Card.Text>
                <Container fluid className="p-0">
                    <Row className="justify-content-start g-1">
                        <Col xs={8}><Button onClick={() => dispatch(addToCart({ id: product.id }))} className="w-100" variant="warning">{lang === "en" ? "Add to cart" : "Səbətə əlavə et"}</Button></Col>
                        <Col xs={4}><Button as={Link} to={`/product/${product.id}`} className="w-100" variant={colorMode === "dark" ? "light" : "dark"}>{lang === "en" ? "More" : "Ətraflı"}</Button></Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;
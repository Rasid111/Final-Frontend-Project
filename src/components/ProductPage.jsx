import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { LangContext } from "../contexts/LangContext";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { ColorModeContext } from "../contexts/ColorModeContex";

function ProductPage() {

    const lang = useContext(LangContext)[0];
    const currencyContext = useContext(CurrencyContext);

    const currency = currencyContext.currency;
    const currencyRate = currencyContext.rate;
    const colorMode = useContext(ColorModeContext)[0];

    const params = useParams();
    const [productInfo, setProductInfo] = useState({});

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${params.id}`)
            .then(function (response) {
                setProductInfo(response.data);
            })
    }, []);
    console.log(productInfo)
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
                    <Button variant="warning" className="w-50 mt-3">Add to cart</Button>
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
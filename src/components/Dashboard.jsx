import React, { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const isAdmin = useSelector(state => {
        return state.accounts.some(account => {
            return account.email === state.auth && account.isAdmin
        });
    })
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAdmin)
            navigate("/");
    })

    const [products, setProducts] = useState([]);
    const [update, setUpdate] = useState(-1);
    const [updated, setUpdated] = useState(true);

    const updateProduct = async (product) => {
        console.log(product);
        const { error } = await supabase
            .from('Products')
            .update({
                img: product.img,
                title: product.title,
                price: product.price,
                description: product.description,
            })
            .eq('id', product.id)
            console.log(error);
        setUpdated(true);
    }

    const removeProduct = async (id) => {
        await supabase
            .from('Products')
            .delete()
            .eq('id', id);
        setProducts(products.filter(p => p.id != id));
    }

    useEffect(() => {
        const getProductsFromSupaBase = async () => {
            const { data } = await supabase.from("Products").select();
            setProducts(data);
        }
        getProductsFromSupaBase();
        setUpdated(false);
    }, [updated]);

    return (
        <Container>
            {products.map(p => {
                return (
                    <div key={p.id}>
                        <Row className="backgrounded g-1 mt-2 p-3 justify-content-between align-items-center">
                            <Col xs={1}>
                                <span className="white-backgrounded p-2">{p.id}</span>
                            </Col>
                            <Col xs={1}>
                                <img className="w-100 object-fit-contain" src={p.img} alt="thumbnail" />
                            </Col>
                            <Col xs={3}>
                                <span className="white-backgrounded p-2">{p.title}</span>
                            </Col>
                            <Col className="white-backgrounded p-3" xs={3}>
                                <span>{p.description}</span>
                            </Col>
                            <Col xs={1}>
                                <span className="white-backgrounded p-2">${p.price}</span>
                            </Col>
                            <Col xs={1}>
                                <Button className="w-100 h-100 mt-2" variant="" style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#6c6cd9", fontSize: 20 }} onClick={() => setUpdate(p.id)}>Update</Button>
                            </Col>
                            <Col xs={1}>
                                <Button className="w-100 h-100 mt-2" variant="danger" style={{ borderRadius: 255, fontFamily: "Arial Rounded MT Bold", fontSize: 20 }} onClick={() => removeProduct(p.id)}>Remove</Button>
                            </Col>
                        </Row>
                        <Row className={`justify-content-center text-center ${update !== p.id ? "d-none" : "d-flex"}`}>
                            <Col xs={{ span: 4, offset: 6 }}>
                                <Form onSubmit={(ev) => {
                                    ev.preventDefault();
                                    updateProduct({ ...Object.fromEntries(new FormData(ev.target).entries()), id: p.id });
                                    setUpdated(true);
                                    setUpdate(-1);
                                }}>
                                    <Form.Control name="title" className="mt-3" placeholder="title"></Form.Control>
                                    <Form.Control name="img" className="mt-1" placeholder="imgUrl"></Form.Control>
                                    <Form.Control name="description" className="mt-1" placeholder="description"></Form.Control>
                                    <Form.Control name="price" className="mt-1" placeholder="price(usd)"></Form.Control>
                                    <Button className="mt-2" type="submit" variant="" style={{ backgroundColor: "#6c6cd9", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 20 }}>Save</Button>
                                    <Button className="ms-2 mt-2" type="button" variant="" style={{ backgroundColor: "#6c6cd9", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 20 }} onClick={() => setUpdate(-1)}>Cancel</Button>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </Container>
    );
};

export default Dashboard;
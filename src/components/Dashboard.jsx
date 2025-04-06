import React, { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiCategory } from "react-icons/bi";

const Dashboard = () => {

    const navigate = useNavigate();
    const auth = useSelector(state => state.auth.id);

    useEffect(() => {
        if (auth === null) {
            navigate("/login");
        }
    }, [auth]);

    const [profile, setProfile] = useState({});
    
    useEffect(() => {
        async function getUserById(userId) {
            const { data } = await supabase
                .from('Users')
                .select('*')
                .eq('id', userId)
                .single()
            setProfile(data);
        }
        getUserById(auth);
    }, [auth]);
    
    useEffect(() => {
        if (!profile && !profile.is_admin) {
            navigate("/");
        }
    }, [profile]);

    const [products, setProducts] = useState([]);
    const [update, setUpdate] = useState(-1);
    const [updated, setUpdated] = useState(true);

    const updateProduct = async (product) => {
        const { error } = await supabase
            .from('Products')
            .update({
                thumbnail: product.img,
                title: product.title,
                brand: product.brand,
                category: product.category,
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
            const { data } = await supabase
                .from("Products")
                .select()
                .order('id', { ascending: true })
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
                        <Row className="backgrounded g-1 my-2 p-3 justify-content-between align-items-center">
                            <Col xs={1}>
                                <span className="white-backgrounded p-2">{p.id}</span>
                            </Col>
                            <Col xs={1}>
                                <img className="w-100 object-fit-contain" src={p.thumbnail} alt="thumbnail" />
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
                            <Col xs={{ span: 5, offset: 6 }}>
                                <Form onSubmit={(ev) => {
                                    ev.preventDefault();
                                    updateProduct({ ...Object.fromEntries(new FormData(ev.target).entries()), id: p.id });
                                    setUpdated(true);
                                    setUpdate(-1);
                                }}>
                                    <Form.Label htmlFor="title" className="d-inline-block w-25 text-start">Title</Form.Label>
                                    <Form.Control name="title" defaultValue={p.title} className="d-inline-block w-75" placeholder="title"></Form.Control>
                                    <Form.Label htmlFor="brand" className="d-inline-block w-25 text-start">Brand</Form.Label>
                                    <Form.Control name="brand" defaultValue={p.brand} className="mt-1 d-inline-block w-75" placeholder="brand"></Form.Control>
                                    <Form.Label htmlFor="category" className="d-inline-block w-25 text-start">Category</Form.Label>
                                    <Form.Control name="category" defaultValue={p.category} className="mt-1 d-inline-block w-75" placeholder="category"></Form.Control>
                                    <Form.Label htmlFor="thumbnail" className="d-inline-block w-25 text-start">Thumbnail URL</Form.Label>
                                    <Form.Control name="thumbnail" defaultValue={p.thumbnail} className="mt-1 d-inline-block w-75" placeholder="thumbnail url"></Form.Control>
                                    <Form.Label htmlFor="description" className="d-inline-block w-25 text-start">Desctiption</Form.Label>
                                    <Form.Control name="description" defaultValue={p.description} className="mt-1 d-inline-block w-75" placeholder="description"></Form.Control>
                                    <Form.Label htmlFor="price" className="d-inline-block w-25 text-start">Price (USD)</Form.Label>
                                    <Form.Control name="price" defaultValue={p.price} className="mt-1 d-inline-block w-75" placeholder="price(usd)"></Form.Control>
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
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ColorModeContext } from '../contexts/ColorModeContex';
import { LangContext } from '../contexts/LangContext';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useNavigate, useParams } from 'react-router-dom';

function Products() {
    const navigate = useNavigate();
    const params = useParams();

    const [products, setProducts] = useState({ products: [], total: 0 });

    const [state, setState] = useState({
        page: 1,
        limit: 8,
        category: "",
        searchInput: "",
        sort: "",
        order: "",
    });
    
    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            searchInput: params.searchInput === undefined ? "" : params.searchInput,
            page: 0,
        }));
    }, [params]);

    const [categories, setCategories] = useState([]);

    const lang = useContext(LangContext)[0];
    const colorMode = useContext(ColorModeContext)[0];

    useEffect(() => {
        const url = 'https://dummyjson.com/products/categories';
        axios.get(url)
            .then(function (response) {
                setCategories(response.data);
            })
    }, []);

    useEffect(() => {
        const url = `https://dummyjson.com/products${state.category === "" ? "" : `/category/${state.category}`}${state.searchInput === "" ? "" : `/search`}?q=${state.searchInput}&limit=${state.limit}&skip=${(state.page - 1) * state.limit}&select=id,title,price,thumbnail&sortBy=${state.sort}&order=${state.order}`
        axios.get(url)
            .then(function (response) {
                setProducts({ products: response.data.products, total: response.data.total });
            })
    }, [state]);

    return (
        <>
            <Form className='mt-5'>
                <Container>
                    <Row>
                        <Col>
                            <Form.Control type="text" value={state.searchInput} placeholder={lang === "en" ? "Search" : "Axtar"} onInput={(ev) => {
                                setState(prevState => ({
                                    ...prevState,
                                    searchInput: ev.target.value,
                                    page: 0,
                                    category: ""
                                }));
                            }} />
                        </Col>
                        <Col>
                            <Form.Select value={state.category} onChange={(ev) => {
                                setState(prevState => ({
                                    ...prevState,
                                    searchInput: "",
                                    page: 0,
                                    category: ev.target.value
                                }));
                                navigate("/products");
                            }}>
                                <option value="">{lang === "en" ? "All categories" : "Bütün kateqoriyalar"}</option>
                                {categories.map((c, index) =>
                                    <option key={index} value={c.slug}>{c.name}</option>)}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select defaultValue={state.sort} onChange={(ev) => {
                                setState(prevState => ({
                                    ...prevState,
                                    sort: ev.target.value.split(";")[0],
                                    order: ev.target.value.split(";")[1]
                                }))
                            }}>
                                <option value="">{lang === "en" ? "Unsorted" : "Çeşidlənməmiş"}</option>
                                <option value="price;desc">{lang === "en" ? "By Price (from highest)" : "Qiymətə görə (ən yüksəkdən)"}</option>
                                <option value="price;asc">{lang === "en" ? "By Price (from lowest)" : "Qiymətə görə (ən aşağıdan)"}</option>
                                <option value="title;asc">{lang === "en" ? "By Name (from A to Z)" : "Ada görə (A-dan Z-yə)"}</option>
                                <option value="title;desc">{lang === "en" ? "By Name (from Z to A)" : "Ada görə (Z-dən A-ya)"}</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select onChange={(ev) => {
                                setState(prevState => ({
                                    ...prevState,
                                    page: 0,
                                    limit: parseInt(ev.target.value)
                                }))
                            }}>
                                <option value="8">8 {lang === "en" ? "items per page" : "səhifə başına maddələr"}</option>
                                <option value="16">16 {lang === "en" ? "items per page" : "səhifə başına maddələr"}</option>
                                <option value="24">24 {lang === "en" ? "items per page" : "səhifə başına maddələr"}</option>
                                <option value="32">32 {lang === "en" ? "items per page" : "səhifə başına maddələr"}</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <Container>
                <Row xs={4} className='g-4 mt-3'>
                    {products.products.map((product, index) =>
                        <Col key={index}>
                            <ProductCard className="border rounded" product={product} />
                        </Col>)}
                </Row>
                <Row className='justify-content-center my-3'>
                    <Col xs={4}>
                        <Container fluid>
                            <Row xs={6} className='text-center justify-content-start g-2'>
                                {Array.from({ length: Math.ceil(products.total / state.limit) }, (_, index) => (
                                    <Col key={index}>
                                        <Button className={`w-100 ${colorMode === "dark" ? 'btn-light' : "btn-dark"}`} onClick={() => setState(prevState => ({ ...prevState, page: index + 1 }))}>{index + 1}</Button>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Products;
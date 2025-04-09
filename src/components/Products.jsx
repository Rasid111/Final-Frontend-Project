import { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ColorModeContext } from '../contexts/ColorModeContex';
import { LangContext } from '../contexts/LangContext';
import { Form } from 'react-bootstrap';
import axios, { all } from 'axios';
import ProductCard from './ProductCard';
import { useFetcher, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import supabase from '../../utils/supabase';

function Products() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const { data } = await supabase
                .from("Products")
                .select("*");
            setAllProducts(data);
            const categoriesRaw = data.map(p => p.category);
            setCategories(categoriesRaw.filter((value, index, self) => self.indexOf(value) === index));
        }
        getProducts();
    }, []);

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
            searchInput: searchParams.get("q") ?? ""
        }));
    }, [searchParams]);

    const lang = useContext(LangContext)[0];
    const colorMode = useContext(ColorModeContext)[0];

    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        setFilteredProducts(allProducts.filter((p, i) => {
            if (state.category !== "" && p.category !== state.category)
                return false;
            if (state.searchInput !== "" && !(p.title.toLowerCase().includes(state.searchInput) || p.category.toLowerCase().includes(state.searchInput) || p.description.toLowerCase().includes(state.searchInput)))
                return false;
            return true;
        }))
    }, [state, allProducts]);

    const [sortedProducts, setSortedProducts] = useState([]);
    useEffect(() => {
        if (state.sort === "price") {
            setSortedProducts(filteredProducts.sort((a, b) => {
                if (state.order === "asc") {
                    return a[state.sort] - b[state.sort];
                }
                return b[state.sort] - a[state.sort];
            }));
        }
        else if (state.sort === "title") {
            setSortedProducts(filteredProducts.sort((a, b) => {
                if (state.order === "asc") {
                    return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1; 
                }
                return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1; 
            }));
        }
        else {
            setSortedProducts(filteredProducts.sort((a, b) => {
                return a.id - b.id;
            }));
        }
    }, [filteredProducts]);

    const [outputProducts, setOutputProducts] = useState([]);
    useEffect(() => {
        setOutputProducts(filteredProducts.slice((state.page - 1) * state.limit, state.page * state.limit));
    }, [sortedProducts]);
    return (
        <>
            <Form className='mt-5'>
                <Container>
                    <Row xs={1} sm={3} className='g-3'>
                        <Col>
                            <Form.Select value={state.category} onChange={(ev) => {
                                setState(prevState => ({
                                    ...prevState,
                                    page: 1,
                                    category: ev.target.value
                                }));
                            }}>
                                <option value="">{lang === "en" ? "All categories" : "Bütün kateqoriyalar"}</option>
                                {categories.map((c, index) =>
                                    <option key={index} value={c}>{c}</option>)}
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
                                    page: 1,
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
                <Row xs={2} lg={3} xxl={4} className='g-4 mt-3'>
                    {!outputProducts ? "..." : outputProducts.map((product, index) =>
                        <Col key={index}>
                            <ProductCard className="border rounded" product={product} />
                        </Col>)}
                </Row>
                <Row className='justify-content-center my-3'>
                    <Col xs={4}>
                        <Container fluid>
                            <Row xs={3} md={4} lg={6} className='text-center justify-content-center g-2'>
                                <Col className={`d-${Math.ceil(filteredProducts.length / state.limit) === 1 ? "none" : "block"}`}>
                                    <Button disabled={state.page === 1} className={`w-100 ${colorMode === "dark" ? 'btn-light' : "btn-dark"}`} onClick={() => setState(prevState => ({ ...prevState, page: prevState.page - 1 }))}>{"<"}</Button>
                                </Col>
                                {Array.from({ length: Math.ceil(filteredProducts.length / state.limit) }, (_, index) => {
                                    if ((index + 1) === state.page || (Math.ceil(filteredProducts.length / state.limit) - state.page >= 3 && (index + 1) - state.page < 4 && (index + 1) >= state.page) || ((Math.ceil(filteredProducts.length / state.limit) - state.page < 3) && state.page - (index + 1) <= 3 - (Math.ceil(filteredProducts.length / state.limit) - state.page))) {
                                        return (
                                            <Col key={index + 1}>
                                                <Button disabled={state.page === (index + 1)} className={`w-100 ${colorMode === "dark" ? 'btn-light' : "btn-dark"}`} onClick={() => setState(prevState => ({ ...prevState, page: index + 1 }))}>{index + 1}</Button>
                                            </Col>
                                        );
                                    }
                                })}
                                <Col className={`d-${Math.ceil(filteredProducts.length / state.limit) === 1 ? "none" : "block"}`}>
                                    <Button disabled={state.page === Math.ceil(filteredProducts.length / state.limit)} className={`w-100 ${colorMode === "dark" ? 'btn-light' : "btn-dark"}`} onClick={() => setState(prevState => ({ ...prevState, page: prevState.page + 1 }))}>{">"}</Button>
                                </Col>
                            </Row>
                            <Row className='justify-content-center mt-3'>
                                <Col xs={12} md={5}>
                                    <Form.Control type='number' onChange={(ev) => {
                                        let value = Number(ev.target.value);

                                        if (isNaN(value) || value <= 0) value = 1;
                                        if (value > Math.ceil(filteredProducts.length / state.limit))
                                            value = Math.ceil(filteredProducts.length / state.limit);

                                        setState((prevState) => ({ ...prevState, page: value }));
                                    }} value={state.page}></Form.Control>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Products;
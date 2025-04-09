import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";
import { logout } from "../tools/slices/authSlice";
import Swal from "sweetalert2";
import { clearCart } from "../tools/slices/cartSlice";

function Profile() {

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

    const [formData, setFormData] = useState({
        login: null,
        email: null,
        newPassword: null,
        confirmation: null,
        password: null,
    });

    const dispatch = useDispatch();

    const loginInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const confirmationInput = useRef();

    useEffect(() => {
        if (!profile) {
            return;
        }
        if (loginInput.current) {
            loginInput.current.value = profile.login ?? "";
        }
        if (emailInput.current) {
            emailInput.current.value = profile.email ?? "";
        }
    }, [profile]);

    const updateHandle = async (ev) => {
        ev.preventDefault();
        const data = Object.fromEntries((new FormData(ev.target)).entries());
        if ((data.newPassword.length >= 8 && /\d/.test(data.newPassword) && /\D/.test(data.newPassword) && data.newPassword === data.confirmation) || (data.newPassword === "" && data.confirmation == "")) {
            if (data.password === profile.password) {
                const { error } = await supabase
                    .from("Users")
                    .update({
                        login: data.login,
                        email: data.email,
                        password: data.newPassword === "" ? profile.password : data.newPassword
                    })
                    .eq("id", auth);
                if (error && error.code == "23505") {
                    Swal.fire({
                        title: "Update failed",
                        text: "This email is already used",
                        icon: "error",
                        customClass: {
                            popup: 'swal2-dark',
                        }
                    });
                    return;
                }

                Swal.fire({
                    title: "Update succeed",
                    icon: "success",
                    customClass: {
                        popup: 'swal2-dark',
                    }
                });
            } else {
                Swal.fire({
                    title: "Update failed",
                    text: "Incorrect password",
                    icon: "error",
                    customClass: {
                        popup: 'swal2-dark',
                    }
                });
            }
        }
        setFormData(data);
    }

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col xs={{ span: 3, offset: 0 }} sm={{ span: 2, offset: 1 }} lg={{ span: 1, offset: 2 }}>
                        <div className="backgrounded">
                            <Link to="/"><img className="w-100 object-fit-contain" src="/icons/home.png" alt="home" /></Link>
                        </div>
                    </Col>
                    <Col xs={8} lg={6} className="backgrounded text-center d-flex flex-column align-items-center" style={{ borderRadius: 50 }}>
                        <div className="w-75">
                            <Form onSubmit={(ev) => {
                                updateHandle(ev);
                            }}>
                                <Form.Group className="text-center">
                                    <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                        login.
                                    </Form.Label>
                                    <Form.Control name="login" ref={loginInput} className="rounded-5 py-3" type="text" />
                                </Form.Group>

                                <Form.Group className="text-center">
                                    <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                        email.
                                    </Form.Label>
                                    <Form.Control name="email" ref={emailInput} className="rounded-5 py-3" type="email" />
                                </Form.Group>

                                <Form.Group className="text-center">
                                    <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                        new password.
                                    </Form.Label>
                                    <Form.Control name="newPassword" ref={passwordInput} className="rounded-5 py-3" type="password" />
                                    <ul>
                                        <li className={`error-span d-${formData.newPassword === null || formData.newPassword === undefined || formData.newPassword === "" || formData.newPassword.length >= 8 ? "none" : "block"}`}><span>Password length must be 8 symbols or longer</span></li>
                                        <li className={`error-span d-${formData.newPassword === null || formData.newPassword === undefined || formData.newPassword === "" || /\d/.test(formData.newPassword) ? "none" : "block"}`}><span>Password must conatin at least 1 number (0-9)</span></li>
                                        <li className={`error-span d-${formData.newPassword === null || formData.newPassword === undefined || formData.newPassword === "" || /\D/.test(formData.newPassword) ? "none" : "block"}`}><span>Password must conatin at least 1 symbol (A-Z)</span></li>
                                    </ul>
                                </Form.Group>

                                <Form.Group className="text-center">
                                    <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                        new password. (confirmation)
                                    </Form.Label>
                                    <Form.Control name="confirmation" ref={confirmationInput} className="rounded-5 py-3" type="password" />
                                    <ul>
                                        <li className={`error-span d-${formData.confirmation === null || formData.confirmation === formData.newPassword ? "none" : "block"}`}><span>Passwords must match</span></li>
                                    </ul>
                                </Form.Group>

                                <Form.Group className="text-center">
                                    <Form.Label className="my-3" style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                        password.
                                    </Form.Label>
                                    <Form.Control name="password" ref={passwordInput} className="rounded-5 py-3" type="password" />
                                </Form.Group>

                                <Container className="my-5">
                                    <Row className="justify-content-center">
                                        <Col xs={12} lg={6}>
                                            <Button type="submit" className="w-100 h-100" variant="" style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#6c6cd9", fontSize: 40 }}>
                                                save
                                            </Button>
                                        </Col>
                                        <Col xs={12} lg={6} className="mt-2 mt-lg-0">
                                            <Button type="button" onClick={() => {
                                                dispatch(logout());
                                                dispatch(clearCart());
                                                console.log(1)
                                                navigate("/");
                                            }} className="w-100 h-100" variant="" style={{ backgroundColor: "#d30101", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 40 }}>
                                                logout
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>
                        </div>
                    </Col>
                    <Col xs={{ span: 12, offset: 1 }} lg={{ span: 3, offset: 0 }} className="d-flex justify-items-center d-lg-block">
                        <div className="mt-3">
                            <div className="backgrounded text-center p-3" style={{ borderRadius: 50, minHeight: "100%" }}>
                                <Button className="w-100 h-100" variant="" style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#6c6cd9", fontSize: 20 }} as={Link} to="/wishlist">Your wishlist</Button>
                                <Button className="w-100 h-100 mt-2" variant="" style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#6c6cd9", fontSize: 20 }} as={Link} to="/cart">Your cart</Button>
                            </div>
                        </div>
                        <div className="mt-3 ms-2 ms-lg-0" hidden={!profile.is_admin} xs={{ span: 3, offset: 0 }}>
                            <div className="backgrounded text-center p-3" style={{ borderRadius: 50 }}>
                                <span style={{ fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 25 }}>
                                    You are admin
                                </span>
                                <Button className="w-100 h-100" variant="" style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#6c6cd9", fontSize: 20 }} as={Link} to="/dashboard">Dashboard</Button>
                                <Button className="w-100 h-100 mt-2" variant="" style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#6c6cd9", fontSize: 20 }} as={Link} to="/admin">Manage users</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile;
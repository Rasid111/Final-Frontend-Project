import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";
import { ColorModeContext } from "../contexts/ColorModeContex";
import { BsArrowsAngleContract } from "react-icons/bs";
import { LangContext } from "../contexts/LangContext";

function AdminPanel() {

    const navigate = useNavigate();
    const auth = useSelector(state => state.auth.id);

    useEffect(() => {
        if (auth === null) {
            navigate("/login");
        }
    }, [auth]);

    const colorMode = useContext(ColorModeContext)[0];

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

    const [update, setUpdate] = useState(false);
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        async function getAccounts() {
            const { data } = await supabase
                .from("Users")
                .select("*");
            setAccounts(data);
        }
        getAccounts();
    }, [update])
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [account, setAccount] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function makeAdmin(account) {
        const { error } = await supabase.
            from("Users")
            .update({
                is_admin: true
            })
            .eq("id", account.id)
        setUpdate(!update);
        console.log(error);
    }
    
    const lang = useContext(LangContext);

    return (
        <Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to make {account ? account.login : ""} an administrator?</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        makeAdmin(account);
                        handleClose();
                    }} variant="" style={{ backgroundColor: "#6c6cd9", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 20 }}>
                        Yes
                    </Button>
                    <Button variant="" style={{ backgroundColor: "#b40a0a", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 20 }} onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row xs={1} className="g-2">
                {!accounts ? "..." : accounts.map((account, index) => {
                    if (account.login === null) {
                        return <div key={index}></div>
                    }
                    return (
                        <Col className="backgrounded py-2">
                            <Container>
                                <Row className="g-2">
                                    <Col className="text-center" xs={"auto"} lg={1}>
                                        <span className="styled-text d-block">Login:</span>
                                    </Col>
                                    <Col xs={12} lg={11}>
                                        <span className="styled-text d-block">{account.login}</span>
                                    </Col>
                                    <Col className="text-center" xs={"auto"} lg={1}>
                                        <span className="styled-text d-block">Email:</span>
                                    </Col>
                                    <Col xs={12} lg={11}>
                                        <span className="styled-text d-block">{account.email}</span>
                                    </Col>
                                    {account.is_admin ? (
                                        <Col xs={5} md={4} lg={3} xl={2} className="text-center"><span className="styled-text d-block">{lang === "en" ? "Is already Admin" : "Artıq Admindir"}</span></Col>
                                    ) : (
                                        <Col xs={12}>
                                            <Button variant="" onClick={() => {
                                                setAccount(account);
                                                handleShow();
                                            }} style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: colorMode === "light" ? "#6c6cd9" : "#070389", fontSize: 20 }}>{lang === "en" ? "Make Admin" : "Admin et"}</Button>
                                        </Col>
                                    )}
                                </Row>
                            </Container>
                        </Col>
                        // <Col key={index} className="backgrounded p-2">
                        //     <div className="d-flex">
                        //         <span className="styled-text d-block me-2" style={{ width: "8%" }}>Login:</span>
                        //         <span className="styled-text d-block" style={{ width: "92%" }}>{account.login}</span>
                        //     </div>
                        //     <div className="d-flex mt-2">
                        //         <span className="styled-text d-block me-2" style={{ width: "8%" }}>Email:</span>
                        //         <span className="styled-text d-block" style={{ width: "92%" }}>{account.email}</span>
                        //     </div>
                        //     {account.is_admin ? (
                        //         <Col xs={12} className="mt-2 text-center p-0"><span className="styled-text w-25 d-block">Is already Admin</span></Col>
                        //     ) : (
                        //         <Col xs={12} className="mt-2 p-0">
                        //             <Button variant="" className="w-25" onClick={() => {
                        //                 setAccount(account);
                        //                 handleShow();
                        //             }} style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#6c6cd9", fontSize: 20 }}>Make Admin</Button>
                        //         </Col>
                        //     )}
                        // </Col>

                        // <Row className="p-2 my-3 backgrounded" key={index}>
                        //     <Col xs={4} sm={2} className="text-center d-flex justify-content-center p-0 p-xl-2 align-baseline text-center">
                        //         <span className="styled-text d-block w-100">Login</span>
                        //     </Col>
                        //     <Col xs={12} xl={10} className="white-backgrounded p-2">{account.login}</Col>
                        //     <Col xs={4} sm={2} className="text-center d-flex justify-content-center p-0 align-baseline text-center">
                        //         <span className="styled-text d-block w-100">Email</span>
                        //     </Col>
                        //     <Col xs={12} xl={10} className="white-backgrounded p-2">{account.email}</Col>
                        //     {account.is_admin ? (
                        //         <Col xs={12} className="mt-2 text-center p-0"><span className="styled-text w-25 d-block">Is already Admin</span></Col>
                        //     ) : (
                        //         <Col xs={12} className="mt-2 p-0">
                        //             <Button variant="" className="w-25" onClick={() => {
                        //                 setAccount(account);
                        //                 handleShow();
                        //             }} style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#6c6cd9", fontSize: 20 }}>Make Admin</Button>
                        //         </Col>
                        //     )}
                        // </Row>
                    )
                })}
            </Row>
        </Container>
    );
}

export default AdminPanel;
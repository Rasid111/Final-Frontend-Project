import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeAdmin } from "../tools/actions/accountAction";

function AdminPanel() {
    const accounts = useSelector(state => state.accounts);
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    useEffect(() => {
        if (!accounts.some(account => account.email === auth && account.isAdmin)) {
            navigate("/");
        }
    })

    const [show, setShow] = useState(false);
    const [account, setAccount] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to make {account ? account.login : ""} an administrator?</Modal.Body>
                <Modal.Footer>
                    <Button onClick = {() => {
                        dispatch(makeAdmin(account));
                        handleClose();
                    }} variant="" style={{ backgroundColor: "#6c6cd9", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 20 }}>
                        Yes
                    </Button>
                    <Button variant="" style={{ backgroundColor: "#b40a0a", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#fff", fontSize: 20 }} onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
            {accounts.map((account, index) => {
                if (account.login === null) {
                    return <div key={index}></div>
                }
                return (
                    <Row className="p-2 g-4 my-3 backgrounded" key={index}>
                        <Col xs={1} className="text-center align-baseline mt-0">
                            <span className="styled-text d-block">Login</span>
                        </Col>
                        <Col xs={11} className="white-backgrounded mt-0 p-2">{account.login}</Col>
                        <Col xs={1} className="text-center align-baseline mt-2">
                            <span className="styled-text d-block">Email</span>
                        </Col>
                        <Col xs={11} className="white-backgrounded p-2 mt-2">{account.email}</Col>
                        {account.isAdmin ? (
                            <Col xs={2} className="mt-2 text-center"><span className="styled-text d-block">Is already Admin</span></Col>
                        ) : (
                            <Col xs={2} className="mt-2">
                                <Button variant="" className="w-100" onClick={() => {
                                    setAccount(account);
                                    handleShow();
                                }} style={{ backgroundColor: "#fff", borderRadius: 255, fontFamily: "Arial Rounded MT Bold", color: "#6c6cd9", fontSize: 20 }}>Make Admin</Button>
                            </Col>
                        )}
                    </Row>
                )
            })}
        </Container>
    );
}

export default AdminPanel;
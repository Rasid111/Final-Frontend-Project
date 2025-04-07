import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div id="notFound" className="position-relative" style={{ height: "100vh" }}>
            {/* <Link to="/"> */}
                <img className="position-absolute object-fit-contain" src="/animation_elements/404bar.png" alt="404bar" />
            {/* </Link> */}
            <img className="position-absolute object-fit-contain" src="/icons/trytoclick.png" alt="404bar" />
            <img className="position-absolute object-fit-contain" src="/titles/notfound.png" alt="404bar" />
        </div>
    )
}

export default NotFoundPage;
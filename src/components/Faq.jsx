import { Accordion, Container } from "react-bootstrap";

function Faq() {
    return (
        <>
            <Container>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>How do I place an order?</Accordion.Header>
                        <Accordion.Body>
                            Add the desired items to your cart, proceed to checkout, fill in the required information, and choose a payment and delivery method. After confirming your order, you will receive a notification via email.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>What payment methods do you accept?</Accordion.Header>
                        <Accordion.Body>
                            We accept bank cards (Visa, MasterCard), e-wallets, and the Faster Payment System (FPS). Cash on delivery is also available in certain regions.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>How can I check my order status?</Accordion.Header>
                        <Accordion.Body>
                            Once your order is placed, you will receive a tracking number. You can check the status in your account or via the link provided in the confirmation email.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Can I return or exchange an item?</Accordion.Header>
                        <Accordion.Body>
                            Yes, you can return or exchange an item within 14 days, provided it is in its original condition and packaging. For more details, please see our Return Policy.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Do you offer international shipping?</Accordion.Header>
                        <Accordion.Body>
                            Currently, we deliver only within Azerbaijan. We are working on expanding our delivery options.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </>
    )
}

export default Faq;
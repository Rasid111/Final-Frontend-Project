import { useContext } from "react";
import { Accordion, Container } from "react-bootstrap";
import { LangContext } from "../contexts/LangContext";

function Faq() {
    const lang = useContext(LangContext)[0];
    return (
        <>
            <Container>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{lang == "en" ? "How do I place an order?" : "Necə sifariş verə bilərəm?"}</Accordion.Header>
                        <Accordion.Body>
                            {lang == "en" ? "Add the desired items to your cart, proceed to checkout, fill in the required information, and choose a payment and delivery method. After confirming your order, you will receive a notification via email." : "İstədiyiniz əşyaları səbətinizə əlavə edin, ödənişə davam edin, tələb olunan məlumatları doldurun və ödəniş və çatdırılma üsulunu seçin. Sifarişinizi təsdiqlədikdən sonra e-poçt vasitəsilə bildiriş alacaqsınız."}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>{lang == "en" ? "What payment methods do you accept?" : "Hansı ödəniş üsullarını qəbul edirsiniz?"}</Accordion.Header>
                        <Accordion.Body>
                            {lang == "en" ? "We accept bank cards (Visa, MasterCard), e-wallets, and the Faster Payment System (FPS). Cash on delivery is also available in certain regions." : "Biz bank kartlarını (Visa, MasterCard), elektron pul kisələrini və Daha Sürətli Ödəniş Sistemini (FPS) qəbul edirik. Bəzi bölgələrdə çatdırılma zamanı nağd pul da mövcuddur."}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>{lang == "en" ? "How can I check my order status?" : "Sifariş statusumu necə yoxlaya bilərəm?"}</Accordion.Header>
                        <Accordion.Body>
                            {lang == "en" ? "Once your order is placed, you will receive a tracking number. You can check the status in your account or via the link provided in the confirmation email." : "Sifarişiniz verildikdən sonra bir izləmə nömrəsi alacaqsınız. Hesabınızdakı statusu və ya təsdiq e-poçtunda göstərilən link vasitəsilə yoxlaya bilərsiniz."}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>{lang == "en" ? "Can I return or exchange an item?" : "Mən bir əşyanı qaytara və ya dəyişdirə bilərəm?"}</Accordion.Header>
                        <Accordion.Body>
                            {lang == "en" ? "Yes, you can return or exchange an item within 14 days, provided it is in its original condition and packaging. For more details, please see our Return Policy." : "Bəli, orijinal vəziyyətdə və qablaşdırmada olması şərti ilə 14 gün ərzində onu qaytara və ya dəyişdirə bilərsiniz. Daha ətraflı məlumat üçün Qaytarma Siyasətimizə baxın."}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>{lang == "en" ? "Do you offer international shipping?" : "Beynəlxalq çatdırılma təklif edirsiniz?"}</Accordion.Header>
                        <Accordion.Body>
                            {lang == "en" ? "Currently, we deliver only within Azerbaijan. We are working on expanding our delivery options." : "Hazırda yalnız Azərbaycan daxilində çatdırılma edirik. Çatdırılma variantlarımızı genişləndirmək üzərində işləyirik."}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </>
    )
}

export default Faq;
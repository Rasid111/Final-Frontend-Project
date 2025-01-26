import ProductCard from "./ProductCard";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Slide({ products, slidesPerView = 4 }) {
    return (
        <>
            <Swiper
                className={"border rounded-3"}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                slidesPerView={slidesPerView}
            >
                {products.map((p, i) => {
                    return (
                        <SwiperSlide key={i}>
                            <ProductCard cardHeight={500} className="border-0" product={p}></ProductCard>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    );
}

export default Slide;
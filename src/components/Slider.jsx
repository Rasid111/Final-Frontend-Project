import ProductCard from "./ProductCard";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Slide({ products, slidesPerView = 5 }) {
    return (
        <>
            <Swiper
            className="px-0"
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
                            <ProductCard product={p}></ProductCard>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    );
}

export default Slide;
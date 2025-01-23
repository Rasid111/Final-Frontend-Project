import ProductCard from "./ProductCard";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Slide({ products }) {
    return (
        <>
            <Swiper
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                slidesPerView={1}
            >
                {products.map((p, i) => {
                    return (
                        <SwiperSlide key={i}>
                            <ProductCard className="border-0" product={p}></ProductCard>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    );
}

export default Slide;
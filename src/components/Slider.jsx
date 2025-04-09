import ProductCard from "./ProductCard";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Slide({ products }) {
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
                slidesPerView={2}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                    },
                    992: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                    1400: {
                        slidesPerView: 5,
                    }
                }}
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
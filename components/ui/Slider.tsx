'use client'
import {FC} from "react";
import {CldImage} from "next-cloudinary";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageProps {
    title: string,
    images: string[],
}

const Slider: FC<ImageProps> = ({title, images}) => {

    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <CldImage
                        src={image}
                        alt={`${title} product image`}
                        width={640}
                        height={640}
                        className="object-contain"
                        placeholder="blur"
                        blurDataURL="/loading.png"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Slider;

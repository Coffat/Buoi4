import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ImageGallery = ({ images = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!images.length) {
    return (
      <div className="bg-[#111112] flex items-center justify-center border border-[#1C1C1F]" style={{ aspectRatio: '16/11' }}>
        <span className="text-[#52525B] text-[10px] tracking-[0.2em] font-light">KHÔNG CÓ HÌNH ẢNH</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Swiper
        modules={[Navigation, Thumbs, Autoplay]}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="border border-[#1C1C1F] bg-[#111112]"
        style={{ aspectRatio: '16/11' }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={img.id || idx}>
            <div className="w-full h-full relative overflow-hidden bg-[#080809]">
              <img
                src={img.image_url}
                alt={`Hình ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={8}
        slidesPerView={4}
        watchSlidesProgress
        className="thumbnail-swiper"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={img.id || idx} className="cursor-pointer">
            <div className="aspect-[16/11] relative overflow-hidden bg-[#111112]">
              <img
                src={img.image_url}
                alt={`Thumb ${idx + 1}`}
                className="w-full h-full object-cover border border-[#1C1C1F] hover:border-[#C5B49E] transition-all duration-300 ease-out"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageGallery;

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
      <div className="bg-gray-100 flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
        <span className="text-gray-400 text-xs tracking-wider">KHÔNG CÓ HÌNH ẢNH</span>
      </div>
    );
  }

  return (
    <div>
      <Swiper
        modules={[Navigation, Thumbs, Autoplay]}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="border border-gray-200"
        style={{ aspectRatio: '4/3' }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={img.id || idx}>
            <img
              src={img.image_url}
              alt={`Hình ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={4}
        slidesPerView={4}
        watchSlidesProgress
        className="mt-4"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={img.id || idx} className="cursor-pointer">
            <img
              src={img.image_url}
              alt={`Thumb ${idx + 1}`}
              className="w-full object-cover border border-gray-200 hover:border-gray-900 transition-colors"
              style={{ aspectRatio: '4/3' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageGallery;

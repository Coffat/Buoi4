import { useState } from 'react';

const REVIEWS = [
  {
    id: 1,
    name: 'Nguyễn Minh Tú',
    location: 'TP.HCM',
    rating: 5,
    text: 'Đội ngũ đã khiến toàn bộ quá trình trở nên liền mạch. Minh bạch, chuyên nghiệp và thực sự quan tâm đến khách hàng.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face&q=80',
  },
  {
    id: 2,
    name: 'Trần Thu Hà',
    location: 'Hà Nội',
    rating: 5,
    text: 'Kho xe phong phú với những mẫu xe hạng sang. Tôi đã tìm được chiếc xe mơ ước và không thể hạnh phúc hơn!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face&q=80',
  },
  {
    id: 3,
    name: 'Lê Đức Kiên',
    location: 'Đà Nẵng',
    rating: 5,
    text: 'Từ tài chính đến giao xe, mọi thứ đều được xử lý hoàn hảo. Vượt qua mọi kỳ vọng của tôi.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face&q=80',
  },
  {
    id: 4,
    name: 'Phạm Việt Anh',
    location: 'TP.HCM',
    rating: 5,
    text: 'Dịch vụ tư vấn xuất sắc. Họ giúp tôi chọn được chiếc xe phù hợp nhất với nhu cầu và ngân sách.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face&q=80',
  },
];

const Stars = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`w-3.5 h-3.5 ${i < count ? 'text-[#D4AF37]' : 'text-[#2a3040]'}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <article className="luxury-card p-6 flex flex-col h-full">
    <img
      src={review.avatar}
      alt={review.name}
      className="w-12 h-12 rounded-full object-cover border-2 border-[#1e2430] mb-3"
      onError={(e) => {
        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=1e2430&color=D4AF37`;
      }}
    />
    <Stars count={review.rating} />
    <p className="text-[#a8b0bc] text-[13px] leading-relaxed flex-1 my-4">
      &ldquo;{review.text}&rdquo;
    </p>
    <div>
      <p className="text-white font-semibold text-[13px]">{review.name}</p>
      <p className="text-[#6b7280] text-[11px]">{review.location}</p>
    </div>
  </article>
);

const ReviewsSection = () => {
  const [start, setStart] = useState(0);
  const visible = 3;
  const canPrev = start > 0;
  const canNext = start + visible < REVIEWS.length;

  return (
    <section className="luxury-section bg-[#05070a] border-t border-[#1e2430]">
      <div className="luxury-container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Khách hàng nói gì</h2>
          <a href="#" className="gold-link">
            Xem tất cả đánh giá
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setStart((s) => Math.max(0, s - 1))}
            disabled={!canPrev}
            className="carousel-nav-btn"
            aria-label="Trước"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1 min-w-0">
            {REVIEWS.slice(start, start + visible).map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setStart((s) => Math.min(REVIEWS.length - visible, s + 1))}
            disabled={!canNext}
            className="carousel-nav-btn"
            aria-label="Sau"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

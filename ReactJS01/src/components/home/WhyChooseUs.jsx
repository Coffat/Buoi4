const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Xe chứng nhận chất lượng',
    desc: 'Mỗi chiếc xe đều trải qua kiểm tra đa điểm nghiêm ngặt, đảm bảo chất lượng không thỏa hiệp.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    title: 'Giá minh bạch',
    desc: 'Không phí ẩn. Không bất ngờ. Chỉ là mức giá trung thực và cạnh tranh bạn có thể tin tưởng.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Hỗ trợ tài chính',
    desc: 'Chuyên gia tài chính hợp tác với các ngân hàng hàng đầu để mang lại lãi suất tốt nhất.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    title: 'Giao xe toàn quốc',
    desc: 'Từ showroom đến tận nhà bạn. Chúng tôi giao xe cao cấp đến mọi nơi trên cả nước.',
  },
];

import PageHeader from '../ui/PageHeader.jsx';

const WhyChooseUs = () => (
  <section id="gioi-thieu" className="luxury-section bg-[#080809] border-t border-[#18181A]">
    <div className="luxury-container">
      <PageHeader
        eyebrow="Tập trung vào trải nghiệm"
        title="Tại sao chọn"
        highlight="AutoVIP Motors"
        className="mb-12"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feat) => (
          <article key={feat.title} className="p-6 border border-[#18181A] bg-[#111112]/30 hover:border-[#C5B49E] transition-all duration-300 flex flex-col justify-between min-h-[220px] group">
            <div className="w-10 h-10 flex items-center justify-center text-[#C5B49E] mb-6">
              {feat.icon}
            </div>
            <div>
              <h3 className="text-[14px] font-medium tracking-wide text-white mb-2">{feat.title}</h3>
              <p className="text-[#A1A1AA] text-[12px] font-light leading-relaxed">{feat.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;

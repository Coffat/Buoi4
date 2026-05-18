import { Link } from 'react-router-dom';

const PageHeader = ({
  eyebrow,
  title,
  highlight,
  description,
  actionLabel,
  actionHref,
  className = '',
}) => (
  <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 ${className}`}>
    <div className="space-y-3 max-w-2xl">
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title-block">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-[#C5B49E] italic font-normal">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="text-[#A1A1AA] text-sm font-light leading-relaxed">{description}</p>
      )}
    </div>
    {actionLabel && actionHref && (
      <Link to={actionHref} className="gold-link self-start lg:self-end shrink-0">
        {actionLabel}
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    )}
  </div>
);

export default PageHeader;

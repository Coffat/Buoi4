const Pagination = ({ page, totalPages, onPage }) => {
  const pages = [];
  const delta = 2;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
      pages.push(i);
    }
  }

  const rendered = [];
  let prev = null;
  for (const p of pages) {
    if (prev && p - prev > 1) rendered.push('...');
    rendered.push(p);
    prev = p;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        type="button"
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-9 h-9 flex items-center justify-center border border-[#18181A] text-[#A1A1AA] hover:border-[#C5B49E] hover:text-[#C5B49E] disabled:opacity-20 disabled:cursor-not-allowed transition-all rounded-none bg-[#111112]"
        aria-label="Trang trước"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {rendered.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="text-[#52525B] px-1 text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPage(p)}
            className={`w-9 h-9 text-[12px] font-medium border transition-all rounded-none ${
              p === page
                ? 'bg-[#C5B49E] border-[#C5B49E] text-[#080809]'
                : 'border-[#18181A] bg-[#111112] text-[#A1A1AA] hover:border-[#C5B49E] hover:text-[#C5B49E]'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-9 h-9 flex items-center justify-center border border-[#18181A] text-[#A1A1AA] hover:border-[#C5B49E] hover:text-[#C5B49E] disabled:opacity-20 disabled:cursor-not-allowed transition-all rounded-none bg-[#111112]"
        aria-label="Trang sau"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;

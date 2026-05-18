const ASSET_BASE = '/assets/thesvg/categories';

const SLUG_TO_ICON = {
  sedan: 'sedan',
  suv: 'suv',
  'ban-tai': 'ban-tai',
  'xe-dien': 'xe-dien',
  coupe: 'coupe',
  pickup: 'pickup',
  ev: 'ev',
};

export const getCategoryIconKey = (category) => {
  const slug = category?.slug?.toLowerCase();
  if (slug && SLUG_TO_ICON[slug]) return SLUG_TO_ICON[slug];

  const name = (category?.name || '').toLowerCase();
  if (name.includes('suv')) return 'suv';
  if (name.includes('sedan')) return 'sedan';
  if (name.includes('bán tải') || name.includes('ban tai') || name.includes('pickup')) {
    return 'ban-tai';
  }
  if (name.includes('điện') || name.includes('dien') || name.includes('ev')) return 'xe-dien';
  if (name.includes('coupe')) return 'coupe';

  return 'sedan';
};

const ICON_VERSION = 'mdi2';

export const getCategoryIconUrl = (category) => {
  const key = getCategoryIconKey(category);
  return `${ASSET_BASE}/${key}.svg?v=${ICON_VERSION}`;
};

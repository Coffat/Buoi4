const BRAND_SLUG_MAP = {
  mercedes: 'mercedes-benz',
  'mercedes-benz': 'mercedes-benz',
  'mercedes benz': 'mercedes-benz',
  bmw: 'bmw',
  audi: 'audi',
  porsche: 'porsche',
  toyota: 'toyota',
  honda: 'honda',
  ford: 'ford',
  hyundai: 'hyundai',
  vinfast: 'vinfast',
  mazda: 'mazda',
  kia: 'kia',
  nissan: 'nissan',
  lexus: 'lexus',
  tesla: 'tesla',
  volkswagen: 'volkswagen',
  volvo: 'volvo',
  'land rover': 'land-rover',
  ferrari: 'ferrari',
  lamborghini: 'lamborghini',
};

export const getBrandSlug = (brand) => {
  if (!brand) return null;
  const key = brand.trim().toLowerCase();
  if (BRAND_SLUG_MAP[key]) return BRAND_SLUG_MAP[key];
  return key.replace(/\s+/g, '-');
};

export const getBrandLogoUrl = (brand) => {
  const slug = getBrandSlug(brand);
  return slug ? `/assets/thesvg/brands/${slug}.svg` : null;
};

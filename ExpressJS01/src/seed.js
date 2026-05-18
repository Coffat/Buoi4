require('dotenv').config();
const { sequelize } = require('./config/database');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const Category = require('./models/category');
const Product = require('./models/product');
const ProductImage = require('./models/productImage');

const toSlug = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d9?w=800',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
];

const carImagesMap = {
  'Toyota Camry 2024': [
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    'https://images.unsplash.com/photo-1631857455684-a54a2f03665f?w=800',
    'https://images.unsplash.com/photo-1623998021451-31d2ba355b62?w=800',
  ],
  'Honda CR-V 2024': [
    'https://images.unsplash.com/photo-1606016159991-dfe4f974be5c?w=800',
    'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
  ],
  'BMW 530i M Sport': [
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
    'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800',
  ],
  'Mercedes-Benz GLC 300': [
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d9?w=800',
    'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
  ],
  'Ford Ranger Wildtrak': [
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
  ],
  'Hyundai Santa Fe 2024': [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    'https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?w=800',
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
  ],
  'VinFast VF 8': [
    'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800',
    'https://images.unsplash.com/photo-1606016159991-dfe4f974be5c?w=800',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
  ],
  'Mazda CX-5 2024': [
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
    'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800',
  ],
  'VinFast VF 9': [
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
    'https://images.unsplash.com/photo-1518987184-963f191e7747?w=800',
  ],
  'KIA Cerato 2024': [
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
    'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
  ],
};

const productTemplate = (overrides) => ({
  stock: 10,
  sold: 50,
  fuel_type: 'Xăng',
  transmission: 'Tự động',
  mileage: 15000,
  location: 'TP.HCM',
  description: 'Xe chất lượng cao, kiểm định đầy đủ tại AutoVIP Premium.',
  ...overrides,
});

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    require('./models/user');
    require('./models/category');
    require('./models/product');
    require('./models/productImage');
    await sequelize.sync({ force: true });
    console.log('Tables recreated');

    const adminHash = await bcrypt.hash('admin123', 10);
    const userHash = await bcrypt.hash('user123', 10);

    await User.bulkCreate([
      { name: 'Admin', email: 'admin@gmail.com', password: adminHash, role: 'Admin' },
      { name: 'User', email: 'user@gmail.com', password: userHash, role: 'User' },
    ]);
    console.log('Users seeded');

    const categories = await Category.bulkCreate([
      { name: 'Sedan', slug: 'sedan', description: 'Xe sedan 4 chỗ sang trọng' },
      { name: 'SUV', slug: 'suv', description: 'Xe đa dụng SUV mạnh mẽ' },
      { name: 'Bán tải', slug: 'ban-tai', description: 'Xe bán tải đa năng' },
      { name: 'Xe điện', slug: 'xe-dien', description: 'Xe điện thân thiện môi trường' },
    ]);
    console.log('Categories seeded');

    const [sedan, suv, pickup, ev] = categories.map((c) => c.id);

    const products = [
      // ─── promotion (10) ───────────────────────────────────────────────
      productTemplate({
        name: 'BMW 530i M Sport',
        price: 2729000000,
        original_price: 3199000000,
        status: 'promotion',
        category_id: sedan,
        brand: 'BMW',
        year: 2023,
        transmission: 'Tự động Steptronic 8 cấp',
        mileage: 22000,
        location: 'Đà Nẵng',
        sold: 45,
        description:
          'BMW 530i M Sport – Sedan hạng sang thể thao với gói M Sport, động cơ 2.0L TwinPower Turbo 252 mã lực.',
      }),
      productTemplate({
        name: 'Hyundai Santa Fe 2024',
        price: 1199000000,
        original_price: 1369000000,
        status: 'promotion',
        category_id: suv,
        brand: 'Hyundai',
        year: 2024,
        fuel_type: 'Dầu Smartstream',
        transmission: 'Tự động ly hợp kép 8 cấp (8DCT)',
        mileage: 14000,
        location: 'Hải Phòng',
        sold: 150,
      }),
      productTemplate({
        name: 'Mazda CX-5 2024',
        price: 749000000,
        original_price: 829000000,
        status: 'promotion',
        category_id: suv,
        brand: 'Mazda',
        year: 2024,
        fuel_type: 'Xăng SkyActiv-G',
        transmission: 'Tự động 6 cấp',
        mileage: 11000,
        sold: 200,
      }),
      productTemplate({
        name: 'Toyota Fortuner 2024',
        price: 1189000000,
        original_price: 1289000000,
        status: 'promotion',
        category_id: suv,
        brand: 'Toyota',
        year: 2024,
        sold: 190,
      }),
      productTemplate({
        name: 'KIA Seltos 2024',
        price: 629000000,
        original_price: 699000000,
        status: 'promotion',
        category_id: suv,
        brand: 'KIA',
        year: 2024,
        mileage: 9000,
        sold: 175,
      }),
      productTemplate({
        name: 'Mitsubishi Xpander Cross 2024',
        price: 699000000,
        original_price: 749000000,
        status: 'promotion',
        category_id: suv,
        brand: 'Mitsubishi',
        year: 2024,
        sold: 220,
      }),
      productTemplate({
        name: 'Nissan Terra 2024',
        price: 979000000,
        original_price: 1049000000,
        status: 'promotion',
        category_id: suv,
        brand: 'Nissan',
        year: 2024,
        fuel_type: 'Dầu',
        sold: 88,
      }),
      productTemplate({
        name: 'Peugeot 3008 2024',
        price: 999000000,
        original_price: 1099000000,
        status: 'promotion',
        category_id: suv,
        brand: 'Peugeot',
        year: 2024,
        sold: 62,
      }),
      productTemplate({
        name: 'Subaru Forester 2024',
        price: 999000000,
        original_price: 1059000000,
        status: 'promotion',
        category_id: suv,
        brand: 'Subaru',
        year: 2024,
        sold: 54,
      }),
      productTemplate({
        name: 'Chevrolet Trailblazer 2024',
        price: 859000000,
        original_price: 929000000,
        status: 'promotion',
        category_id: suv,
        brand: 'Chevrolet',
        year: 2024,
        sold: 71,
      }),

      // ─── new (10) ─────────────────────────────────────────────────────
      productTemplate({
        name: 'Honda CR-V 2024',
        price: 1109000000,
        original_price: 1159000000,
        status: 'new',
        category_id: suv,
        brand: 'Honda',
        year: 2024,
        transmission: 'Tự động vô cấp CVT',
        mileage: 12000,
        sold: 180,
      }),
      productTemplate({
        name: 'Mercedes-Benz GLC 300',
        price: 2639000000,
        original_price: 2799000000,
        status: 'new',
        category_id: suv,
        brand: 'Mercedes',
        year: 2024,
        transmission: 'Tự động 9 cấp 9G-TRONIC',
        mileage: 18000,
        sold: 67,
      }),
      productTemplate({
        name: 'VinFast VF 9',
        price: 1589000000,
        original_price: 1899000000,
        status: 'new',
        category_id: ev,
        brand: 'VinFast',
        year: 2024,
        fuel_type: 'Điện',
        transmission: 'Tự động 1 cấp',
        mileage: 8000,
        location: 'Hà Nội',
        sold: 85,
      }),
      productTemplate({
        name: 'Toyota Corolla Cross 2024',
        price: 820000000,
        original_price: 860000000,
        status: 'new',
        category_id: suv,
        brand: 'Toyota',
        year: 2024,
        mileage: 5000,
        sold: 140,
      }),
      productTemplate({
        name: 'Honda City 2024',
        price: 599000000,
        original_price: 629000000,
        status: 'new',
        category_id: sedan,
        brand: 'Honda',
        year: 2024,
        mileage: 7000,
        sold: 210,
      }),
      productTemplate({
        name: 'MG ZS EV 2024',
        price: 769000000,
        original_price: 799000000,
        status: 'new',
        category_id: ev,
        brand: 'MG',
        year: 2024,
        fuel_type: 'Điện',
        sold: 95,
      }),
      productTemplate({
        name: 'Hyundai Creta 2024',
        price: 640000000,
        original_price: 680000000,
        status: 'new',
        category_id: suv,
        brand: 'Hyundai',
        year: 2024,
        sold: 165,
      }),
      productTemplate({
        name: 'Mazda 3 2024',
        price: 699000000,
        original_price: 729000000,
        status: 'new',
        category_id: sedan,
        brand: 'Mazda',
        year: 2024,
        sold: 130,
      }),
      productTemplate({
        name: 'Suzuki Ertiga Hybrid 2024',
        price: 679000000,
        original_price: 709000000,
        status: 'new',
        category_id: suv,
        brand: 'Suzuki',
        year: 2024,
        fuel_type: 'Hybrid',
        sold: 118,
      }),
      productTemplate({
        name: 'VinFast VF 6 2024',
        price: 675000000,
        original_price: 699000000,
        status: 'new',
        category_id: ev,
        brand: 'VinFast',
        year: 2024,
        fuel_type: 'Điện',
        sold: 102,
      }),

      // ─── featured (10) ──────────────────────────────────────────────
      productTemplate({
        name: 'Mercedes-Benz S 450',
        price: 4890000000,
        original_price: 5190000000,
        status: 'featured',
        category_id: sedan,
        brand: 'Mercedes',
        year: 2024,
        transmission: 'Tự động 9G-TRONIC',
        mileage: 12000,
        sold: 28,
        description: 'Flagship sedan hạng S – tiêu chuẩn sang trọng tối thượng của Mercedes-Benz.',
      }),
      productTemplate({
        name: 'BMW X7 xDrive40i',
        price: 5190000000,
        original_price: 5490000000,
        status: 'featured',
        category_id: suv,
        brand: 'BMW',
        year: 2024,
        sold: 22,
        description: 'SUV full-size 7 chỗ – không gian rộng rãi và công nghệ BMW hiện đại nhất.',
      }),
      productTemplate({
        name: 'Audi Q8 55 TFSI',
        price: 4590000000,
        original_price: 4790000000,
        status: 'featured',
        category_id: suv,
        brand: 'Audi',
        year: 2023,
        sold: 31,
      }),
      productTemplate({
        name: 'Lexus LX 600',
        price: 8990000000,
        original_price: 9290000000,
        status: 'featured',
        category_id: suv,
        brand: 'Lexus',
        year: 2024,
        sold: 12,
      }),
      productTemplate({
        name: 'Porsche Cayenne S',
        price: 5890000000,
        original_price: 6190000000,
        status: 'featured',
        category_id: suv,
        brand: 'Porsche',
        year: 2023,
        sold: 18,
      }),
      productTemplate({
        name: 'Range Rover Sport 2024',
        price: 6290000000,
        original_price: 6590000000,
        status: 'featured',
        category_id: suv,
        brand: 'Land Rover',
        year: 2024,
        sold: 15,
      }),
      productTemplate({
        name: 'VinFast VF 8 Plus',
        price: 1290000000,
        original_price: 1490000000,
        status: 'featured',
        category_id: ev,
        brand: 'VinFast',
        year: 2024,
        fuel_type: 'Điện',
        sold: 420,
      }),
      productTemplate({
        name: 'Genesis G90 2024',
        price: 3890000000,
        original_price: 4090000000,
        status: 'featured',
        category_id: sedan,
        brand: 'Genesis',
        year: 2024,
        sold: 24,
      }),
      productTemplate({
        name: 'Volvo XC90 Recharge',
        price: 3290000000,
        original_price: 3490000000,
        status: 'featured',
        category_id: suv,
        brand: 'Volvo',
        year: 2024,
        fuel_type: 'Hybrid',
        sold: 36,
      }),
      productTemplate({
        name: 'Bentley Bentayga V8',
        price: 15900000000,
        original_price: 16500000000,
        status: 'featured',
        category_id: suv,
        brand: 'Bentley',
        year: 2023,
        sold: 5,
      }),

      // ─── best_seller + normal (listing variety) ───────────────────────
      productTemplate({
        name: 'Toyota Camry 2024',
        price: 1220000000,
        original_price: 1370000000,
        status: 'best_seller',
        category_id: sedan,
        brand: 'Toyota',
        year: 2024,
        sold: 230,
        location: 'Hà Nội',
      }),
      productTemplate({
        name: 'Ford Ranger Wildtrak',
        price: 979000000,
        original_price: 1029000000,
        status: 'best_seller',
        category_id: pickup,
        brand: 'Ford',
        year: 2023,
        fuel_type: 'Dầu Bi-Turbo',
        transmission: 'Tự động 10 cấp',
        mileage: 25000,
        sold: 350,
      }),
      productTemplate({
        name: 'KIA Cerato 2024',
        price: 549000000,
        original_price: 619000000,
        status: 'best_seller',
        category_id: sedan,
        brand: 'KIA',
        year: 2024,
        location: 'Cần Thơ',
        sold: 310,
      }),
      productTemplate({
        name: 'Honda Accord 2024',
        price: 1329000000,
        status: 'normal',
        category_id: sedan,
        brand: 'Honda',
        year: 2024,
        sold: 78,
      }),
    ];

    const createdProducts = [];
    for (const p of products) {
      const slug = toSlug(p.name);
      const product = await Product.create({ ...p, slug });
      createdProducts.push(product);
    }
    console.log(`Products seeded: ${createdProducts.length}`);

    const images = [];
    createdProducts.forEach((product) => {
      const urls = carImagesMap[product.name] || DEFAULT_IMAGES;
      images.push(
        { product_id: product.id, image_url: urls[0], is_primary: true, sort_order: 0 },
        { product_id: product.id, image_url: urls[1], is_primary: false, sort_order: 1 },
        { product_id: product.id, image_url: urls[2], is_primary: false, sort_order: 2 }
      );
    });

    await ProductImage.bulkCreate(images);
    console.log('Product images seeded');

    const counts = createdProducts.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});
    console.log('Status counts:', counts);

    console.log('\n=== SEED COMPLETE ===');
    console.log('Admin: admin@gmail.com / admin123');
    console.log('User:  user@gmail.com / user123');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await sequelize.close();
  }
};

seed();

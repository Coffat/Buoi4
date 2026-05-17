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

    const products = [
      {
        name: 'Toyota Camry 2024',
        price: 1200000000,
        original_price: 1350000000,
        stock: 15,
        sold: 230,
        status: 'best_seller',
        category_id: categories[0].id,
        brand: 'Toyota',
        year: 2024,
        fuel_type: 'Xăng',
        transmission: 'Tự động',
        mileage: 15000,
        location: 'Hà Nội',
        description: 'Toyota Camry 2024 – dòng sedan hạng trung cao cấp với thiết kế thể thao, nội thất sang trọng và công nghệ an toàn hàng đầu. Trang bị động cơ 2.5L mạnh mẽ, tiết kiệm nhiên liệu.',
      },
      {
        name: 'Honda CR-V 2024',
        price: 1350000000,
        stock: 12,
        sold: 180,
        status: 'new',
        category_id: categories[1].id,
        brand: 'Honda',
        year: 2024,
        fuel_type: 'Xăng',
        transmission: 'Tự động',
        mileage: 12000,
        location: 'TP.HCM',
        description: 'Honda CR-V 2024 – SUV đô thị đa dụng với không gian rộng rãi, vận hành êm ái. Phiên bản mới cập nhật công nghệ an toàn Honda Sensing.',
      },
      {
        name: 'BMW 530i M Sport',
        price: 2500000000,
        original_price: 2800000000,
        stock: 5,
        sold: 45,
        status: 'promotion',
        category_id: categories[0].id,
        brand: 'BMW',
        year: 2023,
        fuel_type: 'Xăng',
        transmission: 'Tự động',
        mileage: 22000,
        location: 'Đà Nẵng',
        description: 'BMW 530i M Sport – Sedan hạng sang Đức với thiết kế thể thao, nội thất da cao cấp, động cơ 2.0L TwinPower Turbo mạnh mẽ.',
      },
      {
        name: 'Mercedes-Benz GLC 300',
        price: 2700000000,
        stock: 8,
        sold: 67,
        status: 'new',
        category_id: categories[1].id,
        brand: 'Mercedes',
        year: 2024,
        fuel_type: 'Xăng',
        transmission: 'Tự động',
        mileage: 18000,
        location: 'TP.HCM',
        description: 'Mercedes-Benz GLC 300 – SUV hạng sang cỡ trung, thiết kế tinh tế, nội thất xa hoa với hệ thống MBUX thông minh.',
      },
      {
        name: 'Ford Ranger Wildtrak',
        price: 950000000,
        original_price: 1050000000,
        stock: 20,
        sold: 350,
        status: 'best_seller',
        category_id: categories[2].id,
        brand: 'Ford',
        year: 2023,
        fuel_type: 'Dầu',
        transmission: 'Tự động',
        mileage: 25000,
        location: 'Hà Nội',
        description: 'Ford Ranger Wildtrak – Bán tải mạnh mẽ nhất phân khúc, động cơ 2.0L Bi-Turbo, khả năng off-road vượt trội.',
      },
      {
        name: 'Hyundai Santa Fe 2024',
        price: 1250000000,
        original_price: 1400000000,
        stock: 18,
        sold: 150,
        status: 'promotion',
        category_id: categories[1].id,
        brand: 'Hyundai',
        year: 2024,
        fuel_type: 'Dầu',
        transmission: 'Tự động',
        mileage: 14000,
        location: 'Hải Phòng',
        description: 'Hyundai Santa Fe 2024 – SUV gia đình 7 chỗ với thiết kế hiện đại, nhiều tiện nghi và an toàn 5 sao Euro NCAP.',
        is_active: true,
      },
      {
        name: 'VinFast VF 8',
        price: 1100000000,
        stock: 25,
        sold: 420,
        status: 'best_seller',
        category_id: categories[3].id,
        brand: 'VinFast',
        year: 2023,
        fuel_type: 'Điện',
        transmission: 'Tự động',
        mileage: 13000,
        location: 'Đà Nẵng',
        description: 'VinFast VF 8 – SUV điện thông minh, tầm vận hành 420km, công nghệ ADAS tiên tiến, thiết kế Ý.',
      },
      {
        name: 'Mazda CX-5 2024',
        price: 950000000,
        stock: 14,
        sold: 200,
        status: 'normal',
        category_id: categories[1].id,
        brand: 'Mazda',
        year: 2024,
        fuel_type: 'Xăng',
        transmission: 'Tự động',
        mileage: 11000,
        location: 'TP.HCM',
        description: 'Mazda CX-5 2024 – SUV cỡ C với thiết kế Kodo tinh tế, khung gầm SkyActiv và công nghệ an toàn i-Activsense.',
      },
      {
        name: 'VinFast VF 9',
        price: 1600000000,
        stock: 10,
        sold: 85,
        status: 'new',
        category_id: categories[3].id,
        brand: 'VinFast',
        year: 2024,
        fuel_type: 'Điện',
        transmission: 'Tự động',
        mileage: 8000,
        location: 'Hà Nội',
        description: 'VinFast VF 9 – SUV điện 7 chỗ cao cấp, tầm vận hành 580km, thiết kế thanh lịch, đầy đủ tiện nghi.',
      },
      {
        name: 'KIA Cerato 2024',
        price: 680000000,
        stock: 22,
        sold: 310,
        status: 'best_seller',
        category_id: categories[0].id,
        brand: 'KIA',
        year: 2024,
        fuel_type: 'Xăng',
        transmission: 'Tự động',
        mileage: 17000,
        location: 'Cần Thơ',
        description: 'KIA Cerato 2024 – Sedan phổ thông với thiết kế trẻ trung, nhiều trang bị tiện nghi, giá cả hợp lý.',
      },
    ];

    const createdProducts = [];
    for (const p of products) {
      const slug = toSlug(p.name);
      const product = await Product.create({ ...p, slug });
      createdProducts.push(product);
    }
    console.log('Products seeded');

    const unsplashCars = [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d9?w=800',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
      'https://images.unsplash.com/photo-1554744511-d6c603f27c54?w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
    ];

    const images = [];
    createdProducts.forEach((product, idx) => {
      const baseIdx = (idx * 3) % unsplashCars.length;
      images.push({
        product_id: product.id,
        image_url: unsplashCars[baseIdx % unsplashCars.length],
        is_primary: true,
        sort_order: 0,
      });
      images.push({
        product_id: product.id,
        image_url: unsplashCars[(baseIdx + 1) % unsplashCars.length],
        is_primary: false,
        sort_order: 1,
      });
      images.push({
        product_id: product.id,
        image_url: unsplashCars[(baseIdx + 2) % unsplashCars.length],
        is_primary: false,
        sort_order: 2,
      });
    });

    await ProductImage.bulkCreate(images);
    console.log('Product images seeded');

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

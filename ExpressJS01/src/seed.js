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
        price: 1220000000,
        original_price: 1370000000,
        stock: 15,
        sold: 230,
        status: 'best_seller',
        category_id: categories[0].id,
        brand: 'Toyota',
        year: 2024,
        fuel_type: 'Xăng',
        transmission: 'Tự động 8 cấp',
        mileage: 15000,
        location: 'Hà Nội',
        description: 'Toyota Camry 2024 – Dòng sedan hạng D cao cấp huyền thoại tại Việt Nam. Trang bị động cơ Dynamic Force 2.5L hút khí tự nhiên kết hợp hộp số tự động 8 cấp sản sinh công suất 207 mã lực cực kỳ êm ái và mạnh mẽ. Thiết kế ngoại thất thể thao lịch lãm với gói thiết kế mới, hệ thống đèn Full-LED sang trọng. Không gian nội thất vô cùng đẳng cấp bọc da cao cấp, trang bị cửa sổ trời, màn hình giải trí 9-inch kết nối Apple CarPlay không dây, điều hòa tự động 3 vùng độc lập, sạc không dây Qi và gói trang bị an toàn chủ động Toyota Safety Sense 2.5+ tiên tiến bậc nhất.',
      },
      {
        name: 'Honda CR-V 2024',
        price: 1109000000,
        original_price: 1159000000,
        stock: 12,
        sold: 180,
        status: 'new',
        category_id: categories[1].id,
        brand: 'Honda',
        year: 2024,
        fuel_type: 'Xăng',
        transmission: 'Tự động vô cấp CVT',
        mileage: 12000,
        location: 'TP.HCM',
        description: 'Honda CR-V 2024 thế hệ hoàn toàn mới – Dòng SUV 7 chỗ đa dụng được khách hàng Việt vô cùng ưa chuộng. Xe được trang bị động cơ tăng áp VTEC Turbo 1.5L mạnh mẽ sản sinh công suất 188 mã lực đi kèm hộp số biến thiên vô cấp CVT mượt mà và tiết kiệm nhiên liệu. Không gian cabin được tối ưu hóa tối đa mang lại sự rộng rãi cho cả 3 hàng ghế, trang bị màn hình cảm ứng trung tâm 9-inch sắc nét, sạc điện thoại không dây, cửa sổ trời Panorama toàn cảnh và hệ thống hỗ trợ lái xe an toàn tiên tiến Honda Sensing thế hệ mới.',
      },
      {
        name: 'BMW 530i M Sport',
        price: 2729000000,
        original_price: 3199000000,
        stock: 5,
        sold: 45,
        status: 'promotion',
        category_id: categories[0].id,
        brand: 'BMW',
        year: 2023,
        fuel_type: 'Xăng',
        transmission: 'Tự động Steptronic 8 cấp',
        mileage: 22000,
        location: 'Đà Nẵng',
        description: 'BMW 530i M Sport – Đại diện ưu tú của dòng sedan hạng sang thể thao cỡ trung từ Đức. Sở hữu động cơ xăng 2.0L TwinPower Turbo kết hợp cùng hộp số tự động Steptronic Sport 8 cấp thể thao sản sinh công suất lên tới 252 mã lực và mô-men xoắn 350 Nm, đem lại cảm giác lái phấn khích đặc trưng. Gói trang bị M Sport cao cấp bao gồm bộ bodykit thể thao hầm hố, vô lăng M Sport, cùm phanh hiệu năng cao M và hệ thống treo thích ứng M có thể điều chỉnh độ cứng mềm. Nội thất bọc da Dakota thượng hạng, trang bị âm thanh vòm Harman Kardon 16 loa công suất 600W và màn hình hiển thị kính lái HUD cao cấp.',
      },
      {
        name: 'Mercedes-Benz GLC 300',
        price: 2639000000,
        original_price: 2799000000,
        stock: 8,
        sold: 67,
        status: 'new',
        category_id: categories[1].id,
        brand: 'Mercedes',
        year: 2024,
        fuel_type: 'Xăng',
        transmission: 'Tự động 9 cấp 9G-TRONIC',
        mileage: 18000,
        location: 'TP.HCM',
        description: 'Mercedes-Benz GLC 300 4MATIC – Dòng SUV hạng sang cỡ trung bán chạy hàng đầu tại thị trường Việt Nam. Xe sử dụng khối động cơ 2.0L tăng áp kết hợp công nghệ EQ Boost Mild-Hybrid (48V) sản sinh tổng công suất 258 mã lực, đi cùng hộp số tự động 9 cấp mượt mà và hệ dẫn động 4 bánh toàn thời gian 4MATIC danh tiếng. Ngoại thất sở hữu gói trang bị AMG Line thể thao, hệ thống chiếu sáng thông minh Digital Light thông minh cao cấp nhất. Khoang nội thất ngập tràn công nghệ với màn hình cảm ứng trung tâm 11.9-inch siêu nét định vị MBUX thế hệ mới và dàn âm thanh vòm Burmester 3D 15 loa đỉnh cao.',
      },
      {
        name: 'Ford Ranger Wildtrak',
        price: 979000000,
        original_price: 1029000000,
        stock: 20,
        sold: 350,
        status: 'best_seller',
        category_id: categories[2].id,
        brand: 'Ford',
        year: 2023,
        fuel_type: 'Dầu Bi-Turbo',
        transmission: 'Tự động 10 cấp',
        mileage: 25000,
        location: 'Hà Nội',
        description: 'Ford Ranger Wildtrak – "Vua bán tải" không thể tranh cãi tại thị trường Việt Nam với thiết kế mạnh mẽ, cơ bắp và đa năng. Trái tim của Ranger Wildtrak là khối động cơ Diesel 2.0L Bi-Turbo cực kỳ bền bỉ sản sinh công suất 210 mã lực và mô-men xoắn cực đại 500 Nm, đi kèm hộp số tự động 10 cấp mượt mà và hệ dẫn động 2 cầu chủ động (4x4) giúp vượt mọi địa hình phức tạp. Cabin trang bị màn hình trung tâm đặt dọc 12-inch chạy hệ điều hành SYNC 4 hiện đại, bảng đồng hồ kỹ thuật số 8-inch, ghế da khâu chỉ cam Wildtrak cá tính và gói trang bị an toàn chủ động ADAS đầy đủ nhất phân khúc.',
      },
      {
        name: 'Hyundai Santa Fe 2024',
        price: 1199000000,
        original_price: 1369000000,
        stock: 18,
        sold: 150,
        status: 'promotion',
        category_id: categories[1].id,
        brand: 'Hyundai',
        year: 2024,
        fuel_type: 'Dầu Smartstream',
        transmission: 'Tự động ly hợp kép 8 cấp (8DCT)',
        mileage: 14000,
        location: 'Hải Phòng',
        description: 'Hyundai Santa Fe 2024 thế hệ hoàn toàn mới – Dòng SUV gia đình 7 chỗ thời thượng với ngôn ngữ thiết kế lột xác vuông vức, đột phá đậm chất việt dã sang trọng. Xe được trang bị động cơ dầu Smartstream D2.2 mạnh mẽ sản sinh công suất 202 mã lực kết hợp hộp số tự động ly hợp kép 8 cấp ướt (8DCT) cực kỳ nhạy bén và hệ dẫn động 4 bánh toàn thời gian HTRAC thông minh. Nội thất ngập tràn tiện nghi cao cấp như màn hình cong Panorama kép 12.3-inch, hệ thống hiển thị kính lái HUD, sạc không dây kép, điều hòa độc lập và hệ thống an toàn chủ động Hyundai SmartSense thế hệ mới nhất.',
      },
      {
        name: 'VinFast VF 8',
        price: 1090000000,
        original_price: 1290000000,
        stock: 25,
        sold: 420,
        status: 'best_seller',
        category_id: categories[3].id,
        brand: 'VinFast',
        year: 2023,
        fuel_type: 'Điện',
        transmission: 'Tự động 1 cấp',
        mileage: 13000,
        location: 'Đà Nẵng',
        description: 'VinFast VF 8 Plus – Mẫu SUV điện thông minh toàn cầu phân khúc D mang tính đột phá của Việt Nam. Trang bị hệ thống hai động cơ điện cho tổng công suất tối đa lên tới 402 mã lực và mô-men xoắn 620 Nm, kết hợp dẫn động 4 bánh toàn thời gian AWD mang lại khả năng tăng tốc ấn tượng từ 0-100 km/h chỉ trong 5.5 giây. Tầm vận hành sau mỗi lần sạc đầy lên tới hơn 400 km. Thiết kế được chắp bút bởi studio danh tiếng Pininfarina của Ý cực kỳ khí động học, cabin tối giản với màn hình trung tâm 15.6-inch tích hợp trợ lý ảo Vivi điều khiển bằng giọng nói tiếng Việt, gói hỗ trợ lái nâng cao ADAS Level 2+ với loạt tính năng tự hành tiên tiến.',
      },
      {
        name: 'Mazda CX-5 2024',
        price: 749000000,
        original_price: 829000000,
        stock: 14,
        sold: 200,
        status: 'normal',
        category_id: categories[1].id,
        brand: 'Mazda',
        year: 2024,
        fuel_type: 'Xăng SkyActiv-G',
        transmission: 'Tự động 6 cấp',
        mileage: 11000,
        location: 'TP.HCM',
        description: 'Mazda CX-5 2024 – Sự kết hợp hoàn hảo giữa nét tinh tế nghệ thuật và tính thực dụng tối đa của dòng SUV hạng C. Trang bị khối động cơ xăng SkyActiv-G 2.0L đi kèm hộp số tự động 6 cấp mượt mà, kết hợp hệ thống kiểm soát gia tốc thông minh GVC Plus giúp xe giữ thăng bằng và ổn định tối ưu khi vào cua. Ngôn ngữ thiết kế Kodo quyến rũ thời thượng, không gian cabin bọc da cao cấp vô cùng yên tĩnh và thư thái, trang bị hệ thống âm thanh vòm Bose 10 loa đỉnh cao, màn hình HUD sắc nét và gói công nghệ an toàn cao cấp i-Activsense tích hợp phanh thông minh chủ động.',
      },
      {
        name: 'VinFast VF 9',
        price: 1589000000,
        original_price: 1899000000,
        stock: 10,
        sold: 85,
        status: 'new',
        category_id: categories[3].id,
        brand: 'VinFast',
        year: 2024,
        fuel_type: 'Điện',
        transmission: 'Tự động 1 cấp',
        mileage: 8000,
        location: 'Hà Nội',
        description: 'VinFast VF 9 Plus – Dòng SUV điện 7 chỗ cỡ lớn hạng sang (phân khúc E), biểu tượng công nghệ và là flagship cao cấp nhất của VinFast. Sở hữu hệ dẫn động 2 cầu toàn thời gian AWD với hai động cơ điện cho công suất cực đại 402 mã lực, dung lượng pin cực lớn mang lại quãng đường di chuyển vượt trội lên đến 580 km sau mỗi lần sạc đầy. Nội thất rộng rãi được ví như khoang thương gia máy bay với tùy chọn hàng ghế thứ hai dạng ghế cơ trưởng tích hợp massage, sưởi và làm mát. Hệ thống treo khí nén thích ứng độc nhất mang lại trải nghiệm êm ái vượt bậc, tích hợp đầy đủ công nghệ ADAS tự hành và các dịch vụ thông minh Smart Services.',
      },
      {
        name: 'KIA Cerato 2024',
        price: 549000000,
        original_price: 619000000,
        stock: 22,
        sold: 310,
        status: 'best_seller',
        category_id: categories[0].id,
        brand: 'KIA',
        year: 2024,
        fuel_type: 'Xăng Gamma',
        transmission: 'Tự động 6 cấp',
        mileage: 17000,
        location: 'Cần Thơ',
        description: 'KIA K3 2024 (trước đây là Cerato) – Dòng sedan hạng C trẻ trung, thời thượng và cực kỳ được ưa chuộng bởi giới trẻ. Xe được trang bị khối động cơ xăng Gamma 1.6L MPI sản sinh công suất 126 mã lực, vận hành bền bỉ kết hợp hộp số tự động 6 cấp mượt mà, tối ưu hóa mức tiêu hao nhiên liệu. Thiết kế ngoại thất cực kỳ bắt mắt với dải đèn LED định vị nối liền, lưới tản nhiệt mũi hổ đặc trưng. Cabin ngập tràn công nghệ tiện nghi vượt tầm phân khúc như màn hình giải trí đa thông tin 10.25-inch sắc nét, sạc không dây Qi, cửa sổ trời chỉnh điện, sưởi và làm mát hàng ghế trước mang lại trải nghiệm vô cùng dễ chịu.',
      },
    ];

    const createdProducts = [];
    for (const p of products) {
      const slug = toSlug(p.name);
      const product = await Product.create({ ...p, slug });
      createdProducts.push(product);
    }
    console.log('Products seeded');

    const carImagesMap = {
      'Toyota Camry 2024': [
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
        'https://images.unsplash.com/photo-1631857455684-a54a2f03665f?w=800',
        'https://images.unsplash.com/photo-1623998021451-31d2ba355b62?w=800'
      ],
      'Honda CR-V 2024': [
        'https://images.unsplash.com/photo-1606016159991-dfe4f974be5c?w=800',
        'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
        'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800'
      ],
      'BMW 530i M Sport': [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
        'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
        'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800'
      ],
      'Mercedes-Benz GLC 300': [
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d9?w=800',
        'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800',
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800'
      ],
      'Ford Ranger Wildtrak': [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
        'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800'
      ],
      'Hyundai Santa Fe 2024': [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
        'https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?w=800',
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
      ],
      'VinFast VF 8': [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800',
        'https://images.unsplash.com/photo-1606016159991-dfe4f974be5c?w=800',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
      ],
      'Mazda CX-5 2024': [
        'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
        'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800',
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800'
      ],
      'VinFast VF 9': [
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
        'https://images.unsplash.com/photo-1518987184-963f191e7747?w=800'
      ],
      'KIA Cerato 2024': [
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
        'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800'
      ]
    };

    const images = [];
    createdProducts.forEach((product) => {
      const urls = carImagesMap[product.name] || [
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d9?w=800'
      ];
      images.push({
        product_id: product.id,
        image_url: urls[0],
        is_primary: true,
        sort_order: 0,
      });
      images.push({
        product_id: product.id,
        image_url: urls[1],
        is_primary: false,
        sort_order: 1,
      });
      images.push({
        product_id: product.id,
        image_url: urls[2],
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

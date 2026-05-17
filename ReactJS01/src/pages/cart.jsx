import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';
import QuantitySelector from '../components/product/QuantitySelector';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  return (
    <div className="luxury-page min-h-screen">
      <div className="luxury-container py-10">
        <h1 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-[#D4AF37] pl-4 mb-8">
          Giỏ Hàng Của Bạn
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-[#0f1218] border border-[#1e2430] p-12 text-center rounded">
            <svg className="w-16 h-16 mx-auto text-[#4b5563] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-[#c8cdd6] text-lg font-medium mb-2">Giỏ hàng trống</h2>
            <p className="text-[#8b95a5] text-sm mb-6">Bạn chưa chọn sản phẩm nào vào giỏ hàng.</p>
            <Link to="/inventory" className="luxury-btn-primary inline-flex">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="flex-1 space-y-6">
              <div className="bg-[#0f1218] border border-[#1e2430] rounded p-6">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#1e2430] text-[11px] font-bold tracking-[0.15em] text-[#8b95a5] uppercase mb-4">
                  <div className="col-span-6">Sản phẩm</div>
                  <div className="col-span-3 text-center">Số lượng</div>
                  <div className="col-span-3 text-right">Tạm tính</div>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b border-[#1e2430] last:border-0 last:pb-0">
                    <div className="col-span-1 md:col-span-6 flex gap-4">
                      <div className="w-24 h-24 bg-[#1a1f28] rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://placehold.co/400x300/1a1f28/8b95a5?text=No+Image' }}
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <Link to={`/product/${item.slug}`} className="text-[#c8cdd6] font-bold text-sm hover:text-[#D4AF37] transition-colors line-clamp-2 mb-1">
                          {item.name}
                        </Link>
                        <p className="text-[#D4AF37] text-sm font-semibold mb-2">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                        </p>
                        <button 
                          onClick={() => handleRemove(item.id)}
                          className="text-[#ef4444] text-[12px] hover:text-red-400 font-medium w-max"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-3 flex justify-start md:justify-center">
                      <QuantitySelector 
                        value={item.quantity} 
                        max={item.stock} 
                        onChange={(val) => handleUpdateQuantity(item.id, val)} 
                      />
                    </div>
                    
                    <div className="col-span-1 md:col-span-3 text-left md:text-right">
                      <span className="md:hidden text-[11px] font-bold tracking-[0.15em] text-[#8b95a5] uppercase mr-2">Tổng:</span>
                      <span className="text-[#c8cdd6] font-bold">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[350px]">
              <div className="bg-[#0f1218] border border-[#1e2430] rounded p-6 sticky top-24">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                  Tóm tắt đơn hàng
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#8b95a5] text-sm">
                    <span>Tạm tính ({cartItems.reduce((a, b) => a + b.quantity, 0)} sp)</span>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-[#8b95a5] text-sm">
                    <span>Giảm giá</span>
                    <span>0 đ</span>
                  </div>
                </div>
                
                <div className="border-t border-[#1e2430] pt-4 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-white font-bold text-sm">Tổng cộng</span>
                    <span className="text-[#D4AF37] font-bold text-xl">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#4b5563] text-right mt-1">(Đã bao gồm VAT nếu có)</p>
                </div>
                
                <button 
                  className="w-full luxury-btn-primary mb-3"
                  onClick={() => alert("Chức năng thanh toán đang được cập nhật!")}
                >
                  Tiến hành thanh toán
                </button>
                <Link to="/inventory" className="w-full luxury-btn-ghost text-center block">
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

import { ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function AddToCartButton({ product, className = "" }) {
  const { items, addToCart, updateQuantity, removeFromCart } = useCartStore();
  
  // Default to first variant
  const variant = product?.variants?.[0];
  if (!variant) return null;

  const cartItem = items.find((i) => i.variant.id === variant.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e) => {
    e.preventDefault(); // Prevent link navigation if inside a Link wrapper
    if (quantity === 0) {
      addToCart(product, variant, 1);
    } else {
      updateQuantity(variant.id, quantity + 1);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    if (quantity === 1) {
      removeFromCart(variant.id);
    } else if (quantity > 1) {
      updateQuantity(variant.id, quantity - 1);
    }
  };

  const baseClass = "bg-[#70BF4F] text-white rounded font-bold transition-colors flex items-center justify-center gap-2";
  const defaultClass = "w-full mt-4 py-2";
  const finalClass = className || defaultClass;

  if (quantity === 0) {
    return (
      <button 
        onClick={handleAdd}
        className={`${baseClass} hover:bg-[#5ca040] ${finalClass}`}
      >
        <ShoppingBag className="w-4 h-4" />
        Add to Cart
      </button>
    );
  }

  return (
    <div className={`bg-[#70BF4F] text-white rounded font-bold flex items-center justify-between px-4 ${finalClass}`}>
      <button 
        onClick={handleRemove} 
        className="p-1 hover:bg-[#5ca040] rounded transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="text-lg w-8 text-center">{quantity}</span>
      <button 
        onClick={handleAdd} 
        className="p-1 hover:bg-[#5ca040] rounded transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

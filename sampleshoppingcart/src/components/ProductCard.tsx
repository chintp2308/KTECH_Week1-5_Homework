import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import styles from "./ProductCard.module.css";
import { useCart } from "../../context/CartContext"; // hook đã tách đúng chuẩn

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const existingItem = cartItems.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState(existingItem?.quantity || 0);

  // Đồng bộ local state khi giỏ hàng thay đổi
  useEffect(() => {
    setQuantity(existingItem?.quantity || 0);
  }, [existingItem]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className={styles.productCard}>
      <p className={styles.productName}>{product.name}</p>
      <p className={styles.productPrice}>
        {product.price.toLocaleString("vi-VN")} ₫
      </p>
      <div className={styles.productQuantity}>
        {quantity === 0 ? (
          <button className={styles.addToCartBtn} onClick={handleAddToCart}>
            <span>+</span> Thêm vào giỏ hàng
          </button>
        ) : (
          <div className={styles.productQuantityContainer}>
            <button
              className={styles.productQuantityButton}
              onClick={handleDecrease}
            >
              -
            </button>
            <span className={styles.productQuantityNumber}>{quantity}</span>
            <button
              className={styles.productQuantityButton}
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

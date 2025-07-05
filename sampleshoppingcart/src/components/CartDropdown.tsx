import { useCart } from "../../context/CartContext";
import styles from "./CartDropdown.module.css";

export default function CartDropdown() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.dropdown}>
      {cartItems.map((item) => (
        <div key={item.id} className={styles.item}>
          <div className={styles.itemInfo}>
            <span className={styles.itemName}>{item.name}</span>
            <span>
              {item.quantity} x {item.price.toLocaleString("vi-VN")} ₫
            </span>
          </div>
          <button
            className={styles.removeBtn}
            onClick={() => removeFromCart(item.id)}
          >
            ❌
          </button>
        </div>
      ))}
      <hr />
      <div className={styles.total}>
        Tổng cộng: {total.toLocaleString("vi-VN")} ₫
      </div>
      <button className={styles.checkout}>Xem giỏ hàng</button>
    </div>
  );
}

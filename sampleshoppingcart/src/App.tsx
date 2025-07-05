import ProductGrid from "./components/ProductGrid";
// import CartIcon from "./components/CartIcon";
import { CartProvider } from "../context/CartProvider";

export default function App() {
  return (
    <CartProvider>
      <div style={{ padding: "20px" }}>
        <div>
          <h2>Big Market</h2>
        </div>
        <span>Thực phẩm khô</span>
        <ProductGrid />
      </div>
    </CartProvider>
  );
}

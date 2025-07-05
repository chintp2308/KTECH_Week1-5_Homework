import { products } from "../data/products";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";
import CartIcon from "./CartIcon";

const ProductGrid = () => {
  return (
    <>
      <CartIcon />
      <div className={styles.productGrid} style={{ zIndex: 0 }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid;

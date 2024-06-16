import { useEffect, useState } from "react";
import { ProductModel } from "../models/productModel";
import ProductCard from "../components/ProductCard";
import "./styles/landingPage.css";
function LandingPage() {
  const [allProducts, setAllProducts] = useState<ProductModel[]>([]);

  async function getAllProducts() {
    try {
      const response = await fetch(`http://localhost:8081/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setAllProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <main className="landingPage">
      <h1>Products</h1>

      {allProducts.length === 0 && <p>No products found</p>}

      <section className="products">
      {allProducts.length > 0 &&
        allProducts.map((product) => {
          return (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
              stock={product.stock}
            />
          );
        })}

      </section>

    </main>
  );
}

export default LandingPage;

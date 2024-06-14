import { useEffect, useState } from "react";
import { ProductModel } from "../models/productModel";
import ProductCard from "../components/ProductCard";

function LandingPage() {
  const [allProducts, setAllProducts] = useState<ProductModel[]>([]);

  async function getAllProducts() {
    const response = await fetch("/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setAllProducts(data);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      <section>
        {allProducts.map((product) => {
          const name = product.name;
          const price = product.price;
          const description = product.description;
          const imageUrl = product.imageUrl;
          const stock = product.stock;
          const id = product.id;

          return (
            <ProductCard
              key={id}
              id={id}
              name={name}
              price={price}
              description={description}
              imageUrl={imageUrl}
              stock={stock}
            />
          );
        })}
      </section>
      {allProducts.length === 0 && <p>No products found</p>}
    </div>
  );
}

export default LandingPage;

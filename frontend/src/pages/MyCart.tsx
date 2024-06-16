import { useEffect, useState } from "react";
import { ProductModel } from "../models/productModel";
import ProductCard from "../components/ProductCard";
import "./styles/cartPage.css"

function MyCart() {
  const [cartProducts, setCartProducts] = useState<ProductModel[]>();

  let userId = "666c5c4b85d16c3ba14f84f6";
  async function getCartProducts() {
    try {
      const response = await fetch(`http://localhost:8081/cart/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);

      setCartProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <main className="cart-page">
      <h1>My Cart</h1>
      <br />
      <br />

      {cartProducts && cartProducts.length === 0 && <p>No products in cart</p>}
      <section className="cart-products">
        {cartProducts &&
          cartProducts?.length > 0 &&
          cartProducts?.map((product) => {
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

export default MyCart;

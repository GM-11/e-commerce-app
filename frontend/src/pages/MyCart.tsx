import { useState } from "react";
import { ProductModel } from "../models/productModel";

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

  return (
    <div>
      <h1>My Cart</h1>
      <button onClick={getCartProducts}>Get Cart</button>

      {cartProducts && cartProducts.length === 0 && <p>No products in cart</p>}
      <section>
        {cartProducts && cartProducts?.length > 0 &&
          cartProducts?.map((product) => {
            return (
              <div key={product._id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: {product.price}/INR</p>
                <p>Stock: {product.stock}</p>
                <img src={product.imageUrl} alt="" />
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default MyCart;

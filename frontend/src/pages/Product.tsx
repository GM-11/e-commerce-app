import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductModel } from "../models/productModel";

function Product() {
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductModel>();
  async function getProduct() {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addToCart() {
    try {
      const response = await fetch(`http://localhost:3000/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "userId",
          productId: productId,
          quantity: 1,
        }),
      });
      const data = await response.json();

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, [productId]);
  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: {product.price}/INR</p>
      <p>Stock: {product.stock}</p>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default Product;

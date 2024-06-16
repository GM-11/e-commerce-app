import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductModel } from "../models/productModel";
import "./styles/product.css";

function Product() {
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductModel>();
  async function getProduct() {
    try {
      const response = await fetch(
        `http://localhost:8081/products/${productId}`,
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
      const response = await fetch(`http://localhost:8081/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "666c5c4b85d16c3ba14f84f6",
          productId: productId,
          quantity: 1,
        }),
      });
      const data = await response.json();
      console.log(data);

      // setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, [productId]);
  if (!product)
    return (
      <main>
        <p>Loading...</p>
      </main>
    );

  return (
    <main className="product-page">
      <section className="left">
        <div className="img">
          <img src={product.imageUrl} alt={product.name} />
        </div>
      </section>

      <section className="right">
        <h1>{product.name}</h1>
        <br />
        <p>{product.description}</p>
        <br />
        <section className="content">
          <p>PRICE: </p>
          <p>
            <strong>{product.price}</strong>
          </p>
        </section>
        <section className="content">
          <p>STOCK LEFT: </p>
          <p>{product.price}</p>
        </section>
        <br />
        <button onClick={addToCart}>Add to cart</button>
        <br />
        <button onClick={addToCart}>Buy now cart</button>
      </section>
    </main>
  );
}

export default Product;

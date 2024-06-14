import { Link } from "react-router-dom";
import "./styles/productCard.css";

type props = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
};

function ProductCard(props: props) {
  return (
    <Link to={`/product/${props.id}`}>
      <div className="productCard">
        <img src={props.imageUrl} alt={props.name} />
        <br />
        <p>{props.id}</p>
        <div className="content">
          <section className="info">
            <h2>{props.name}</h2>
            <p className="price">
              Price: <strong>{props.price}</strong>/INR
            </p>
          </section>
          <section className="info">
            <p>Stock Left</p>
            <p>{props.stock}</p>
          </section>
          <br />
          <p>{props.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;

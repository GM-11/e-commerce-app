type props = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
};

function ProductCard(props: props) {
  return <div>
    <h2>{props.name}</h2>
    <p>{props.price}</p>
    <p>{props.description}</p>
    <img src={props.imageUrl} alt={props.name} />
    <p>{props.stock}</p>
  </div>;
}

export default ProductCard;

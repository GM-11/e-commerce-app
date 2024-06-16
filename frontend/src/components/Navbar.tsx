import "./styles/navbar.css"
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav>
      <section>
        <h1>Marketplace</h1>
      </section>
      <section>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>{" "}
          </li>
          <li>
            <Link to={"/my-cart"}>My Cart</Link>{" "}
          </li>      
        </ul>
      </section>
    </nav>
  );
}

export default Navbar;

import "./navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav>
      <section>
        <h1>Navbar</h1>
      </section>
      <section>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>{" "}
          </li>
          <li>
            <Link to={"/my-cart"}>My Cart</Link>{" "}
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>{" "}
          </li>
        </ul>
      </section>
    </nav>
  );
}

export default Navbar;

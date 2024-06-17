import { useState } from "react";
import "./styles/signUp.css";

function SignUp() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function signUp() {
    if (isLogin) {
      // login
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
    } else {
      // sign up
      const response = await fetch("http://localhost:8081/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      console.log(data);
    }
  }

  if (isLogin) {
    return (
      <main className="sign-up">
        <br />
        <br />
        <h1>Sign Up</h1>
        <br />
        <br />
        <div className="form">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br />
          <button onClick={signUp}>Sign Up</button>
          <br />
          <p>
            Already have an account?{" "}
            <span onClick={() => setIsLogin(false)}>Log In</span>
          </p>
        </div>
      </main>
    );
  } else {
    return (
      <main className="sign-up">
        <br />
        <br />
        <h1>Log In</h1>
        <br />
        <br />
        <div className="form">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br />
          <button onClick={signUp}>Log In</button>
          <br />
          <p>
            Don't have an account?{" "}
            <span onClick={() => setIsLogin(true)}>Sign Up</span>
          </p>
        </div>
      </main>
    );
  }
}

export default SignUp;

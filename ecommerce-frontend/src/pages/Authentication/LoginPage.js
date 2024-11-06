import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import "./LoginPage.css";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [biznesiEmri, setBiznesiEmri] = useState("");
  const [biznesiEmriLoading, setBiznesiEmriLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const userDetails = localStorage.getItem("userDetails");
  useEffect(() => {
    if (userDetails) {
      navigate("/already-logged-in");
    }
  }, [userDetails, navigate]);

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7061/api/TeDhenatBiznesit/getTeDhenat")
        .then((response) => {
          setBiznesiEmri(response.data.emriBiznesit);
          setBiznesiEmriLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7061/api/Authentication/login",
        { email: email, password: password }
      );

      const token = response.data; //.accessToken;
      // const refreshToken = response.data.refreshToken;

      localStorage.setItem("accessToken", token);
      // localStorage.setItem("refreshToken", refreshToken);

      const decodedToken = jwtDecode(token);

      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          userId: decodedToken.nameid,
          username: decodedToken.sub,
          email: decodedToken.email,
          roles: decodedToken.role || [],
        })
      );

      // console.log(
      //   "Detajet e userit i cili eshte logged in:" +
      //     JSON.stringify({
      //       userId: decodedToken.nameid,
      //       username: decodedToken.sub,
      //       email: decodedToken.email,
      //       roles: decodedToken.role || [],
      //     })
      // );

      navigate("/ProfilePage");
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data);
        console.log(error.response.data);
      } else {
        console.error("An unexpected error occurred! :", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = (email) => {
    setError("");
    setEmail(email);
  };

  const handlePassword = (pass) => {
    setError("");
    setPassword(pass);
  };
  return (
    <div className="logInContainer">
      <div className="logInForm">
        <Form onSubmit={login}>
          <div className="form-header">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div>
                {biznesiEmriLoading ? (
                  <div className="loading" style={{ padding: "5px" }}>
                    <TailSpin
                      height="40"
                      width="40"
                      color="#322b9c"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                ) : (
                  <>{biznesiEmri}</>
                )}
              </div>
            </Link>
            Log In to Your Account
          </div>
          <Form.Group className="mb-3 logIn-input" controlId="crudForm.email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => handleEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="example@gmail.com"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3 logIn-input"
            controlId="crudForm.Passwordi"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => handlePassword(e.target.value)}
              value={password}
              type="password"
              required
            />
          </Form.Group>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button} className="login-btn">
            {loading ? <div className="spinner"></div> : "Login"}
          </button>
          <p className="log-in-text">
            Don't have an account?
            <Link to="/SignUp">Sign Up</Link>
          </p>
        </Form>
        <div className="welcome-back-section">
          <h1>Welcome Back</h1>
          <p>Unlock your personalized shopping experience by signing in</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  button: {
    padding: "10px",
    fontWeight:"bold",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#333",
    color: "#fff",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  spinner: {
    marginLeft: "10px",
    border: "2px solid #f3f3f3",
    borderTop: "2px solid #3498db",
    borderRadius: "50%",
    width: "12px",
    height: "12px",
    animation: "spin 1s linear infinite",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

export default LoginPage;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import "./LoginPage.css";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [biznesiEmri, setBiznesiEmri] = useState("");
  const [biznesiEmriLoading, setBiznesiEmriLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const signUp = async (e) => {
    e.preventDefault();

    if (!passwordError) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://localhost:7061/api/Authentication/register",
          {
            username: username,
            email: email,
            password: password,
          }
        );

        if (response.status === 200) {
          toast.success(response.data);
          navigate("/LogIn");
        }
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
    }
  };

  const handleUsername = (name) => {
    setError("");
    setUsername(name);
  };

  const handlePassword = (pass) => {
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    setPassword(pass);
    if (!passwordPattern.test(pass)) {
      setPasswordError(
        "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 6 characters long."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleEmail = (em) => {
    setError("");
    setEmail(em);
  };
  return (
    <div className="logInContainer">
      <div className="logInForm">
        <div className="sign-up-section">
          <h1>New here?</h1>
          <p>
            Create an account to enjoy exclusive deals, faster
            checkout, and personalized recommendations.
          </p>
        </div>
        <Form onSubmit={signUp}>
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
            Create Your Account
          </div>
          <Form.Group
            className="mb-3 logIn-input"
            controlId="crudForm.username"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(e) => handleUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Your username"
              autoFocus
              required
            />
          </Form.Group>
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
            <Form.Text className="signup-custom-center">
              {passwordError}
            </Form.Text>
          </Form.Group>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            {loading ? <div className="spinner"></div> : "Sign Up"}
          </button>
          <p className="log-in-text">
            Already have an Account?
            <Link to="/LogIn">Log In</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

const styles = {
  button: {
    padding: "10px",
    borderRadius: "5px",
    fontWeight:"bold",
    border: "none",
    letterSpacing:"1px",
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

export default SignUp;

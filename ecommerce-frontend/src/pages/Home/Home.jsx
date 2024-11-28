import React, { useState } from "react";
import "./Home.css";
import HomeCarousel from "./HomeCarousel";
import Icons from "./Icons";
import Footer from "./Footer";
// import TrendingItems  from './TrendingItems';
import ProductsSection from "../../components/ProductComponents/ProductsSection";
import SideNav from "./SideNav/SideNav";
import axios from "axios";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { Grid, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const [meTeShiturat, setMeTeShiturat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7061/api/Produkti/shfaq4MeTeShiturat"
        );
        // .then((response) => {
        setMeTeShiturat(response.data);
        setLoading(false);
        // });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="homepage">
        <SideNav />
        <div className="home">
          <HomeCarousel />
          <Icons />
          <hr/>
          <Box   
          >     
            <Box sx={{padding:"15% 0"}}>
              <Typography 
              sx={{
                fontSize: {
                  xs: "1rem", 
                  sm: "1.5rem",
                  md: "2rem", 
                  lg: "4rem",
                },
                fontWeight: "bold", 
                background: "linear-gradient(90deg, #6a11cb 0%,  #655cdb 100%)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent", 

              }}
              >
                Everything you can think of , all in one place
              </Typography>
              <div style={{margin:"0 auto",width:"50%"}}>
                <Typography
                 sx={{
                  fontSize: {
                    xs: "1rem", 
                    sm: "1rem",
                    md: "1.5rem", 
                    lg: "3rem"},
                    marginTop:"30px",
                    fontWeight:"bold",
                    color:" #221f1f"

                  }}
                >
                  From beauty and fashion , to the latest tech products on the market, we offer it all 
                </Typography>
              </div>
            </Box>
          </Box>
          <Grid container alignItems="center" sx={{backgroundColor:"#f9f9f9"}}>
            <Grid item xs={12} md={6}>
              <Box>
                <Box p={6}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                    className="homepage-title"
                  >
                    Why Choose Us?
                  </Typography>
                  <Typography variant="body1" className="homepage-paragraph">
                    We’re committed to redefining your shopping experience. With
                    our unbeatable prices, top-notch customer service, and a
                    seamless shopping journey tailored to your needs, we stand
                    out as the ultimate destination for all your needs.
                  </Typography>
                  <Grid container justifyContent="center">
                    <Button
                      sx={{
                        width: "200px",
                        fontSize: {
                          xs: "0.5rem", // Small screens
                          sm: "0.5rem", // Medium screens
                          md: "1rem", // Large screens
                          lg: "1.5rem", // Extra-large screens
                        },
                        color: "white",
                        backgroundColor: "#7069d2",
                        padding: "10px",
                        marginTop: "3%",
                        "&:hover": {
                          backgroundColor: "#5a51b3",
                        },
                      }}
                    >
                      <Link
                        to="/SignUp"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Sign Up
                      </Link>
                    </Button>
                  </Grid>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <img
                  src="/images/ecommerce_homepage_img.jpg"
                  alt="Ecommerce Homepage"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <section className="features-section">
            <div className="feature-container">
              <div className="feature">
                <div className="feature-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Quality Products</h3>
                <p>
                  We carefully select our products to ensure the highest
                  quality. Shop with confidence, knowing that you're getting the
                  best.
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h3>Fast Shipping</h3>
                <p>
                  Enjoy quick and reliable shipping on all your orders. We make
                  sure to deliver right to your doorstep, so you can shop
                  stress-free
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <h3>Customer Support</h3>
                <p>
                  Our customer support team is here to help you with any
                  questions or concerns. Efficient Service is our priority!
                </p>
              </div>
            </div>
          </section>
          <h1 className="loved" style={{ paddingTop: "40px" }}>
            Popular on Our Store{" "}
          </h1>
          <div className="row" style={{ padding: "5%" }}>
            {loading ? (
              <div className="loading">
                <TailSpin
                  height="80"
                  width="80"
                  color="#322b9c"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              <>
                <div className="productsInHome">
                  {meTeShiturat.map((item) => (
                    <div
                      className="productNeHome"
                      key={item.product.produkti_ID}
                    >
                      <ProductsSection
                        id={item.product.produkti_ID}
                        img={"/images/" + item.product.fotoProduktit}
                        name={item.product.emriProdukti}
                        cmimi={parseFloat(item.product.cmimiPerCope).toFixed(2)}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;

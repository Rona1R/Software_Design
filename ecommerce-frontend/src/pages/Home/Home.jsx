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
          <section className="intro-section">
            <div className="intro-container">
              <div className="u-shape-bg">
                <h2 className="home-h2">Welcome to Our Shop</h2>
                <p className="home-p">
                  Discover the best products at unbeatable prices. This is your
                  one-stop destination for the latest and greatest in tech,
                  fashion, and more. Start shopping today and find something you
                  love!
                </p>
              </div>
            </div>
          </section>
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
          <h1 className="loved">Popular on Our Store </h1>
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

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/ProductComponents/Styles/ProductsDetails.css";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import ProductPopUp from "../components/ProductComponents/ProductPopUp";
import { useEffect } from "react";
import Footer from "./Home/Footer";
import { useCart } from "../context/CartProvider";
import BreadcrumbComponent from "../components/Additional/BreadcrumbComponent";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import SideNav from "./Home/SideNav/SideNav";
import RemoveProduktet from "components/DashboardComponents/CRUD/WishlistCRUD/RemoveProduktet";
import ShtoProduktet from "components/DashboardComponents/CRUD/WishlistCRUD/ShtoProduktet";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AttributesTab from "components/ProductComponents/AttributesTab";
import Reviews from "components/Review/ReviewsByProduct/Reviews";
import { Carousel } from "react-bootstrap";

const ProductDetails = () => {
  const { productID } = useParams();
  const [selectedTab, setSelectedTab] = useState("additionalInformation");
  const navigate = useNavigate();
  const [foundProduct, setFoundProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [sasia, setSasia] = useState(1);
  const [addedToWishlist, setAddedToWishlist] = useState(false); // kur tbohet funksionale kjo pjese ka me kqyr nese useri osht logged in , edhe a e ka produktin me ket id ne wishliste , direkt prej ktu ma mujt edhe me hek ose me shtu
  const [showPopUp, setShowPopUp] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState("");
  const [stockWarning, setStockWarning] = useState(false);
  const [productRating, setProductRating] = useState(0);
  // const [userId, setUserId] = useState(null);
  const [wishlistItemId, setWishlistItemId] = useState(null);
  const loggedUser = JSON.parse(localStorage.getItem("userDetails"));
  const [index, setIndex] = useState(0);
  const { state, dispatch } = useCart();
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  // useEffect(() => {
  //   if (loggedUser) {
  //     setUserId(parseInt(loggedUser.userId));
  //   }
  // }, [loggedUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (productID) {
        try {
          const response = await axios.get(
            `https://localhost:7061/api/Produkti/shfaqDetajetProduktit/${productID}`
          );

          setFoundProduct(response.data);
          setProductRating(response.data.rating);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log(error.response.status);
            navigate("/error");
          } else {
            console.log(error);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [productID, refreshKey, navigate]);

  useEffect(() => {
    try {
      if (loggedUser) {
        axios
          .get(
            `https://localhost:7061/api/WishlistItems/NdodhetNeWishlist/${productID}/${loggedUser.userId}`
          )
          .then((response) => {
            if (response.data.exists) {
              setAddedToWishlist(true);
              setWishlistItemId(response.data.ndodhetNeWishliste.itemId);
            } else {
              setAddedToWishlist(false);
              // setWishlistItemId(null);
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  }, [productID, addedToWishlist]);

  useEffect(() => {
    if (showPopUp) {
      const timer = setTimeout(() => {
        setShowPopUp(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPopUp]);

  useEffect(() => {
    if (stockWarning) {
      const timer = setTimeout(() => {
        setStockWarning(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [stockWarning]);

  const handleAddToCart = () => {
    const cmimiProduktit = foundProduct.cmimiMeZbritje
      ? foundProduct.cmimiMeZbritje
      : foundProduct.cost;
    const product = {
      id: foundProduct.id,
      name: foundProduct.name,
      img: foundProduct.img,
      cmimi: cmimiProduktit * sasia,
      sasia: sasia,
      cmimiBaze: cmimiProduktit,
      //   sasiaNeStok: foundProduct.stock,
    };
    const ekzistonNeShporte = state.cartItems.find(
      (item) => item.id === product.id
    );
    if (ekzistonNeShporte) {
      setAddedToCart(false);
      setShowPopUp(true);
      setErrorMessage("This product already exists in cart!");
      return;
    }
    console.log(
      "produkti per tu vendosur ne shporte : " + JSON.stringify(product)
    );
    dispatch({ type: "ADD_TO_CART", payload: product });
    setAddedToCart(true);

    setShowPopUp(true);
  };

  const toggleDescription = () => {
    setShowMore(!showMore);
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const zvogeloSasine = () => {
    setSasia(sasia - 1);
  };

  const rritSasine = () => {
    let sasiaVendosur = sasia;
    if (foundProduct.stock >= (sasiaVendosur += 1)) {
      setSasia(sasia + 1);
    } else {
      setStockWarning(true);
    }
  };

  const wishlistToggle = async () => {
    if(!loggedUser){
      // if not authenticated redirect !
      navigate("/LogIn");
      return;
    }

    try {
      const wishlistItem = {
        IdKlienti: loggedUser.userId,
        Produkti_ID: foundProduct.id, // Use foundProduct.id instead of id
      };
      if (!addedToWishlist) {
        await ShtoProduktet(wishlistItem);
        setAddedToWishlist(true);
      } else {
        await RemoveProduktet(wishlistItemId);
        setAddedToWishlist(false);
      }
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
    }
  };
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (foundProduct) {
    return (
      <>
        <SideNav />
        <div className="details-background">
          {addedToCart ? (
            <ProductPopUp
              show={showPopUp}
              onHide={() => setShowPopUp(false)}
              notificationType="Product was successfully added to cart"
              actionLink="View your cart items"
              redirect="/Cart"
              noLink="false"
            />
          ) : (
            <ProductPopUp
              show={showPopUp}
              onHide={() => setShowPopUp(false)}
              notificationType={errorMessage}
              error="True"
            />
          )}

          {stockWarning && (
            <ProductPopUp
              show={stockWarning}
              onHide={() => setStockWarning(false)}
              notificationType={"Stock is limited for this product !"}
              error="True"
            />
          )}

          <div className="BreadcrumbContainer" style={{ marginTop: "20px" }}>
            <BreadcrumbComponent
              path={[
                {
                  pageType: "category",
                  emri: foundProduct.category,
                  id: [foundProduct.categoryId],
                },
                {
                  pageType: "subcategory",
                  emri: foundProduct.subcategory,
                  id: [foundProduct.categoryId, foundProduct.subcategoryId],
                },
                {
                  pageType: "produkti",
                  emri: foundProduct.name,
                  id: [foundProduct.id],
                },
              ]}
            />
          </div>
          {loading ? (
            <div className="loading productsPageLoader">
              <TailSpin
                height="260"
                width="120"
                color="#322b9c"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <div className="product-details-container">
              <div className="products-details-box">
                <Carousel
                activeIndex={index} onSelect={handleSelect}
                interval={null}
                >
                  <Carousel.Item className="carousel-item">
                    <div className="product-image">
                      <img
                        src={"/images/" + foundProduct.img}
                        alt={foundProduct.name}
                      />
                    </div>
                  </Carousel.Item>
                  <Carousel.Item className="carousel-item">
                    <div className="product-image">
                      <img
                        src={"/images/" + foundProduct.img}
                        alt={foundProduct.name}
                      />
                    </div>
                  </Carousel.Item>
                  <Carousel.Item className="carousel-item">
                    <div className="product-image">
                      <img
                        src={"/images/" + foundProduct.img}
                        alt={foundProduct.name}
                      />
                    </div>
                  </Carousel.Item>
                </Carousel>

                <div className="product-info">
                  <div className="d-flex flex-column h-100 justify-content-between align-items-center">
                    <div>
                      <h2 style={{ color: "#333" }}>{foundProduct.name}</h2>
                    </div>
                    {/* <div className="d-flex flex-column align-items-center"> */}
                    <div className="attr-container">
                      <p id="productCode">Product code: {foundProduct.id}</p>
                      <p id="productCategory">
                        Category: {foundProduct.category}
                      </p>
                    </div>
                    <div className="description-container">
                      <p
                        className={`description ${showMore ? "show-more" : ""}`}
                      >
                        {showMore
                          ? foundProduct.description
                          : typeof foundProduct.description === "string" &&
                            foundProduct.description.length > 150
                          ? typeof foundProduct.description === "string" &&
                            `${foundProduct.description.slice(0, 150)} ...`
                          : typeof foundProduct.description === "string" &&
                            foundProduct.description}
                      </p>
                      {typeof foundProduct.description === "string" &&
                        foundProduct.description.length > 150 && (
                          <button
                            onClick={toggleDescription}
                            className="toggle-button productsButton"
                            style={{ backgroundColor: "inherit" }}
                          >
                            {showMore ? (
                              <span>
                                Show less <FontAwesomeIcon icon={faCaretUp} />
                              </span>
                            ) : (
                              <span>
                                Show more <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            )}
                          </button>
                        )}
                    </div>

                    <div>
                      {foundProduct.cmimiMeZbritje ? (
                        <p id="price">
                          Price: {formatPrice(foundProduct.cmimiMeZbritje)} €
                        </p>
                      ) : (
                        <p id="price">Price: {foundProduct.cost} €</p>
                      )}
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-outline-primary product-details  product-details-sasia"
                          onClick={zvogeloSasine}
                          disabled={sasia === 1}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="sasiaEProdutktit">{sasia}</span>
                        <button
                          type="button"
                          className="btn btn-outline-primary product-details product-details-sasia"
                          onClick={rritSasine}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                      <button
                        type="button"
                        disabled={!foundProduct.stock}
                        className="btn btn-primary ml-3 product-details productButton"
                        id="add-to-cart"
                        onClick={() => {
                          handleAddToCart();
                        }}
                      >
                        {foundProduct.stock ? "Add to Cart" : "Out of Stock"}{" "}
                        <FontAwesomeIcon icon={faShoppingBag} />
                      </button>
                      <button
                        type="button"
                        id="bookmark"
                        className="tooltip-button"
                        onClick={wishlistToggle}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          id="save-icon"
                          className={addedToWishlist ? "wishlist-active" : ""}
                        />
                        <span className="tooltip-text">
                          {addedToWishlist
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div style={{ borderTop: "2px solid #322b9c", marginTop: "20px" }}>
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              sx={{
                "& .MuiTab-root": {
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "large",
                  "&.Mui-selected": {
                    color: "#322b9c",
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#322b9c",
                },
                "& .MuiTabs-flexContainer": {
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  paddingTop: "10px",
                },
              }}
            >
              <Tab
                value="additionalInformation"
                label="Additional Information"
              />
              <Tab value="reviews" label="Reviews" />
            </Tabs>
            {selectedTab === "reviews" && (
              <Reviews
                productID={foundProduct.id}
                productRating={productRating}
                refreshProductRating={() => setRefreshKey(Date.now())}
              />
            )}
            {selectedTab === "additionalInformation" && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* E SHTUUUUUUAR */}
                <div
                  // style={{
                  //   width: "300px",
                  //   padding:"60px 0px",

                  // }}
                  className="atributes-table-container"
                >
                  <AttributesTab id={foundProduct.id} />
                </div>
              </div>
            )}
            <Footer />
          </div>
        </div>
      </>
    );
  } else {
    return <p>Error 404: This page was not found.</p>;
  }
};

export default ProductDetails;

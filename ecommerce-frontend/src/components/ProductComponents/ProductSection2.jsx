import React, { useState } from "react";
import "./Styles/ProductSection2.css";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import "bootstrap/dist/css/bootstrap.min.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { Button } from "react-bootstrap";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ShtoProduktet from "components/DashboardComponents/CRUD/WishlistCRUD/ShtoProduktet";
import { useEffect } from "react";
import axios from "axios";
import RemoveProduktet from "components/DashboardComponents/CRUD/WishlistCRUD/RemoveProduktet";
import ProductPopUp from "./ProductPopUp";

export default function ProductSection2({
  id,
  image,
  name,
  category,
  company,
  cmimiMeZbritje,
  companyId,
  categoryId,
  cmimi,
  rating,
  stoku,
  children,
  AddToCart,
  // toggleWishlist,
  subcategory,
  subcategoryId,
}) {
  // const [userId, setUserId] = useState(null);
  // const userId = null;

  const [showInfo, setShowInfo] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false); // kur tbohet funksionale kjo pjese ka me kqyr nese useri osht logged in , edhe a e ka produktin me ket id ne wishliste , direkt prej ktu ma mujt edhe me hek ose me shtu
  const [wishlistItemId, setWishlistItemId] = useState(null);
  const [showAddedUp, setShowAddedUp] = useState(false);
  const [showRemovedPopUp, setShowRemovedPopUp] = useState(false);

  const loggedUser = JSON.parse(localStorage.getItem("userDetails"));
  // useEffect(() => {
  //   if (loggedUser) {
  //     setUserId(parseInt(loggedUser.userId));
  //   }
  // }, [loggedUser]);

  useEffect(() => {
    try {
      if (loggedUser.userId) {
        axios
          .get(
            `https://localhost:7061/api/WishlistItems/NdodhetNeWishlist/${id}/${loggedUser.userId}`
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
  }, [id, loggedUser.userId, addedToWishlist]);

  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  const handleAddToCart = () => {
    AddToCart(id);
  };

  const toggleWishlist = async () => {
    try {
      const wishlistItem = {
        IdKlienti:loggedUser.userId,
        Produkti_ID: id,
      };
      if (!addedToWishlist) {
        await ShtoProduktet(wishlistItem);
        setShowAddedUp(true);
        setAddedToWishlist(true);

        //    setAddedToWishlist(true); // Toggle wishlist state
      } else {
        await RemoveProduktet(wishlistItemId);
        setShowRemovedPopUp(true);
        setAddedToWishlist(false);
        //       setAddedToWishlist(false);
      }
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
      // Optionally: Display an error message to the user
    }
  };

  const addHoverEffect = () => {
    setHovered(true);
  };

  const removeHoverEffect = () => {
    setHovered(false);
  };

  useEffect(() => {
    if (showAddedUp) {
      const timer = setTimeout(() => {
        setShowAddedUp(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showAddedUp]);

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  useEffect(() => {
    if (showRemovedPopUp) {
      const timer = setTimeout(() => {
        setShowRemovedPopUp(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showRemovedPopUp]);

  return (
    <div
      className="productCardContainer"
      onMouseEnter={addHoverEffect}
      onMouseLeave={removeHoverEffect}
    >
      {showAddedUp && (
        <ProductPopUp
          show={showAddedUp}
          onHide={() => setShowAddedUp(false)}
          notificationType="Product was added to Wishlist!"
          actionLink="View your wishlist items"
          redirect="/Wishlist"
          noLink="false"
        />
      )}

      {showRemovedPopUp && (
        <ProductPopUp
          show={showRemovedPopUp}
          onHide={() => setShowRemovedPopUp(false)}
          notificationType="Product was removed from Wishlist!"
        />
      )}

      <ImageListItem
        style={{ width: "400px", height: "300px" }}
        className="productsCard card2"
      >
        <Link to={/*!stoku ? null : */`/ProductDetails/${id}`}>
          <img
            srcSet={`/images/${image}`}
            src={`${name}?w=248&fit=crop&auto=format`}
            alt={category}
            loading="lazy"
            style={{
              objectFit: "cover",
              pointerEvents: stoku ? "auto" : "none",
            }}
          />
          {stoku === 0 && <div className="outOfStockOverlay" />}
          {/*stoku !== 0 &&*/ hovered && (
            <div className="productHoveredOverlay">
              <div className="productHoveredOverlayText">See more details</div>
            </div>
          )}
        </Link>
        {cmimiMeZbritje != null && (
          <div className="zbritjaBadge">
            <p className="">
              -{" "}
              {cmimiMeZbritje != null &&
                (((cmimi - cmimiMeZbritje) / cmimi) * 100).toFixed(0)}{" "}
              %
            </p>
          </div>
        )}
        <ImageListItemBar
          className="imagelistitem"
          title={
            <span>
              <Link
                to={/*!stoku ? null :*/ `/ProductDetails/${id}`}
                className="ProductLink"
                id="produktLink"
              >
                {name}
              </Link>
              {cmimiMeZbritje ? (
                <>
                  <span id="paZbritje">{cmimi} €</span>
                  <span id="meZbritje">{formatPrice(cmimiMeZbritje)} €</span>
                </>
              ) : (
                <span id="cmimi">{cmimi} €</span>
              )}
            </span>
          }
          subtitle={
            company ? (
              <>
                <Link
                  to={`/Products/Company/${companyId}`}
                  className="ProductLink"
                  id="companyLink"
                >
                  {company}
                </Link>
                {subcategory ? (
                  <Link
                    to={`/Products/Category/${categoryId}/SubCategory/${subcategoryId}`}
                    className="ProductLink"
                    id="categoryLink"
                  >
                    <span></span> / {subcategory}
                  </Link>
                ) : (
                  <Link
                    to={`/Products/Category/${categoryId}`}
                    className="ProductLink"
                    id="categoryLink"
                  >
                    <span></span> / {category}
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to={`/Products/Category/${categoryId}`}
                  className="ProductLink"
                  id="categoryLink"
                >
                  {category}
                </Link>
                <Link
                  to={`/Products/Category/${categoryId}/SubCategory/${subcategoryId}`}
                  className="ProductLink"
                  id="categoryLink"
                >
                  <span></span> / {subcategory}
                </Link>
              </>
            )
          }
          actionIcon={
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip">
                  <span>{children}</span>
                </Tooltip>
              }
              show={showInfo}
            >
              <Link to={/*!stoku ? null : */`/ProductDetails/${id}`}>
                <IconButton
                  className="infoButton"
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={name}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ pointerEvents:"auto"}}
                >
                  <InfoIcon />
                </IconButton>
              </Link>
            </OverlayTrigger>
          }
        />
      </ImageListItem>
      <div className="generalInfo">
        <div className="infoUpper">
          <Rating
            value={rating}
            readOnly
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#665DDB",
              },
            }}
          />
          <div>
            <Button
              className="saveButoni"
              // disabled={!stoku}
              onClick={toggleWishlist}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                className={addedToWishlist ? "addedToWishlist" : "defaultStyle"}
              />
            </Button>
          </div>
        </div>

        <div className="infoLower">
          <Button
            className="cartButoni"
            disabled={!stoku}
            onClick={handleAddToCart}
          >
            {stoku ? "Add to cart" : "Out of Stock"}
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ paddingLeft: "6px" }}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

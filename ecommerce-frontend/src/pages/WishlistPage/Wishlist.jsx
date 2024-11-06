import React from 'react';
import { Link } from 'react-router-dom';
import WishlistDetails from '../../components/WishlistFolder/WishlistDetails';
import './Wishlist.css'; // Import Wishlist CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import { useEffect } from 'react';
import ProductPopUp from '../../components/ProductComponents/ProductPopUp';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Home/Footer';
import BreadcrumbComponent from '../../components/Additional/BreadcrumbComponent';
import SideNav from 'pages/Home/SideNav/SideNav';

const Wishlist = () => {
    const [removedFromWishlist,setRemovedFromWishlist] = useState(false);
    const [removedPopUp,setRemovedPopUp] = useState(false);
    const [userId,setUserId] = useState(null);
    
    const loggedUser = JSON.parse(localStorage.getItem('userDetails'));
    useEffect(()=>{
      if(loggedUser)
      {
        setUserId(parseInt(loggedUser.userId));
      }
    },[loggedUser])
    // const userId =  null;

    useEffect(() => {
        if (removedPopUp) {
          const timer = setTimeout(() => {
            setRemovedPopUp(false);
          }, 1200); 
          return () => clearTimeout(timer);
        }
      }, [removedPopUp]);



    const handleRemoveFromWishlist = (productId) => {
        // Logic to remove product from wishlist 
       setRemovedFromWishlist(true);

        // nese shkaku i ndonje errori nuk mund te behet remove from Wishlist:
       // setRemovedFromWishlist(false);
        setRemovedPopUp(true);
    };

    return (
        <>
           {removedPopUp && (
                <ProductPopUp
                    show={removedPopUp}
                    onHide={() => setRemovedPopUp(false)}
                    notificationType={removedFromWishlist ? "Product was removed from wishlist" : "Product couldn't be removed"}
                />
            )}

        <SideNav />
        {/* <Header/>
        <NavBar/> */}
        <div className="wishlist-container">
    
          <div className="wishlist-header"  style={{backgroundColor:"#f0f0f0",color:"#333",display:"flex",justifyContent:"center",alignItems:"center"}}>
              <span>
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '5px' }} />    
               Your Wishlist
              </span>
              <div className="link"
              style={{backgroundColor:"#f0f0f0",display:"flex",justifyContent:"center"}}
              >
              <Link
                  to="/Cart"
                  style={{
                      textDecoration: "none",
                      color: "white",
                      display: "inline-block",
                      padding: "10px 20px",
                      background: "#333",
                      borderRadius: "5px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "background-color 0.3s",
                  }}
                  >
                  <FontAwesomeIcon icon={faShoppingBag} style={{paddingRight:"10px",color:" #9b95f3"}}/> 
                  Go to your Shopping Cart
              </Link>
           
              </div>
          </div>

          <div className="BreadcrumbContainer" style={{paddingTop:"10px"}}>
            <BreadcrumbComponent
              path={[{ pageType: "Wishlist",emri:"Wishlist"}]}
            />
          </div>
  
          <div
            className="wishlist-item-wrapper"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="wishlist-item">
              <WishlistDetails
                 userId={userId}
                onRemove={handleRemoveFromWishlist}
              />
            </div>
          </div>
  
  
          <div
            className="action-buttons"
            style={{ display: "flex", justifyContent: "center" ,backgroundColor:"#f0f0f0",margin:'0',padding:'5%'}}
          >
            <button className="continue-shopping">
              <Link to="/" className="continue-shopping" style={{textDecoration:"none"}}>
                Vazhdo blerjen
              </Link>
            </button>
          </div>
        </div>
         <Footer/>
      </>
        
    );
}

export default Wishlist;

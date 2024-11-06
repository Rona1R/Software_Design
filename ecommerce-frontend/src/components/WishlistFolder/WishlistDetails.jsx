import React from 'react';
import { Link } from 'react-router-dom';
import './WishlistDetails.css'; 
import GetWishlistbyUserId from '../DashboardComponents/CRUD/WishlistCRUD/GetWishlistbyUserId';
import RemoveProduktet from '../DashboardComponents/CRUD/WishlistCRUD/RemoveProduktet';
import { TailSpin } from 'react-loader-spinner';
import { useEffect,useState } from 'react';
//import "../../api/axiosConfig";

const WishlistDetails = ({ userId, onRemove }) => {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        async function fetchWishlist() {
            // if(!userId){
            //     setLoading(false);
            //     return;
            // }
            // setLoading(true); 
            try {
              if(userId !=null){

                  const wishlistData = await GetWishlistbyUserId(userId);
                  console.log('Fetched wishlist data:', wishlistData);
                  
                  if (wishlistData && Array.isArray(wishlistData.produkti)) {
                      setWishlistProducts(wishlistData.produkti);
                    } else {
                        console.error('Unexpected data format:', wishlistData);
                        setWishlistProducts([]);
                    }
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
                setWishlistProducts([]);
            } finally {
                setLoading(false); 
            }
        }

        fetchWishlist();
    }, [userId]);

    async function handleRemove(id) {
        try {
            await RemoveProduktet(id);  

            setWishlistProducts(prevProducts => 
                prevProducts.filter(product => product.wishlistItemId !== id)
            );
    
            if (onRemove) onRemove();  
        } catch (error) {
            console.error('Error removing item:', error);
        }
    }

    return (
        <div className="product-container">
          {
            loading?  
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
            :(
                wishlistProducts.length > 0 ? (
                    wishlistProducts.map(product => (
                        product && product.produkti_ID ? (
                            <div className="wishlist-card" key={product.produkti_ID} style={{ width: "350px", padding: "0px" }}>
                                <Link to={`/ProductDetails/${product.produkti_ID}`}>
                                    <img src={"/images/"+product.fotoProduktit} alt={product.EmriProdukti || "Product Image"} className="wishlist-img" style={{ height: "320px" }} />
                                </Link>
                                <div className="wishlist-details">
                                    <h3 className="wishlist-title">{product.emriProdukti || "Product Name"}</h3>
                                    {/* <p className="wishlist-description">{product.pershkrimiProduktit || "No description available"}</p> */}
                                    <p className="wishlist-price">{product.cmimiPerCope || "N/A"} €</p>
                                    <button className="removeButton" onClick={() => handleRemove(product.wishlistItemId)}>Remove</button>
                                </div>
                            </div>
                        ) : null
                    ))
                ) : (
                    <div className="emptyCart">
                        <p>No products in the wishlist.</p>
                    </div>
                )
            )
          }
        </div>
    );
}

export default WishlistDetails;

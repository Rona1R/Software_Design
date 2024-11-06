/*import axios from "axios";


export function ShtoProduktet(wishlistItem) {
    return axios.post(`https://localhost:7061/api/WishlistItems/Add-Wishlist-and-Products`, wishlistItem)
        .then(response => response.data)
        .catch(error => {
            throw new Error('Failed to add item to wishlist');
        });
}

export default ShtoProduktet;*/
import axios from "axios";

export function ShtoProduktet(wishlistItem) {
  return axios.post(`https://localhost:7061/api/WishlistItems/Add-Wishlist-and-Products`, wishlistItem)
    .then(response => response.data)
    .catch(error => {
      console.error('Failed to add item to wishlist:', error);
      throw error; // Ensure error is propagated
    });
}

export default ShtoProduktet;

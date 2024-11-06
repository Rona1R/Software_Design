/*import axios from "axios";

export function RemoveProduktet(id) {
    return axios.delete(`https://localhost:7061/api/WishlistItems/Remove-Wishlist-Products/${id}`)
        .catch(error => {
            throw new Error('Failed to remove item from wishlist');
        });
}

export default RemoveProduktet;*/
/*import axios from "axios";

export function RemoveProduktet(id) {
    return axios.delete(`https://localhost:7061/api/WishlistItems/Remove-Wishlist-Products/${id}`)
    
        .then(response => {
            if (response.status === 204) {
                console.log(`Successfully removed item with ID: ${id}`);
            }
            return response;
       
        })
        .catch(error => {
            console.error('Error removing item from wishlist:', error.response ? error.response.data : error.message);
            throw new Error('Failed to remove item from wishlist');
        });
}

export default RemoveProduktet;*/
/*import axios from "axios";

export function RemoveProduktet(id) {
    axios.delete(`https://localhost:7061/api/WishlistItems/Remove-Wishlist-Products/${id}`)
        .then(response => {
            if (response.status === 204) {
                console.log(`Successfully removed item with ID: ${id}`);
            }
            return response;
        })
        .catch(error => {
            console.error('Error removing item from wishlist:', error.response ? error.response.data : error.message);
            throw new Error('Failed to remove item from wishlist');
        });
}

export default RemoveProduktet;
*/
/*import axios from "axios";

export async function RemoveProduktet(id) {
    try {
        const response = await axios.delete(`https://localhost:7061/api/WishlistItems/Remove-Wishlist-Products/${id}`);
        if (response.status === 204) {
            console.log(`Successfully removed item with ID: ${id}`);
        }
        return response;
    } catch (error) {
        console.error('Error removing item from wishlist:', error.response ? error.response.data : error.message);
        throw new Error('Failed to remove item from wishlist');
    }
}

export default RemoveProduktet;*/
import axios from "axios";

export async function RemoveProduktet(id) {
    try {
        const response = await axios.delete(`https://localhost:7061/api/WishlistItems/Remove-Wishlist-Products/${id}`)
        // .then((response)=>{
            if (response.status === 204) {
                console.log(`Successfully removed item with ID: ${id}`);
            }
        // })
    } catch (error) {
        console.log(error);
    }
}

export default RemoveProduktet;



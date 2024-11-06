/*import axios from 'axios';

export function GetWishlistbyUserId(userId) {
    return axios.get(`https://localhost:7061/api/WishlistItems/Get-Wishlist-by-UserId/${userId}`)
        .then(response => {
            console.log('API Response:', response.data); // Add this line
            return response.data;
        })
        .catch(error => {
            throw new Error('Failed to fetch wishlist');
        });
    }
//${API_BASE_URL}/WishlistItems/Get-Wishlist-by-UserId/${userId}

export default GetWishlistbyUserId;*/
/*import axios from 'axios';

export function GetWishlistbyUserId(userId) {
    return axios.get(`https://localhost:7061/api/WishlistItems/Get-Wishlist-by-UserId/${userId}`)
        .then(response => {
            console.log('API Response:', response.data); // Inspect this in the console
            // Assuming the API returns the products directly or needs adjustment based on structure
            return response.data; 
        })
        .catch(error => {
            console.error('Failed to fetch wishlist:', error);
            throw new Error('Failed to fetch wishlist');
        });
}

export default GetWishlistbyUserId;*/
/*
import axios from 'axios';

export function GetWishlistbyUserId(userId) {
    return axios.get(`https://localhost:7061/api/WishlistItems/Get-Wishlist-by-UserId/${userId}`)
        .then(response => {
            console.log('API Response:', response.data); 

            return response.data;
        })
        .catch(error => {
            console.error('Failed to fetch wishlist:', error);
            throw new Error('Failed to fetch wishlist');
        });
}

export default GetWishlistbyUserId;*/
import axios from 'axios';

export function GetWishlistbyUserId(userId) {
    return axios.get(`https://localhost:7061/api/WishlistItems/Get-Wishlist-by-UserId/${userId}`)
        .then(response => {
            console.log('API Response:', response.data); 
            return response.data;
        })
        .catch(error => {
            console.error('Failed to fetch wishlist:', error);
            throw new Error('Failed to fetch wishlist');
        });
}

export default GetWishlistbyUserId;


import axios from 'axios';
//import '../../api/axiosConfig';


 const API_URL = 'https://localhost:7061/api/User'; // Base URL for API

 

 export const fetchUserDetails = async (userId) => {
    console.log("USER DETAILS FETCHED !!")
    try {
        const response = await axios.get(`${API_URL}/User-Details/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user details:', error);
        throw error;
    }
};

export const updateUsername = async (userId, newUsername) => {
    try {
        const response = await axios.put(`${API_URL}/Update-Username/${userId}`, JSON.stringify(newUsername), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Failed to update username:', error);
        if (error.response && error.response.status === 400) {
            return { status: 400, error: error.response.data };
        }
        throw error;
    }
};

export const updateEmail = async (userId, newEmail) => {
    try {
        const response = await axios.put(`${API_URL}/Update-Email/${userId}`, JSON.stringify(newEmail), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error('Failed to update email:', error);
        if (error.response && error.response.status === 400) {
            return { status: 400, error:error.response.data };
        }
        throw error;
    }
};

export const updatePassword = async (userId, newPassword) => {
    try {
        const response = await axios.put(`${API_URL}/Update-Password/${userId}`, newPassword, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update password:', error);
        if (error.response && error.response.status === 400) {
            return { status: 400, error:error.response.data };
        }
        throw error;
    }
};

export const verifyOldPassword = async (userId, oldPassword) => {
    try {
        const response = await axios.post(`${API_URL}/Verify-Old-Password/${userId}`, oldPassword, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.isValid; // Use the response from the backend
    } catch (error) {
        console.error('Failed to verify old password:', error);
        return false;
    }
};
 

export const updatePhoneNumber = async (userId, newPhoneNumber) => {
    try {
        const response = await axios.put(`${API_URL}/Update-PhoneNumber/${userId}`,{
            newPhoneNumber: newPhoneNumber
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return { status: 400, error:error.response.data };
        }
        throw error;
    }
};

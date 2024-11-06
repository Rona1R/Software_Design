import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const AlreadyLoggedIn = () => {
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem('userDetails'));
    const username = loggedInUser? loggedInUser.username:null;

    useEffect(()=>{
        if(!loggedInUser){
            navigate('/');
        }
    },[])

    const handleLogOut = async () => {
       // const refreshToken = localStorage.getItem('refreshToken');
        try {
          const response = await axios.post("https://localhost:7061/api/Authentication/logout", {
           /* refreshToken: refreshToken,*/
          });
          if (response.status === 200) {
            localStorage.removeItem("accessToken");
          //  localStorage.removeItem("refreshToken");
            localStorage.removeItem("userDetails");
            navigate('/');
          }
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Session Active</h1>
            <p style={styles.paragraph}>
                You are currently logged in as <strong>{username}</strong>.
            </p>
            <p style={styles.paragraph}>
                To sign in as a different user, please log out first.
            </p>
            <button onClick={handleLogOut} style={styles.button}>
                Log Out
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f2f2f2',
        textAlign: 'center',
    },
    header: {
        color: '#333',
        marginBottom: '20px',
    },
    paragraph: {
        fontSize: '16px',
        color: '#555',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        marginTop: '20px',
        transition: 'background-color 0.3s ease',
    },
}
export default AlreadyLoggedIn;



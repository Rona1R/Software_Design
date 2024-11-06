import React from 'react';

const AccessDenied = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Access Denied</h1>
            <p style={styles.message}>You do not have permission to view this page.</p>
            <button style={styles.button} onClick={() =>( window.location.href = "/")}>Go Back To Homepage</button>
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
    },
    header: {
        color: '#ff6347',
        fontSize: '2rem',
    },
    message: {
        color: '#666',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#ff6347',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default AccessDenied;

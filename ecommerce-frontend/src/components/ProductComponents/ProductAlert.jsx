import React from "react";
import Alert from 'react-bootstrap/Alert';

const ProductAlert =({AlertDescription})=>{
    return(
        <Alert variant="secondary" style={{backgroundColor:"#f0f0f0",padding:"5px",color:"rgb(139, 0, 0)",fontWeight:"bold",marginBottom:"0",textAlign:"center",marginRight:"4px"}}>
            {AlertDescription}
      </Alert>
    );
};

export default ProductAlert;
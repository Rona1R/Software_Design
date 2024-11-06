import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Styles/ProductsStyle.css'

const ProductsSection = ({id,img,cmimi,name}) => {
  return (
    <Link to={`/ProductDetails/${id}`} style={{textDecoration:"none"}}>    
        <div className="card center-card-items productsCard">
            <div style={{height:"420px"}}>
                <img src={img} className="card-img-top" alt={name}  style={{height:"100%",objectFit:"cover",padding:"0px",width:"100%"}} />
            </div>
            <div className="card-body" style={{ backgroundColor: 'white', color: 'black' }}>
                <div className='center-text'>
                 <h5 className="card-title" style={{padding:"20px"}}
                 >{name}</h5>
                </div>
                <div className='price-ribbon'>
                    <p className='card-cmimi'>{cmimi} €</p>
                </div>
                
            </div>
       </div>
    </Link>
);
}

export default ProductsSection;
import React from "react";
import "./Styles/ProductsStyle.css"
import Dropdown from "react-bootstrap/Dropdown";
const ProductsSort =(props)=>{
    const selectSort=(sortOrder)=>{
        props.handleSortFunc(sortOrder);
    };

    return(
        <Dropdown id="SortBy-DropDown">
            <Dropdown.Toggle>
                <span style={{color:"white"}}><b>Sort By:</b> {props.sortBy === 'asc'? `Price,low to high`:`Price,high to low`}</span>
                </Dropdown.Toggle>
         
                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>selectSort('asc')}>Price, low to high</Dropdown.Item>
                    <Dropdown.Item onClick={()=>selectSort('desc')}>Price, high to low</Dropdown.Item>
                </Dropdown.Menu>
      </Dropdown>
    );

};

export default ProductsSort;
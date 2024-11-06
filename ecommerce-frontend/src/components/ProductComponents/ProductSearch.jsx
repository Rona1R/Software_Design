import React from 'react';
import './Styles/ProductSearch.css'
import {Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ProductSearch = ({searchTerm, setSearchTerm,className,handleSearchResults}) => {

    return (
        <div className={`ml-3 ${className}`} id="search">
            <Form>
                <FormControl
                    type="text"
                    id = "searchProduct"
                    placeholder="Search Product"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value);
                                }
                            }
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault(); 
                            handleSearchResults();
                            }
                    }}
            />
            </Form>  
            <button onClick= {handleSearchResults}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} id="magnifying-glass"/>
            </button>
        </div>
    );
};

export default ProductSearch;


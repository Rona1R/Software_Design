import React from "react";
import { Collapse } from "react-bootstrap";
import "./Styles/productSidebar.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import Slider from "@mui/material/Slider";
import Accordion from 'react-bootstrap/Accordion';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        thumb: {
          color: "#665DDB",
        },
        rail: {
          backgroundColor: "#665DDB",
        },
        track: {
          backgroundColor: "#665DDB",
        },
      },
    },
  },
});

const ProductSidebar = ({
  title,
  categories,
  subcategories,
  isOpen,
  setIsOpen,
  companies,
  maxPrice,
  applyFilters,
  resetFiltersFunc,
  // registerResetFunc,
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCompanies,setSelectedCompanies] = useState([]);
  const [selectedSubCategories , setSelectedSubCategories]  = useState([]);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const sidebarRef = useRef(null);

  const getSubCategoriesByCategory = (categoryId) => {
    const category = categories.find(
      (category) => category.categoryId === categoryId
    );

    if (!category) return [];

    const subCategories = category.subCategory.map(({ subCategoryName }) => ({
      subCategoryName,
    }));

    return subCategories;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const handleSubCategoryChange = (subCategory) => {
    if(selectedSubCategories.includes(subCategory)){
      setSelectedSubCategories(
        selectedSubCategories.filter((sub)=> sub !== subCategory)
      );
    }else{
      setSelectedSubCategories([...selectedSubCategories,subCategory])
    }

    console.log("SelctedSubcategories "+selectedSubCategories);
  }

  const handleCompanyChange =(company)=>{
    if(selectedCompanies.includes(company)){
      setSelectedCompanies(
        selectedCompanies.filter((comp)=> comp !== company)
      );
    }else{
      setSelectedCompanies([...selectedCompanies,company])
    }
  }

  const handlePriceRangeChange = (e, newValue) => {
    setPriceRange(newValue);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedCompanies([]);
    setSelectedSubCategories([]);
    setPriceRange([0, maxPrice]);
    resetFiltersFunc();
  };

  // const resetChildState =()=>{
  //   setSelectedCategories([]);
  //   setSelectedCompanies([]);
  //   setSelectedSubCategories([]);
  //   setPriceRange([0, maxPrice]);
  // }

  // useEffect(() => {
  //   if (registerResetFunc) {
  //     registerResetFunc(resetChildState);
  //   }
  // }, [registerResetFunc]);

  const handleApplyFilters = () => {
    if(categories){
      applyFilters(selectedCategories, priceRange);
    }
    else if(companies){
      applyFilters(selectedCompanies,priceRange);
    }
    else{
      applyFilters(selectedSubCategories,priceRange);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div ref={sidebarRef} className={`sidebarProducts ${isOpen ? "open" : ""}`}>
      <button
        className="toggle-button-x"
        onClick={() => setIsOpen(!isOpen)}
        id="close-sidebar"
      >
        <FontAwesomeIcon icon={faXmark} style={{ fontSize: "24px" }} />
      </button>
      <div className="sidebar-content-container">
        <Collapse in={isOpen} className="sidebar-content">
          <div>
            <div className="sidebar-element">
              <h5 id="sidebar-title">Apply Filters</h5>
            </div>
            <div className="category-list sidebar-element">
              <h5>{title}</h5>
              <hr></hr>
              { categories && 
              <Accordion defaultActiveKey="0"  alwaysOpen className="sidebar-accordion"> 
              {categories.map((category,index) => (
                <div key={index}>
                  <Accordion.Item eventKey={`${category.categoryId}`}>
                  <Accordion.Header>
                  {/* <div className="categoryDropdown" style={{ color: "white" }}> */}
                    <div key={category.categoryId} className="category">

                      {category.categoryName}
                      
                    </div>
                  {/* </div> */}
                  </Accordion.Header>
                  <Accordion.Body>

                  <div className="checkbox-wrapper">
                    <div className="checkbox-items-container">
                      {getSubCategoriesByCategory(category.categoryId).map(
                        (subCategory, index) => (
                          <div key={index} className="categoriesInput">
                            <input
                              type="checkbox"
                              className="checkbox-input"
                              id={`category-${category.categoryId}-${index}`}
                              name="category"
                              value={subCategory.subCategoryName}
                              checked={selectedCategories.includes(
                                subCategory.subCategoryName
                              )}
                              onChange={() =>
                                handleCategoryChange(
                                  subCategory.subCategoryName
                                )
                              }
                              />
                            <label htmlFor={`category-${category.categoryId}-${index}`}>
                              <span className="checkmark"></span>
                              <span className="subcategory sub">
                              {subCategory.subCategoryName}
                              </span>
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  </Accordion.Body>
                  </Accordion.Item>
                </div>
              ))}
              </Accordion>
              }

              {
                companies && (
                  
                  <div className="checkbox-wrapper company">
                  <div className="checkbox-items-container">
                    {companies.map(
                      (company, index) => (
                        <div key={index} className="companyInput">
                          <input
                            type="checkbox"
                            className="checkbox-input"
                            id={`category-${index}`}
                            name="category"
                            value={company.name}
                            checked={selectedCompanies.includes(
                              company.name
                            )}
                            onChange={() =>
                              handleCompanyChange(
                                company.name
                              )
                            }
                            />
                          <label htmlFor={`category-${index}`}>
                            <span className="checkmark"></span>
                            <span className="companyName">
                            {company.name}
                            </span>
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                  )
              }

              {
                subcategories && (
                      
                      <div className="checkbox-wrapper company">
                      <div className="checkbox-items-container">
                        {subcategories.map(
                          (subCategory, index) => (
                            <div key={index} className="companyInput">
                              <input
                                type="checkbox"
                                className="checkbox-input"
                                id={`category-${index}`}
                                name="category"
                                value={subCategory.subCategoryName}
                                checked={selectedSubCategories.includes(
                                  subCategory.subCategoryName
                                )}
                                onChange={() =>
                                  handleSubCategoryChange(
                                    subCategory.subCategoryName
                                  )
                                }
                                />
                              <label htmlFor={`category-${index}`}>
                                <span className="checkmark"></span>
                                <span className="subCategoryName" style = {{color:"darkgrey"}}>
                                {subCategory.subCategoryName}
                                </span>
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                )
              }
              <hr></hr>
            </div>

            <div>
              <div className="sidebar-element price-range-elem">
                <h5>Price range ( € ):</h5>

                <div className="range-wrapper">
                  <ThemeProvider theme={theme}>
                    <Slider
                      style={{ width: "70%" }}
                      getAriaLabel={() => "Price range"}
                      value={priceRange}
                      onChange={handlePriceRangeChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={maxPrice}
                      // getAriaValueText={valuetext}
                    />
                  </ThemeProvider>
                </div>
              </div>
            </div>
            <div className="reset-apply-buttons">
              <button
                className="btn btn-primary btn-sm  productButton"
                onClick={handleApplyFilters}
                id="applyFilters"
              >
                Apply Filters
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={resetFilters}
                id="reset"
                style={{
                  marginLeft: "0px",
                  marginRight: "0px",
                  color: "#ccc",
                  backgroundColor: "#333",
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default ProductSidebar;

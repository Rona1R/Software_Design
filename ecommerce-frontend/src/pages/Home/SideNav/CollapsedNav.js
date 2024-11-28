import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./CollapsedNav.css";
import { Link } from "react-router-dom";

const CollapsedNav = ({ categories, companies, handleClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const goBackToCategories = () => {
    setSelectedCategory(null);
  };

  const goBackToCompanies = () => {
    setSelectedCompany(null);
  };

  return (
    <>
      (
      <div className="collapsed-nav">
        {selectedCategory === null && selectedCompany === null ? (
          <>
            <div className="subcategory-item">
              <Link
                to="/Products/OnSale"
                onClick={handleClose}
                className="sale-btn collapsed-nav-link"
              >
                Shop on Sale
              </Link>
            </div>

            <div className="category-list">
              <h3>Shop by Category</h3>
              {categories.map((category) => (
                <div key={category.categoryId} className="category-item">
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="category-btn"
                  >
                    {category.categoryName}
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              ))}
            </div>

            <div className="category-list">
              <h3>Shop by Company</h3>
              {companies.map((company) => (
                <div key={company.id} className="category-item">
                  <button
                    onClick={() => handleCompanyClick(company)}
                    className="category-btn"
                  >
                    {company.emri}
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {selectedCategory && (
              <div className="subcategory-list">
                <button onClick={goBackToCategories} className="back-btn">
                  <FontAwesomeIcon icon={faChevronLeft} />
                  Back to Categories
                </button>
                <div className="subcategories">
                  <h3>{selectedCategory.categoryName}</h3>
                  <div className="subcategory-item">   
                      <Link
                        to={`/Products/Category/${selectedCategory.categoryId}`}
                        className="subcategory-btn collapsed-nav-link"
                        onClick={handleClose}
                      >
                        View all items
                      </Link>             
                  </div>
                  {selectedCategory.subCategory.length > 0 ? (
                    selectedCategory.subCategory.map((sub) => (
                      <div key={sub.subcategoryId} className="subcategory-item">               
                          <Link
                            to={`/Products/Category/${selectedCategory.categoryId}/SubCategory/${sub.subcategoryId}`}
                            className="subcategory-btn collapsed-nav-link"
                            onClick={handleClose}
                          >
                            {sub.subCategoryName}
                          </Link>  
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "white" }}>No subcategories</p>
                  )}
                </div>
              </div>
            )}

            {selectedCompany && (
              <div className="subcategory-list">
                <button onClick={goBackToCompanies} className="back-btn">
                  <FontAwesomeIcon icon={faChevronLeft} />
                  Back to Companies
                </button>
                <div className="subcategories">
                  <h3>{selectedCompany.emri}</h3>
                  <div className="subcategory-item">
                    <Link
                      to={`/Products/Company/${selectedCompany.id}`}
                      onClick={handleClose}
                      className="subcategory-btn collapsed-nav-link"
                    >
                      View all items
                    </Link>
                  </div>
                  {selectedCompany.companyCategories.length > 0 ? (
                    selectedCompany.companyCategories.map((category) => (
                      <div
                        key={category.categoryId}
                        className="subcategory-item"
                      >
                        <Link
                          to={`/Products/Company/${selectedCompany.id}/Category/${category.categoryId}`}
                          onClick={handleClose}
                          className="subcategory-btn collapsed-nav-link"
                        >
                          {category.categoryName}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "white" }}>
                      No categories for this company
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      )
    </>
  );
};

export default CollapsedNav;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "./DesktopNav.css";

const DesktopNav = ({kategoriteNenkategorite,kompaniteKategorite}) => {
  const [categoriesHovered,setCategoriesHovered] = useState(false);
  const [companiesHovered,setCompaniesHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedCompany(null);
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setSelectedCategory(null);
  };

  const goBackToCategories = () => {
    setSelectedCategory(null);
  };

  const goBackToCompanies = () => {
    setSelectedCompany(null);
  };


  return (
    <div className="desktop-nav">
      <div className="desktop-dropdown">
        <button className="desktop-dropdown-btn"
           onMouseEnter={() => setCategoriesHovered(true)}
           onMouseLeave={() => setCategoriesHovered(false)}
        >
          Categories <FontAwesomeIcon icon={categoriesHovered?faChevronUp:faChevronDown} style={{paddingLeft:"5px"}}/>
        </button>
        <div className="desktop-dropdown-content"
             onMouseEnter={() => setCategoriesHovered(true)}
             onMouseLeave={() => setCategoriesHovered(false)}
        >
          {selectedCategory === null && (
            <>
              {kategoriteNenkategorite.map((category) => (
                <div key={category.categoryId} className="desktop-dropdown-item">
                  <button onClick={() => handleCategoryClick(category)}>
                    {category.categoryName}
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              ))}
            </>
          )}

          {selectedCategory &&  (
            <div className="desktop-subcategory-list">
              <button onClick={goBackToCategories} className="desktop-back-btn">
                <FontAwesomeIcon icon={faChevronLeft} /> Back to Categories
              </button>
              <div className="desktop-subcategory-items">
                <h3>{selectedCategory.categoryName}</h3>
                <div className="desktop-dropdown-item">
                      <Link
                        to={`/Products/Category/${selectedCategory.categoryId}`}
                        className="desktop-subcategory-btn"
                      >
                      View all items
                      </Link>
                </div>
                {selectedCategory.subCategory.length > 0 ? (
                  selectedCategory.subCategory.map((sub) => (
                    <div key={sub.subcategoryId} className="desktop-dropdown-item">
                      <Link
                        to={`/Products/Category/${selectedCategory.categoryId}/SubCategory/${sub.subcategoryId}`}
                        className="desktop-subcategory-btn"
                      >
                        {sub.subCategoryName}
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>No subcategories</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="desktop-dropdown">
        <button className="desktop-dropdown-btn"
          onMouseEnter={() => setCompaniesHovered(true)}
          onMouseLeave={() => setCompaniesHovered(false)}
        >Companies <FontAwesomeIcon icon={companiesHovered? faChevronUp:faChevronDown} style={{paddingLeft:"5px"}}/>
       </button>
        <div className="desktop-dropdown-content"
         onMouseEnter={() => setCompaniesHovered(true)}
         onMouseLeave={() => setCompaniesHovered(false)}
        >
          {selectedCompany === null && (
            <>
              {kompaniteKategorite.map((company) => (
                <div key={company.id} className="desktop-dropdown-item">
                  <button onClick={() => handleCompanyClick(company)}>
                    {company.name}
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              ))}
            </>
          )}

          {selectedCompany &&  (
            <div className="desktop-subcategory-list">
              <button onClick={goBackToCompanies} className="desktop-back-btn">
                <FontAwesomeIcon icon={faChevronLeft} /> Back to Companies
              </button>
              <div className="desktop-subcategory-items">
                <h3>{selectedCompany.name}</h3>
                <div className="desktop-dropdown-item">
                      <Link
                        to={`/Products/Company/${selectedCompany.id}`}
                        className="desktop-subcategory-btn"
                      >
                        View all items
                      </Link>
                  </div>
                {selectedCompany.companyCategories.length > 0 ? (
                  selectedCompany.companyCategories.map((category) => (
                    <div key={category.categoryId} className="desktop-dropdown-item">
                      <Link
                        to={`/Products/Company/${selectedCompany.id}/Category/${category.categoryId}`}
                        className="desktop-subcategory-btn"
                      >
                        {category.categoryName}
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>No categories for this company</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="desktop-dropdown">
        <Link to="/Products/OnSale" className="desktop-dropdown-btn desktop-link">
          Shop on Sale
        </Link>
      </div>
    </div>
  );
};

export default DesktopNav;

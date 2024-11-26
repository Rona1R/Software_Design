import React, { useState } from "react";
import "../../components/ProductComponents/Styles/ProductsStyle.css";
import ProductSearch from "../../components/ProductComponents/ProductSearch";
import ProductSidebar from "../../components/ProductComponents/ProductSidebar";
import ProductsSort from "../../components/ProductComponents/ProductsSort";
import Footer from "../Home/Footer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductSection2 from "../../components/ProductComponents/ProductSection2";
import { useCart } from "../../context/CartProvider";
import ProductPopUp from "../../components/ProductComponents/ProductPopUp";
import BreadcrumbComponent from "../../components/Additional/BreadcrumbComponent";
import TuneIcon from "@mui/icons-material/Tune";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import SideNav from "pages/Home/SideNav/SideNav";
import { useNavigate } from "react-router-dom";


const CompanyCategory = () => {
  const { companyId, categoryId } = useParams();
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProductName, setSearchedProductName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtersAppliedCount, setFiltersAppliedCount] = useState(0);
  const [sortBy, setSortBy] = useState("asc"); // by default produktet me qene te rradhitura ne ascending order
  const [subCategories, setSubCategories] = useState([]);
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filters,setFilters] = useState({
    selectedSubCategories :[],
    priceRange:[],
    searchTerm:"" 
  })


  useEffect(() => {
    setSortBy("asc");
    setCurrentPage(1);
    filtersReset();
  }, [companyId, categoryId]);

  useEffect(()=>{
    const fetchData = async () => {
      if (categoryId && companyId) {
        try{
          const response = await axios.get(
            `https://localhost:7061/api/Kompania/getSidebarDataPerKompanineKategorine/${companyId}/${categoryId}`
          );

          setSubCategories(response.data.subcategories);
          setMaxPrice(response.data.maxPrice);
        }catch(err){
          console.log(err);
        }
      }
    };
  
    fetchData();
  },[categoryId,companyId])


  useEffect(() => {
    const fetchData = async () => {
      if (categoryId && companyId) {
        try {
          const response = await axios.post(
            `https://localhost:7061/api/Kompania/shfaqProduktetSipasKompaniseDheKategorise/${companyId}/${categoryId}/${sortBy}/${currentPage}/${productsPerPage}`
            , filters
          );
          const { teDhenat, totalCount } = response.data;
          setCurrentCategory(teDhenat);
          setTotalProducts(totalCount);
          setLoading(false);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log(error.response.status);
            navigate("/error");
          } else {
            console.log(error);
          }
        }
      }
    };
  
    fetchData();
  }, [categoryId, companyId, sortBy, currentPage, productsPerPage,filters,navigate]);
  

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  console.log("All subcategories : ");
  console.log(subCategories.subCategory);

  useEffect(() => {
    if (showPopUp) {
      const timer = setTimeout(() => {
        setShowPopUp(false);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [showPopUp]);

  //const sortBy varesisht se ashte asc apo desc do i marr produktet ne backend dhe do i shfaq ne ate rradhitje
  // kjo feature per Sortim ka me u bo funksionale kur te fillojm edhe te lidhim ket faqe me backend
  const updateSortOrder = (sortOption) => {
    setSortBy(sortOption);
  };

  const handleFiltersClick = () => {
    setSidebarOpen(true);
  };

  const resetSearch = () => {
    setCurrentPage(1);
    setSearchTerm("");
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerm: ""
    }));
    setSearchedProductName("");
  };

  const FilterBySubCategory = (selectedSubCategories, priceRange) => {
    setCurrentPage(1);
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedSubCategories: selectedSubCategories,
      priceRange: priceRange,
    }));

    const numberOfFiltersApplied =
      selectedSubCategories.length +
      (priceRange[0] !== 0 ? 1 : 0) +
      (priceRange[1] !== maxPrice ? 1 : 0);
    setFiltersAppliedCount(numberOfFiltersApplied);
  };

  const filtersReset = () => {
    setCurrentPage(1);
    setFilters({selectedSubCategories:[],priceRange:[],searchTerm:""});
    setFiltersAppliedCount(0);
  };

  const getCategorySearchResults = () => {
    setCurrentPage(1);
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerm: searchTerm
    }));

    setSearchedProductName(searchTerm);
    setSearchTerm("");
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  const AddToCart = (idParam) => {
    console.log("param " + idParam);
    const produktiNeShporte = currentCategory.products.find(
      (product) => product.id === idParam
    );

    const cmimiProduktit = produktiNeShporte.cmimiMeZbritje
      ? produktiNeShporte.cmimiMeZbritje
      : produktiNeShporte.cost;
    const product = {
      id: produktiNeShporte.id,
      name: produktiNeShporte.name,
      img: produktiNeShporte.img,
      cmimi: cmimiProduktit,
      sasia: 1,
      cmimiBaze: cmimiProduktit,
      //  sasiaNeStok: produktiNeShporte.stock,
    };

    const ekzistonNeShporte = state.cartItems.find(
      (item) => item.id === product.id
    );
    if (ekzistonNeShporte) {
      setAddedToCart(false);
      setShowPopUp(true);
      setErrorMessage("This product already exists in cart!");
      return;
    }
    console.log(
      "produkti per tu vendosur ne shporte : " + JSON.stringify(product)
    );
    dispatch({ type: "ADD_TO_CART", payload: product });
    setAddedToCart(true);

    setShowPopUp(true);
  };

  if (categoryId && companyId) {
    if (!currentCategory) {
      return <p>This page couldn't be found.</p>;
    }
    return (
      <div className="productsPage">
        {addedToCart ? (
          <ProductPopUp
            show={showPopUp}
            onHide={() => setShowPopUp(false)}
            notificationType="Product was successfully added to cart"
            actionLink="View your cart items"
            redirect="/Cart"
            noLink="false"
          />
        ) : (
          <ProductPopUp
            show={showPopUp}
            onHide={() => setShowPopUp(false)}
            notificationType={errorMessage}
            error="true"
          />
        )}
        <div className={`${sidebarOpen ? "overlay" : ""}`}></div>
        <div className={`App ${sidebarOpen ? "sidebar-opened" : ""}`}>     
          <SideNav />  
          {loading ? (
            <div className="loading productsPageLoader">
              <TailSpin
                height="260"
                width="120"
                color="#322b9c"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <div className="productContent" style={{ paddingTop: "20px" }}>
              <div className="BreadcrumbContainer">
                <BreadcrumbComponent
                  path={[
                    {
                      pageType: "company",
                      emri: currentCategory.name,
                      id: [currentCategory.id],
                    },
                    {
                      pageType: "category",
                      emri: currentCategory.categoryName,
                      id: [currentCategory.categoryId],
                    },
                  ]}
                />
              </div>
              {
                totalProducts !== 0
                &&
                <div className="productsHeader">
                  <div className="Filter-and-Sorts">
                    <button
                      onClick={handleFiltersClick}
                      id="show-filters-sidebar"
                    >
                      Filters{" "}
                      {filtersAppliedCount === 0
                        ? ""
                        : `(${filtersAppliedCount})`}
                      <TuneIcon />
                    </button>
                    <ProductsSort
                      handleSortFunc={updateSortOrder}
                      sortBy={sortBy}
                    />
                  </div>
                  <div className="searchComponent">
                    <ProductSearch
                      className="products-page"
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      handleSearchResults={getCategorySearchResults}
                    />
                  </div>
                </div>
              }
              <ProductSidebar
                key={categoryId}
                title="Subcategories"
                subcategories={subCategories}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                maxPrice={maxPrice}
                applyFilters={FilterBySubCategory}
                resetFiltersFunc={filtersReset}
              />

              <div className={`container-fluid products-page`}>
                  <div className="center-text">
                    <h3 className="companyName">
                      {currentCategory.categoryName}
                    </h3>
                  </div>
                  <div>
                    {filters.searchTerm !== "" && currentCategory.products.length>0   && (
                        <>
                          <p className="showing-results">
                            Showing results for : <b>{searchedProductName} </b>
                          </p>
                          <div className="resetSearchBlock">
                            <Button
                              className="resetSearchButton"
                              onClick={resetSearch}
                            >
                              Reset Search
                            </Button>
                          </div>
                        </>
                      )}
                  </div>
                <div className="product-items">
                  <div className="ProductLayout">
                    {currentCategory.products && currentCategory.products.length > 0 ? (         
                              <>
                                {currentCategory.products.map((product) => (
                                  <div key={product.id} className="productItem">
                                    <ProductSection2
                                      id={product.id}
                                      name={product.name}
                                      image={product.img}
                                      categoryId={currentCategory.categoryId}
                                      company={currentCategory.name}
                                      companyId={currentCategory.id}
                                      cmimi={product.cost}
                                      cmimiMeZbritje={product.cmimiMeZbritje}
                                      rating={product.rating}
                                      stoku={product.stock}
                                      subcategoryId={product.subcategoryId}
                                      subcategory={product.subcategory}
                                      AddToCart={AddToCart}
                                    >
                                      <span>See more details</span>
                                    </ProductSection2>
                                  </div>
                                ))}
                              </>
                    ) : (
                      <div className="no-products-yet">
                        <div>
                          <p>No products found</p>
                          {filtersAppliedCount !== 0 
                          && filters.searchTerm === "" &&
                          <p style={{fontWeight:"bold",fontSize:"18px"}}>
                           ( Try removing some filters )
                          </p>
                          }
                        </div>
                        <div style={{marginLeft:"10px"}}>
                          {filters.searchTerm !== ""  && (
                            <>
                              <div className="resetSearchBlock">
                                <Button
                                  className="resetSearchButton"
                                  onClick={resetSearch}
                                >
                                  Reset Search
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                {totalProducts > productsPerPage && (
                  <div className="center-container">
                    <Stack spacing={2}>
                      <Pagination
                        className="custom-pagination"
                        count={Math.ceil(totalProducts / productsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{
                          "& .MuiPaginationItem-root": {
                            "&.Mui-selected": {
                              backgroundColor: "#665DDB",
                              color: "#fff",
                            },
                          },
                        }}
                      />
                    </Stack>
                  </div>
                )}
                </div>
              </div>
            </div>
          )}
          <div className={`${sidebarOpen ? "blur" : ""}`}>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
};

export default CompanyCategory;

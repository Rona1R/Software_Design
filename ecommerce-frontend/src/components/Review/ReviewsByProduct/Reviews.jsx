import { useEffect,useState } from "react";
import ReviewSort from "components/Review/ReviewSort";
import "./Reviews.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ProductPopUp from "components/ProductComponents/ProductPopUp";
import { TailSpin } from "react-loader-spinner";
import AddReview from "components/Review/ReviewCRUD/AddReview";
import Rating from "@mui/material/Rating";
import Review from "components/Review/SingleReview/Review";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Reviews = (props) => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviewSubmittedPopUp, setReviewSubmittedPoUp] = useState(false);
  const [sortBy, setSortBy] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(6);
  const [totalReviews, setTotalReviews] = useState(0);
  const [refreshKey, setRefreshKey] = useState("");
  const [reviewEditedPopUp, setReviewEditedPopUp] = useState(false);
  const [reviewDeletedPopUp, setReviewDeletedPopUp] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    if (props.productID) {
      // setLoadingReviews(true);
      try {
        axios
          .get(
            `https://localhost:7061/api/Review/shfaqReviewsSipasProduktit/${props.productID}/${sortBy}/${reviewsPerPage}/${currentPage}`
          )
          .then((response) => {
            const { reviews, totalReviewsCount } = response.data;
            //  console.log(response.data.reviews[0].dateAdded);
            setReviews(reviews);
            setTotalReviews(totalReviewsCount);

            setLoadingReviews(false);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [props.productID, sortBy, reviewsPerPage, currentPage, refreshKey]);

  useEffect(() => {
    if (reviewSubmittedPopUp) {
      const timer = setTimeout(() => {
        setReviewSubmittedPoUp(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [reviewSubmittedPopUp]);

  useEffect(() => {
    if (reviewEditedPopUp) {
      const timer = setTimeout(() => {
        setReviewEditedPopUp(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [reviewEditedPopUp]);

  useEffect(() => {
    if (reviewDeletedPopUp) {
      const timer = setTimeout(() => {
        setReviewDeletedPopUp(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [reviewDeletedPopUp]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleReviewSubmittedPopUp = () => {
    setReviewSubmittedPoUp(true);
  };

  return (
    <>
      {showAddReview && (
        <AddReview
          handleClose={() => setShowAddReview(false)}
          produktiId={props.productID}
          handleReviewSubmittedPopUp={handleReviewSubmittedPopUp}
          refreshTeDhenat={() => {
           setRefreshKey(Date.now());
            props.refreshProductRating();
          }}
          
        />
      )}
      {reviewEditedPopUp && (
        <ProductPopUp
          show={reviewEditedPopUp}
          onHide={() => setReviewEditedPopUp(false)}
          notificationType={"Your review was successfully edited !"}
        />
      )}
      {reviewDeletedPopUp && (
        <ProductPopUp
          show={reviewDeletedPopUp}
          onHide={() => setReviewDeletedPopUp(false)}
          notificationType={"Your review was successfully deleted !"}
        />
      )}
      {reviewSubmittedPopUp && (
        <ProductPopUp
          show={reviewSubmittedPopUp}
          onHide={() => setReviewSubmittedPoUp(false)}
          notificationType={"Your review was submitted !"}
        />
      )}

      <div className="ReviewsContainer">
        {/* <div className="Reviews"> */}
        <div className="Write-Review">
          <div className="center-content">
            <div className="Rating">
              {totalReviews > 0 ? (
                <>
                  <h3>
                    Overall Rating : {props.productRating}/5
                  </h3>
                  <Rating
                    value={props.productRating}
                    readOnly
                  />
                </>
              ) : (
                <h3> No Reviews yet </h3>
              )}
            </div>
            <button
              type="button"
              className="btn btn-primary ml-3 add-review"
              onClick={() => setShowAddReview(true)}
            >
              <FontAwesomeIcon
                icon={faPen}
                style={{ paddingRight: "5px", height: "17px" }}
              />
              Write a review
            </button>
          </div>
        </div>
        {/* </div> */}
        {loadingReviews ? (
          <div className="loading" style={{ padding: "20px" }}>
            <TailSpin
              height="120"
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
          <>
            {reviews &&
                  reviews.length > 0 && (
              <ReviewSort
                selectedOrder={sortBy}
                handleSortFunc={(selectedOrder) => setSortBy(selectedOrder)}
              />
            )}
            <div className="ReviewSection">
              <div
                style={{ backgroundColor: "white" }}
                className="displayReviews"
              >
                {reviews &&
                  reviews.length > 0 &&
                  reviews.map((review) => (
                    <div key={review.id}>
                      <Review
                        id={review.id}
                        userId={review.userId}
                        Rate={review.rating}
                        DatePosted={review.dateAdded}
                        Username={review.username}
                        Teksti={review.text}
                        AchievementBadge={review.achievementBadge}
                        isEdited={review.isEdited}
                        handleReviewEditedPopUp={() =>
                          setReviewEditedPopUp(true)
                        }
                        handleReviewDeletedPopUp={() =>
                          setReviewDeletedPopUp(true)
                        }
                        refreshTeDhenat={() => {
                            setRefreshKey(Date.now());
                             props.refreshProductRating();
                        }}
                        resetPage={() => setCurrentPage(1)}
                      />
                    </div>
                  ))}
              </div>
              {totalReviews > reviewsPerPage && (
                <div className="center-container">
                  <Stack spacing={2}>
                    <Pagination
                      className="custom-pagination"
                      count={Math.ceil(totalReviews / reviewsPerPage)}
                      page={currentPage}
                      onChange={handlePageChange}
                      sx={{
                        paddingBottom: "15px",
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
          </>
        )}
      </div>
    </>
  );
};

export default Reviews;
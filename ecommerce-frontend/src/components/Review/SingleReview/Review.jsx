import React from "react";
import "./Review.css";
import Rating from "@mui/material/Rating";
import moment from "moment";
import {
  faMedal,
  faCheckCircle,
  faCaretUp,
  faCaretDown,
  faPenToSquare,
  faX,
  faUser,
  faTrophy,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import EditReview from "../ReviewCRUD/EditReview";
import  Button  from "@mui/material/Button";
import DeleteReview from "../ReviewCRUD/DeleteReview";


const Review = (props) => {
  const [showMore, setShowMore] = useState(false);
  const [shfaqEdit, setShfaqEdit] = useState(false);
  const [shfaqDelete,setShfaqDelete] = useState(false);
  const loggedUser = JSON.parse(localStorage.getItem('userDetails'));

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleEdit = () => {
    setShfaqEdit(true);
  };

  const handleCloseEdit = () => {
    setShfaqEdit(false);
  };


  
  const handleDelete = () => {
    setShfaqDelete(true); 
  };

  const showDeletedNotification=()=>{
      props.handleReviewDeletedPopUp();
      props.resetPage(); // back to page 1
  }
  
  const limitedText = props.Teksti.slice(0, 230);

  const badgeIcons = {
    "New User": faUser,
    "Active Contributor": faMedal,
    "Verified Buyer":faCheckCircle,
    "Best Costumer": faTrophy,
    "default": faStar,
  };

  const formatDate = (DateString) => {
    const date = moment(DateString);
    const now = moment();

    if (now.diff(date, "days") === 0) {
      return "Today";
    } else if (now.diff(date, "days") === 1) {
      return "Yesterday";
    } else {
      return date.fromNow();
    }
  };

  const addedDate = formatDate(props.DatePosted);

  return (
    <>

      {shfaqEdit && (
        <EditReview
          reviewId={props.id}
          mbyllEdit={handleCloseEdit}
          handleReviewEditedPopUp={props.handleReviewEditedPopUp}
          refreshTeDhenat={props.refreshTeDhenat}
        />
      )}

      {
        shfaqDelete && 
        <DeleteReview 
          id = {props.id}
          shfaqFshij = {shfaqDelete}
          mbyllFshij = {()=>setShfaqDelete(false)}
          refreshTeDhenat = {props.refreshTeDhenat}   
          showDeletedNotification={showDeletedNotification}
        />
      }

      <div className="UserReviewContainer">
            <div className="ReviewUpper-Right">
              {
                // props.userId eshte klienti qe e ka lane komentin
                loggedUser && parseInt(loggedUser.userId) === props.userId && (
                  <div className="actionButonat-wrapper">
                    <Button
                      sx={{
                        backgroundColor: "inherit",
                        marginRight: "5px",
                        "&:hover": { backgroundColor: "inherit" },
                      }}
                      onClick={handleEdit}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ paddingLeft: "4px" , color:"#000004" }}
                      />
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "inherit",
                        "&:hover": { backgroundColor: "inherit" },
                      }}
                      onClick={handleDelete}
                    >
                      <FontAwesomeIcon
                        icon={faX}
                        style={{ paddingLeft: "4px", color:"#000004" }}
                      />
                    </Button>
                  </div>
                )
              }
            </div>
        <div className="ReviewUpper">
          <Rating
            value={props.Rate}
            readOnly
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#665DDB",
              },
            }}

          />
          <div>
          <span>{addedDate}</span>
          </div>
        </div>

          <span
            style={{
              fontSize: "smaller",
              fontWeight: "bold",
              color: "#4A4A4A",
              height:"20px"
            }}
            >
            {props.isEdited && (
             "( Edited )" 
            )}
          </span>
        <div className="ReviewPershkrimi">
          <p>
            {showMore
              ? props.Teksti
              : props.Teksti.length > limitedText.length
              ? limitedText + " ..."
              : props.Teksti}
          </p>
        </div>
        <div>
          {props.Teksti.length > 230 && (
            <button onClick={toggleShowMore} className="toggleText">
              {showMore ? (
                <span>
                  <FontAwesomeIcon icon={faCaretUp} /> See less
                </span>
              ) : (
                <span>
                  <FontAwesomeIcon icon={faCaretDown} /> See more
                </span>
              )}
            </button>
          )}
        </div>

        <div className="UserData">
          <p>
            <span>{props.Username}</span> <b>{props.AchievementBadge} </b>{" "}
            <FontAwesomeIcon icon={badgeIcons[props.AchievementBadge] || badgeIcons["default"]}  color="#665DDB"  />
          </p>

        </div>
      </div>
    </>
  );
};

export default Review;

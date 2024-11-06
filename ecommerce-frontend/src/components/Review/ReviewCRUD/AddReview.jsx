import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import "../AddReview.css";
import axios from "axios";
import { useEffect } from "react";

const AddReview = (props) => {
  const [loggedUserId,setLoggedUserId] = useState(null); 
  const [rating, setRating] = useState(0);
  const [text,setText] = useState("");

  const [ratingError,setRatingError] = useState("");
  const [textError,setTextError] = useState("");
  const [error, setError] = useState('');

  const loggedUser = JSON.parse(localStorage.getItem('userDetails'));
  useEffect(()=>{
    if(loggedUser)
    {
      setLoggedUserId(parseInt(loggedUser.userId));
    }
  },[loggedUser])

  const handleRating = (rate) => {
    setRatingError("");
    setRating(rate);
  };

  const handleTextChange = (event) => {
    setTextError("");
    setText(event.target.value);
  };

  const validoFormen=()=>{
     let validated = true;
      if (rating === 0){
        setRatingError("Please select a rating!");
        validated = false;
      }
    
      if (text.trim()=== '') {
        setTextError("Please enter your review text!");
        validated = false
      }

      return validated;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); 
    const isValid = validoFormen();
    console.log(isValid);

    if (isValid) {
        try{
          await axios.post("https://localhost:7061/api/Review/shtoReview",{
             user_Id : loggedUserId,
            rating : rating,
            reviewContent: text,
            produkti_ID : props.produktiId
           })//.then(()=>{
            props.handleClose();
            props.handleReviewSubmittedPopUp();
            props.refreshTeDhenat();
          // })
        }catch(error){
          if (error.response && error.response.status === 400) { // BACKEND VALIDIMI
            setError(error.response.data.message);
            console.log(error.response.data.message);
          } 
        }
      
    }
    else{
      console.log("Forma nuk eshte valide , te dhenat per insertim jane : ")
      console.log({
        user_Id : loggedUserId,
        rating : rating,
        reviewContent: text,
        produkti_ID : props.produktiId
      })
    }
  }
  return (
    <Modal
      show={true}
      onHide={props.handleClose}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="reviewModal"
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter"
        // className="reviewTitle"
        className="crudFormLabel"
        >
          Add your review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="reviewForm" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="crudForm.Rating">
            <Rating
              onClick={handleRating}
              value={rating}
            />
            <span style={{ color: "red" }}>*</span>
            {
            ratingError && (
            <div className="rating-error-message">
                {ratingError}
           </div>
            )
           }
          </Form.Group>
          <Form.Group className="mb-3" controlId="crudForm.ReviewContent">
            <Form.Label>Comment: <span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control as="textarea" rows={3}
              className="crudFormTextarea"
              value={text}
              onChange={handleTextChange}
              isInvalid={!!textError}
              maxLength={350}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Review
          </Button>
        </Form>
        {error && <Alert  style={{ marginTop: '10px' ,backgroundColor:"darkred",fontWeight:"bold"}}>{error}</Alert>}
      </Modal.Body>
    </Modal>
  );
};

export default AddReview;

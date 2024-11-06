import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import axios from "axios";

const EditReview = (props) => {
  console.log("Edit modal was rendered !");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [textError, setTextError] = useState("");

  useEffect(() => {
    if (props.reviewId) {
      try {
        axios
          .get(
            `https://localhost:7061/api/Review/shfaqReview/${props.reviewId}`
          )
          .then((response) => {
            console.log("shfaqja e te dhenave per perditesim")
            setRating(response.data.rating);
            setText(response.data.komenti);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [props.reviewId]);

  //props.reviewId

  const handleRating = (rate) => {
    setRatingError("");
    setRating(rate);
  };

  const handleTextChange = (event) => {
    setTextError("");
    setText(event.target.value);
  };

  const validoFormen = () => {
    let validated = true;
    if (rating === 0) {
      setRatingError("Please select a rating!");
      validated = false;
    }

    if (text.trim() === "") {
      setTextError("Please enter your review text!");
      validated = false;
    }

    return validated;
  };

  async function editoReview (event){
    event.preventDefault();
    const isValid = validoFormen();

    if (isValid) {
      try {
        await axios
          .put(
            `https://localhost:7061/api/Review/perditesoReview/${props.reviewId}`,
            {
              rating: rating,
              reviewContent: text,
            }
          )
          // .then(() => {
            props.mbyllEdit();
            props.handleReviewEditedPopUp();
            props.refreshTeDhenat();
          // });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Modal
        show={true}
       onHide={()=>props.mbyllEdit()}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      //  className="reviewModal"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            // className="reviewTitle"
            className="crudFormLabel"
          >
            Perditeso Vleresimin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="reviewForm" onSubmit={editoReview}>
            <Form.Group className="mb-3" controlId="crudForm.Rating">
              <Rating onClick={handleRating} initialValue={rating} />
              <span style={{ color: "red" }}>*</span>
              {ratingError && (
                <div className="rating-error-message">{ratingError}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.ReviewContent">
              <Form.Label>
                Comment: <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className="crudFormTextarea"
                value={text}
                onChange={handleTextChange}
                isInvalid={!!textError}
                maxLength={350}
              />
            </Form.Group>
            <Button variant="primary" /*onClick={editoReview}*/ type="submit">
              Ruaj ndryshimet
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditReview;

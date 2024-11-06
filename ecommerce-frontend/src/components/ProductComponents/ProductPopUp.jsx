import React from "react";
import { Modal } from "react-bootstrap";
import "./Styles/ProductPopUp.css";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faWarning} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProductPopUp = (props) => {

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <div className="popUp">
          <Modal.Header closeButton className="popUpHeader">
            <Modal.Title className="popUpTitle">
              <FontAwesomeIcon
                 icon={props.error ? faWarning : faCheckCircle}
                 style={{ marginRight: "5px" }}
              />
              {props.notificationType}
            </Modal.Title>
          </Modal.Header>
          { props.noLink && (
          <Modal.Body className="popUpLink">
             <Link to={props.redirect}>
              <FontAwesomeIcon icon={faChevronRight} id="chevronRightIcon"/> 
                {props.actionLink
              }
             </Link>
          </Modal.Body>
          )
        }
        </div>
      </Modal>
    </>
  );
};

export default ProductPopUp;

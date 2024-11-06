import { useState} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Alert from 'react-bootstrap/Alert';


export default function AddVideo(props) {
  const [video, setVideo] = useState(null);
  const [warning,setWarning] = useState("");

  const anulo = () => {
    props.mbyllShto();
  };

  const handleVideo = (event) => {
    setWarning("");
    setVideo(event.target.files[0]);
  };

  function validoFormen() {
    let validated = true;
    
    if(!video){
        setWarning("Video duhet te zgjedhet patjeter!");
        validated = false;
    }

    return validated;
  }

  async function shtoVideon() {
    const isValid = validoFormen();

    if (isValid) {
      if (video) {
        const videoData = new FormData();
        videoData.append("video", video);
        try {
          console.log("videoja per tu shtuar: " + video);
          const response = await axios
            .post("https://localhost:7061/api/HomeVideo/shtoVideon", videoData)
         
          toast.success("Videoja "+response.data+" u shtua me sukses!");
          props.refreshTeDhenat();
          props.mbyllShto();
         
        } catch (err) {
          toast.error("Ndodhi nje problem ne server gjate shtimit te videos!");
          console.log(err);
        }
      } 
    }
  }

  return (
    <>
      <Modal
       show={true}
        onHide={props.mbyllShto}
        centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Shto Video ne Home
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="crudForm.Video">
              <Form.Label>Ngarko videon</Form.Label>
              <Form.Control
                type="file"
                accept="video/*"
                onChange={handleVideo}
              />
            </Form.Group>
          </Form>
          {warning && <Alert  style={{ marginTop: '10px' ,backgroundColor:"darkred",fontWeight:"bold"}}>{warning}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={anulo}
            className="crudFormAnuloButoni"
          >
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button
            className="crudFormeSubmitButoni"
            onClick={shtoVideon}
            variant="contained"
          >
            Shto Videon <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

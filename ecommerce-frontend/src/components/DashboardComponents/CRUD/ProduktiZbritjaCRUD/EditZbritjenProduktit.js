import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmark,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";

export default function EditZbritjenProduktit(props) {
  const [selectedProdukti, setSelectedProdukti] = useState(null);
  const [zbritjet, setZbritjet] = useState([]); // zbritjet e mundshme e sistem

  const [selectedZbritjaId, setSelectedZbritjaId] = useState(null);
  const [selectedZbritjaEmri, setSelectedZbritjaEmri] = useState(null);
  const [selectedZbritjaPerqindja, setSelectedZbritjaPerqindja] = useState(null);

  const [zbritjaAnchorEl, setZbritjaAnchorEl] = useState(null);
  const [zbritjaWarning, setZbritjaWarning] = useState("");

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7061/api/Zbritja/shfaqZbritjet")
        .then((response) => {
          setZbritjet(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if(props.id){
        try {

            axios
            .get(`https://localhost:7061/api/ProduktiZbritja/shfaqProduktinNeZbritje/${props.id}`)
            .then((response) => {
                setSelectedProdukti(
                        response.data.emriProdukti
                );
                setSelectedZbritjaId(response.data.zbritja_ID);
                setSelectedZbritjaEmri(response.data.zbritjaEmri);
                setSelectedZbritjaPerqindja(response.data.perqindjaZbritjes);
                });
            } catch (err) {
                console.log(err);
            }
    }
  }, [props.id]);

  const anulo = () => {
    props.mbyllEdit();
  };

  const handleZbritjen = (event) => {
    setZbritjaAnchorEl(event.currentTarget);
  };

  const handleZbritjaMenuItemClick = (id, emri,perqindja) => {
    setZbritjaWarning("");
    setSelectedZbritjaId(id);
    setSelectedZbritjaEmri(emri);
    setSelectedZbritjaPerqindja(perqindja);
    setZbritjaAnchorEl(null);
  };

  const handleZbritjetClose = () => {
    setZbritjaAnchorEl(null);
  };

  async function editoZbritjenProduktit() {
    if (props.id) {
      // console.log("Forma eshte validuar me sukses! Te dhenat per insertim : ");
      // console.log(
      //     {
      //         produktiId : selectedProdukti.produktiID,
      //         zbritjaId : selectedZbritja.zbritja_ID
      //     }
      // );
      try {
       await axios
          .put(
            `https://localhost:7061/api/ProduktiZbritja/perditesoZbritenProduktit/${props.id}/${selectedZbritjaId}`
          )
          // .then(() => {
            props.refreshTeDhenat();
            toast.success("Produkti i eshte perditesuar zbritja me sukses!");
            props.mbyllEdit();
          // });
      } catch (err) {
        toast.error("Ndodhi nje problem ne server");
        console.log(err);
      }
    }
  }

  return (
    <>
      <Modal
        /* show={props.shfaqFormen}*/ show={true}
        onHide={props.mbyllEdit}
        centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Perditeso Zbritjen e Produktit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="crudForm.ProduktiId">
              <Form.Label>Produkti Id</Form.Label>
              <Form.Control type="text" value={props.id} readOnly />
              <Form.Text className="text-muted">
                You cannot edit this field.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.ProduktiEmri">
              <Form.Label>Produkti Emri</Form.Label>
              <Form.Control type="text" value={selectedProdukti} readOnly />
              <Form.Text className="text-muted">
                You cannot edit this field.
              </Form.Text>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="crudForm.LlojiZbritjes">
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleZbritjen}
                variant="contained"
                style={{ width: "300px" }}
                className="crudDropdownButton"
              >
                { selectedZbritjaEmri +
                    " ( " +
                    selectedZbritjaPerqindja +
                        " % )" }
                
                <FontAwesomeIcon icon={faCaretDown} />
              </Button>
              <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
              {zbritjaWarning && (
                <p
                  className={`crudFormWarning ${
                    zbritjaWarning ? "fade-in" : ""
                  }`}
                >
                  {zbritjaWarning}
                </p>
              )}
              <Menu
                id="simple-menu"
                anchorEl={zbritjaAnchorEl}
                keepMounted
                open={Boolean(zbritjaAnchorEl)}
                onClose={handleZbritjetClose}
                className="crudDropdownList"
              >
                {zbritjet.map((z) => (
                  <MenuItem
                    className="crudDropdownListItem"
                    key={
                      z.zbritja_ID
                    } /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                    onClick={() => handleZbritjaMenuItemClick(z.zbritja_ID,z.zbritjaEmri,z.perqindjaZbritjes)}
                  >
                    {z.zbritjaEmri + " (" + z.perqindjaZbritjes + "%)"}
                  </MenuItem>
                ))}
              </Menu>
            </Form.Group>
          </Form>
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
            onClick={editoZbritjenProduktit}
            variant="contained"
          >
            Ruaj <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

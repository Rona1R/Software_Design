import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark ,faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";

export default function EditPorosine(props) {
  
  const [statusi, setStatusi] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const statusiOpsionet = [
    "Nen Procesim",
    "Rruges Per Dorezim",
    "Derguar",
    "Pranuar nga Klienti",
    "Kthyer",
    "Rimbursuar",
    "Anuluar"
  ]

  useEffect(
    () => {
    if(props.id){

        try {
            axios
            .get(`https://localhost:7061/api/Porosia/shfaqFaturenPorosise/${props.id}`)
            .then((response) => {
               setStatusi(response.data.statusiPorosise);
            });
        } catch (err) {
            console.log(err);
        }
    }
    },
    [
      props.id
      /*props.refreshKey*/
    ]
  );
  const anulo = () => {
    props.mbyllEdit();
  };

  const handleStatusi = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuItemClick = (statusiRi)=>{
    setStatusi(statusiRi);
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  async function editoStatusin(){

          try {
            const response = await axios
              .put(`https://localhost:7061/api/Porosia/perditesoStatusin/${props.id}?statusi=${statusi}`)
              // .then((response) => {
                props.refreshTeDhenat();
                if(response.status === 200)
                {
                    toast.success(response.data);
                }
                props.mbyllEdit();
              // });
            } catch (err) {
              toast.error("Ndodhi nje problem ne server");
              console.log(err);
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
            Perditeso Statusin e Porosise
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Porosia Id
              </Form.Label>
              <Form.Control
                value={props.id}
                type="text"
                placeholder="Lloji i nenkategorise"
                readOnly
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
            <div>
                <Form.Label>
                        Statusi 
                </Form.Label>
            </div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleStatusi}
                variant="contained"
                className="crudDropdownButton"
              >
                {statusi} <FontAwesomeIcon icon={faCaretDown}/>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="crudDropdownList"
              >
                {
                    statusiOpsionet.map((s,index)=>(
                        <MenuItem className="crudDropdownListItem" key={index} /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                        onClick={() => handleMenuItemClick(s)}
                        >{s}
                        </MenuItem>
                    ))
                }
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
          <Button className="crudFormeSubmitButoni" variant="contained"
            onClick={editoStatusin}
          >
            Ruaj  <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

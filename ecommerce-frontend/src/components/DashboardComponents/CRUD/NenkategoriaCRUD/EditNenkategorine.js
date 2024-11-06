import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark ,faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";

export default function EditNenkategorine(props) {
  const [nenkategorite, setNenkategorite] = useState([]);
  const [nenkategoria, setNenkategoria] = useState(null);
  const [kategorite,setKategorite] = useState([]);
  const [emriNenkategoriseUpdated, setEmriNenKategoriseUpdated] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [kategoriaUpdatedEmri,setKategoriaUpdatedEmri] = useState(null);
  const [kategoriaUpdatedID,setKategoriaUpdatedID] = useState(null);
  const [warning, setWarning] = useState("");
 
  useEffect(
    () => {
      try {
        axios
          .get("https://localhost:7061/api/NenKategoria/shfaqNenKategorite")
          .then((response) => {
            setNenkategorite(response.data);

          });
      } catch (err) {
        console.log(err);
      }
    },
    [
      /*props.refreshKey*/
    ]
  );

  useEffect(
    () => {
      try {
        axios
          .get("https://localhost:7061/api/Kategoria/shfaqKategorite")
          .then((response) => {
            setKategorite(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    },
    [
      /*props.refreshKey*/
    ]
  );

  useEffect(
    () => {
      try {
        axios
          .get(`https://localhost:7061/api/NenKategoria/shfaqNenKategorine/${props.id}`)
          .then((response) => {
            setNenkategoria(response.data)
            setEmriNenKategoriseUpdated(response.data.emri);
            setKategoriaUpdatedEmri(response.data.kategoria);
            setKategoriaUpdatedID(response.data.kategoriaID);
            // setKategoriaIDUpdatedEmri(response.data.kategoriaID);
          });
      } catch (err) {
        console.log(err);
      }
    },
    [
      props.id
      /*props.refreshKey*/
    ]
  );
  const anulo = () => {
    setWarning("");
    props.mbyllEditNenKategorine();
  };

  const handleEmri = (value) => {
     setWarning("");
     setEmriNenKategoriseUpdated(value);
  };

  const handleKategoria = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (id,emri)=>{
    setKategoriaUpdatedEmri(emri);
    setKategoriaUpdatedID(id);
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  function validoFormen(){
      let validated=true;
      if (!emriNenkategoriseUpdated || emriNenkategoriseUpdated.trim() === "") {
          setWarning("Emri i nen-kategorise nuk duhet te jete i zbrazet!");
          validated = false;
      }

      if(nenkategorite.filter((k)=>k.emri.toLowerCase() === emriNenkategoriseUpdated.toLowerCase() && k.id !== nenkategoria.id).length>0){
          setWarning("Ekziszon nje nen-kategori me emrin e njejte.Zgjedh nje emer tjeter!")
          validated = false;
      }
      
      return validated
  }
  async function editoNenkategorine(){
      const isValid = validoFormen();

      if(isValid){
            // console.log("Forma eshte validuar me sukses! Te dhenat per insertim : ");
            // console.log(
            //     {
            //         emri : emriNenkategoriseUpdated,
            //         kategoriaID : kategoriaUpdatedID
            //     }
            // );
          try {
              const response = await axios
              .put(`https://localhost:7061/api/NenKategoria/perditesoNenKategorine/${props.id}`,{
                    emri : emriNenkategoriseUpdated,
                    kategoriaID : kategoriaUpdatedID
                    // kategoriaID : kategoriaId
              })
              // .then((response) => {
                //setKategorite(response.data);
                console.log(response);
                props.refreshTeDhenat();
                toast.success("Nenkategoria eshte perditesuar me sukses!");
                props.mbyllEditNenKategorine();
              // });
            } catch (err) {
              toast.error("Ndodhi nje problem ne server");
              console.log(err);
            }
        }
    //   else{
    //     console.log("Forma nuk eshte valide");
    //     console.log(
    //         {
    //             emri : emriNenkategoriseUpdated,
    //             kategoriaID : kategoriaUpdatedID
    //         }
    //     );
    //   }

  }

  return (
    <>
      <Modal
        /* show={props.shfaqFormen}*/ show={true}
        onHide={props.mbyllEditNenKategorine}
        centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Perditeso Nen-kategorine
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Lloji (Emri) i Nen-kategorise
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => handleEmri(e.target.value)}
                value={emriNenkategoriseUpdated}
                type="text"
                placeholder="Lloji i nenkategorise"
                autoFocus
              />
              {warning && (
                <p /*style={{color:"red"}}*/ className={`crudFormWarning ${warning ? 'fade-in' : ''}`}>
                  {warning}
                </p>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleKategoria}
                variant="contained"
                className="crudDropdownButton"
              >
                {kategoriaUpdatedEmri} <FontAwesomeIcon icon={faCaretDown}/>
              </Button>
              <span style={{ color: "red" ,paddingLeft:'2px'}}>*</span>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="crudDropdownList"
              >
                {
                    kategorite.map((k)=>(
                        <MenuItem className="crudDropdownListItem" key={k.id} /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                        onClick={() => handleMenuItemClick(k.id,k.emri)}
                        >{k.emri}
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
            onClick={editoNenkategorine}
          >
            Ruaj  <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

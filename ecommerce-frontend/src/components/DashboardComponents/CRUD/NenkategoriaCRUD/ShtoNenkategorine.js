import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark ,faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";

export default function ShtoNenkategorine(props) {
  const [nenkategorite, setNenkategorite] = useState([]);
  const [kategorite,setKategorite] = useState([]);
  const [emriNenkategorise, setEmriNenKategorise] = useState("");
  const [anchorEl, setAnchorEl] = useState(null)
  // const [kategoriaId, setKategoriaId] = useState(null);
  // const [selectedKategoria,setSelectedKategoria] = useState("");
  const [selectedKategoria,setSelectedKategoria] = useState(null);
  //const [refreshKey,setRefreshKey] = useState("");
  const [warning, setWarning] = useState("");
  const [kategoriaWarning,setKategoriaWarning] = useState("");

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
  const anulo = () => {
    setEmriNenKategorise("");
    setKategoriaWarning("");
    // setKategoriaId(null);
    setSelectedKategoria(null);
    setWarning("");
    props.mbyllShtoNenKategorine();
  };

  const handleEmri = (value) => {
    setWarning("");
    setEmriNenKategorise(value);
  };

  const handleKategoria = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (kategoria)=>{
    setKategoriaWarning("");
    setSelectedKategoria(kategoria);
    // setKategoriaId(id);
    // setSelectedKategoria(emri);
    // console.log("You have selected the category with id: "+id);
    // console.log("You have selected the category with name: "+emri);
    setAnchorEl(null);
  }
  // const handleMenuItemClick = (id,emri)=>{
  //   setKategoriaWarning("");
  //   setKategoriaId(id);
  //   setSelectedKategoria(emri);
  //   console.log("You have selected the category with id: "+id);
  //   console.log("You have selected the category with name: "+emri);
  //   setAnchorEl(null);
  // }
  
  const handleClose = () => {
    setAnchorEl(null);
  }

  function validoFormen(){
      let validated=true;
      if (!emriNenkategorise || emriNenkategorise.trim() === "") {
          setWarning("Emri i nen-kategorise nuk duhet te jete i zbrazet!");
          validated = false;
      }

      if(nenkategorite.filter((k)=>k.emri.toLowerCase() === emriNenkategorise.toLowerCase()).length>0){
          setWarning("Ekziszon nje nen-kategori me emrin e njejte.Zgjedh nje emer tjeter!")
          validated = false;
      }
      
      if(!selectedKategoria){
        setKategoriaWarning("Duhet te zgjidhni nje kategori patjeter!");
        validated = false;
      }
      // if(!kategoriaId){
      //   setKategoriaWarning("Duhet te zgjidhni nje kategori patjeter!");
      //   validated = false;
      // }
      return validated
  }
  async function shtoNenKategorine(){
      const isValid = validoFormen();

      if(isValid){
            console.log("Forma eshte validuar me sukses! Te dhenat per insertim : ");
            console.log(
                {
                    emri : emriNenkategorise,
                    kategoriaID : selectedKategoria.id
                }
            );
          try {
              const response = await axios
              .post('https://localhost:7061/api/NenKategoria/shtoNenKategorine',{
                    emri : emriNenkategorise,
                    kategoriaID : selectedKategoria.id
                    // kategoriaID : kategoriaId
              })
              // .then((response) => {
                //setKategorite(response.data);
                console.log(response);
                props.refreshTeDhenat();
                toast.success("Nenkategoria eshte shtuar me sukses!");
                props.mbyllShtoNenKategorine();
                // setRefreshKey(Date.now);
                // setEmriNenKategorise("");
                // setSelectedKategoria(null);
                // setKategoriaId("");
              // });
            } catch (err) {
              toast.error("Ndodhi nje problem ne server");
              console.log(err);
            }
        }
    //   }else{
    //     console.log("Forma nuk eshte valide");
    //     console.log(
    //         {
    //             emri : emriNenkategorise,
    //             kategoriaID : kategoriaId
    //         }
    //     );
    //   }

  }

  return (
    <>
      <Modal
        /* show={props.shfaqFormen}*/ show={true}
        onHide={props.mbyllShtoNenKategorine}
        centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Shto Nen-kategorine e re
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3"
            controlId="crudForm.NenkategoriaEmri"
            >
              <Form.Label>
                Lloji (Emri) i Nen-kategorise
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => handleEmri(e.target.value)}
                value={emriNenkategorise}
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
              controlId="crudForm.NenkategoriaPershkrimi"
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleKategoria}
                variant="contained"
                className="crudDropdownButton"
              >
                {selectedKategoria? selectedKategoria.emri : "Zgjedh kategorine"} <FontAwesomeIcon icon={faCaretDown}/>
              </Button>
              <span style={{ color: "red" ,paddingLeft:'2px'}}>*</span>
              {
                kategoriaWarning && (
                    <p  className={`crudFormWarning ${kategoriaWarning ? 'fade-in' : ''}`}>
                        {kategoriaWarning}
                    </p>
                )
              }
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
                        onClick={() => handleMenuItemClick(k)}
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
          <Button
            className="crudFormeSubmitButoni"
            onClick={shtoNenKategorine}
            variant="contained"
          >
            Shto Nen-kategorine <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark ,faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";

export default function VendosNeZbritje(props) {
  const [produktet,setProduktet] = useState([]); // te gjitha produktet qe nuk kane ndonje zbritje (qe mos me pas nevoj per validim extra)
  const [zbritjet,setZbritjet] = useState([]); // zbritjet e mundshme e sistem

  const [selectedProdukti,setSelectedProdukti] = useState(null);
  const [selectedZbritja,setSelectedZbritja] = useState(null);

  const [produktiAnchorEl, setProduktiAnchorEl] = useState(null)
  const [zbritjaAnchorEl,setZbritjaAnchorEl] = useState(null);
  const [produktiWarning, setProduktiWarning] = useState("");
  const [zbritjaWarning,setZbritjaWarning] = useState("");

  useEffect(
    () => {
      try {
        axios
          .get("https://localhost:7061/api/ProduktiZbritja/shfaqProduktetPaZbritje")
          .then((response) => {
            setProduktet(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    },[]);

  useEffect(
    () => {
      try {
        axios
          .get("https://localhost:7061/api/Zbritja/shfaqZbritjet")
          .then((response) => {
            setZbritjet(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    },[]);

  const anulo = () => {
    props.mbyllVendosNeZbritje();
  };


  const handleProduktin = (event) => {
    setProduktiAnchorEl(event.currentTarget);
  };

  const handleZbritjen =(event) => {
    setZbritjaAnchorEl(event.currentTarget);
  }

  const handleMenuItemClick = (produkti)=>{
    setProduktiWarning("");
    setSelectedProdukti(produkti);
    setProduktiAnchorEl(null);
  }

  const handleZbritjaMenuItemClick = (zbritja)=>{
    setZbritjaWarning("");
    setSelectedZbritja(zbritja);
    setZbritjaAnchorEl(null);
  }
  // const handleMenuItemClick = (id,emri)=>{
  //   setKategoriaWarning("");
  //   setKategoriaId(id);
  //   setSelectedKategoria(emri);
  //   console.log("You have selected the category with id: "+id);
  //   console.log("You have selected the category with name: "+emri);
  //   setAnchorEl(null);
  // }
  
  const handleProduktetClose = () => {
    setProduktiAnchorEl(null);
  }

  const handleZbritjetClose = () => {
    setZbritjaAnchorEl(null);
  }

  function validoFormen(){
      let validated=true;
      if (!selectedProdukti) {
          setProduktiWarning("Duhet te zgjedhet nje produkt patjeter!");
          validated = false;
      }

      if(!selectedZbritja){
        setZbritjaWarning("Duhet te zgjidhni nje zbritje patjeter!");
        validated = false;
      }

      return validated
  }
  async function vendosNeZbritje(){
      const isValid = validoFormen();

      if(isValid){
            // console.log("Forma eshte validuar me sukses! Te dhenat per insertim : ");
            // console.log(
            //     {
            //         produktiId : selectedProdukti.produktiID,
            //         zbritjaId : selectedZbritja.zbritja_ID
            //     }
            // );
          try {
              await axios
              .put(`https://localhost:7061/api/ProduktiZbritja/vendosNeZbritje/${selectedProdukti.produktiID}/${selectedZbritja.zbritja_ID}`)
              // .then(() => {
        
                props.refreshTeDhenat();
                toast.success("Produkti eshte vendosur ne zbritje me sukses!");
                props.mbyllVendosNeZbritje();
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
        onHide={props.mbyllVendosNeZbritje}
        centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Vendos Zbritjen e Produktit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="crudForm.ProduktiPerZbritje"
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleProduktin}
                variant="contained"
                className="crudDropdownButton produktetDropdownBtn"
              >
                {selectedProdukti? selectedProdukti.emri : "Zgjedh Produktin"} <FontAwesomeIcon icon={faCaretDown}/>
              </Button>
              <span style={{ color: "red" ,paddingLeft:'2px'}}>*</span>
              {
                produktiWarning && (
                    <p  className={`crudFormWarning ${produktiWarning ? 'fade-in' : ''}`}>
                        {produktiWarning}
                    </p>
                )
              }
              <Menu
                id="simple-menu"
                anchorEl={produktiAnchorEl}
                keepMounted
                open={Boolean(produktiAnchorEl)}
                onClose={handleProduktetClose}
                className="crudDropdownList"
              >
                {
                    produktet.map((p)=>(
                        <MenuItem className="crudDropdownListItem" key={p.produktiID} /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                        onClick={() => handleMenuItemClick(p)}
                        >{p.emri}
                        </MenuItem>
                    ))
                }
              </Menu>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="crudForm.LlojiZbritjes"
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleZbritjen}
                variant="contained"
                style={{width:"300px"}}
                className="crudDropdownButton"
              >
                {selectedZbritja? selectedZbritja.zbritjaEmri +" ( " + selectedZbritja.perqindjaZbritjes+" % )" : "Zgjedh Zbritjen"} <FontAwesomeIcon icon={faCaretDown}/>
              </Button>
              <span style={{ color: "red" ,paddingLeft:'2px'}}>*</span>
              {
                zbritjaWarning && (
                    <p  className={`crudFormWarning ${zbritjaWarning? 'fade-in' : ''}`}>
                        {zbritjaWarning}
                    </p>
                )
              }
              <Menu
                id="simple-menu"
                anchorEl={zbritjaAnchorEl}
                keepMounted
                open={Boolean(zbritjaAnchorEl)}
                onClose={handleZbritjetClose}
                className="crudDropdownList"
              >
                {
                    zbritjet.map((z)=>(
                        <MenuItem className="crudDropdownListItem" key={z.zbritja_ID} /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                        onClick={() => handleZbritjaMenuItemClick(z)}
                        >{z.zbritjaEmri+" (" + z.perqindjaZbritjes+"%)"}
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
            onClick={vendosNeZbritje}
            variant="contained"
          >
            Vendose ne zbritje <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmark,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";
import Switch from '@mui/material/Switch';

export default function EditoProduktin(props) {
  // niher eshte e bome pa uploading te fotove !!!
  const [kategorite, setKategorite] = useState([]);
  const [nenkategorite, setNenkategorite] = useState([]);
  const [kompanite, setKompanite] = useState([]);

  const [selectedKategoriaEmriUpdated, setSelectedKategoriaEmriUpdated] = useState(null);
  const [selectedKategoriaIdUpdated, setSelectedKategoriaIdUpdated] = useState(null);


  const [selectedNenkategoriaEmriUpdated, setSelectedNenkategoriaEmriUpdated] = useState(null);
  const [selectedNenkategoriaIdUpdated, setSelectedNenkategoriaIdUpdated] = useState(null);

  const [selectedKompaniaEmriUpdated, setSelectedKompaniaEmriUpdated] = useState(null);
  const [selectedKompaniaIdUpdated, setSelectedKompaniaIdUpdated] = useState(null);

  const [emriProduktitUpdated, setEmriProduktitUpdated] = useState("");
  const [pershkrimiUpdated, setPershkrimiUpdated] = useState("");
  const [cmimiUpdated, setCmimiUpdated] = useState(0);
  const [stokuUpdated, setStokuUpdated] = useState(0);
  const [fotoUpdated, setFotoUpdated] = useState(null);
  const [neShitjeUpdated, setNeShitjeUpdated] = useState(false);

  const [emriWarning, setEmriWarning] = useState("");
  const [kategoriaWarning, setKategoriaWarning] = useState("");
  const [nenkategoriaWarning, setNenkategoriaWarning] = useState("");
  const [kompaniaWarning, setKompaniaWarning] = useState("");
  const [pershkrimiWarning, setPershkrimiWarning] = useState("");
  const [cmimiWarning, setCmimiWarning] = useState("");
  const [stokuWarning, setStokuWarning] = useState("");
  const [kompaniaAnchorEl, setKompaniaAnchorEl] = useState(null);
  const [kategoriaAnchorEl, setKategoriaAnchorEl] = useState(null);
  const [nenkategoriaAnchorEl, setNenkategoriaAnchoeEl] = useState(null);

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7061/api/Kompania/shfaqKompanine")
        .then((response) => {
          setKompanite(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7061/api/Kategoria/shfaqKategorite")
        .then((response) => {
          setKategorite(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      if (selectedKategoriaIdUpdated) {
        axios
          .get(
            `https://localhost:7061/api/NenKategoria/shfaqNenkategoriseSipasKategorise/${selectedKategoriaIdUpdated}`
          )
          .then((response) => {
            setNenkategorite(response.data);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [selectedKategoriaIdUpdated]);

  useEffect(()=>{
    try{
        if(props.id){
            axios.get(
                `https://localhost:7061/api/Produkti/shfaqProduktin/${props.id}`
            )
            .then((response)=>{
                setEmriProduktitUpdated(response.data.emri);
                setFotoUpdated(response.data.foto);
                setPershkrimiUpdated(response.data.pershkrimi);
                setStokuUpdated(response.data.stoku);
                setCmimiUpdated(response.data.cmimi);
                setSelectedKompaniaIdUpdated(response.data.kompania_ID);
                setSelectedKompaniaEmriUpdated(response.data.kompania);
                setSelectedKategoriaIdUpdated(response.data.kategoria_ID);
                setSelectedKategoriaEmriUpdated(response.data.kategoria);
                setSelectedNenkategoriaIdUpdated(response.data.nenKategoria_ID);
                setSelectedNenkategoriaEmriUpdated(response.data.nenkategoria);
                setNeShitjeUpdated(response.data.neShitje);
            })
        }

    }catch(err){
        console.log(err);
    }
  },[props.id])
  const anulo = () => {
    props.mbyllEditoProduktin();
  };

  const handleEmri = (value) => {
    setEmriWarning("");
    setEmriProduktitUpdated(value);
  };

  const handleKompania = (event) => {
    setKompaniaAnchorEl(event.currentTarget);
  };

  const handleKategoria = (event) => {
    setKategoriaAnchorEl(event.currentTarget);
  };

  const handleNenkategoria = (event) => {
    setNenkategoriaAnchoeEl(event.currentTarget);
  };

  const handlePershkrimi = (value) => {
    setPershkrimiWarning("");
    setPershkrimiUpdated(value);
  };

  const handleCmimi = (value) => {
    setCmimiWarning("");

    if (isNaN(value)) {
      // setCmimiWarning("Cmimi nuk eshte valid");
      setCmimiUpdated(null);
    } else if (parseFloat(value) < 0) {
     setCmimiUpdated(null);
    } else {
      const parsedValue = parseFloat(value);
      // if (!isNaN(parsedValue)) {
      setCmimiUpdated(parsedValue);
    }
  };

  const handleStoku = (value) => {
    setStokuWarning("");

    if (isNaN(value)) {
      setStokuUpdated(null);
    } else if (parseInt(value) < 0) {
      setStokuUpdated(null);
    } else {
      const parsedValue = parseInt(value, 10);
      // if (!isNaN(parsedValue) && parsedValue >= 0) {
      setStokuUpdated(parsedValue);
    }
  };

  const handleNeShitje = (event) => {
    setNeShitjeUpdated(event.currentTarget.checked)
   // setNeShitjeUpdated(event.target.value === "true");
  };

  const handleCompanyMenuItemClick = (id,emri) => {
    setKompaniaWarning("");
    setNenkategoriaWarning("");
    setSelectedKompaniaEmriUpdated(emri);
    setSelectedKompaniaIdUpdated(id);
    setKompaniaAnchorEl(null);
  };

  const handleCategoryMenuItemClick = (id,emri) => {
    setKategoriaWarning("");
    setSelectedKategoriaEmriUpdated(emri);
    setSelectedKategoriaIdUpdated(id);
    setSelectedNenkategoriaEmriUpdated(null);
    setSelectedNenkategoriaIdUpdated(null);
    // setNenkategoriaWarning("");
    setKategoriaAnchorEl(null);

    // if(nenkategorite.length<=0){
    //     setNenkategoriaWarning("Kjo kategori nuk permban asnje nenkategori.Zgjedh nje kategori tjeter.");
    // }
  };

  const handleSubCategoryMenuItemClick = (id,emri) => {
    setNenkategoriaWarning("");
    setSelectedNenkategoriaEmriUpdated(emri);
    setSelectedNenkategoriaIdUpdated(id);
    setNenkategoriaAnchoeEl(null);
  };

  const handleCloseCompanies = () => {
    setKompaniaAnchorEl(null);
  };

  const handleCloseCategories = () => {
    setKategoriaAnchorEl(null);
  };

  const handleCloseSubcategories = () => {
    setNenkategoriaAnchoeEl(null);
  };

  const handleFoto = (event) => {
    setFotoUpdated(event.target.files[0]);
  };

  function validoFormen() {
    let validated = true;
    if (!emriProduktitUpdated || emriProduktitUpdated.trim() === "") {
      setEmriWarning("Emri i produktit nuk duhet te jete i zbrazet!");
      validated = false;
    }

    if (!pershkrimiUpdated || pershkrimiUpdated.trim() === "") {
      setPershkrimiWarning(
        "Pershkrimi i produktit nuk duhet te jete i zbrazet!"
      );
      validated = false;
    }

    if (!selectedKompaniaIdUpdated) {
      setKompaniaWarning("Duhet te zgjidhni patjeter nje kompani");
      validated = false;
    }

    if (!selectedKategoriaIdUpdated) {
      setKategoriaWarning("Duhet te zgjidhni nje kategori patjeter!");
      validated = false;
    }

    if (!selectedNenkategoriaIdUpdated) {
      setNenkategoriaWarning("Duhet te zgjidhni nje nenkategori patjeter!");
      validated = false;
    }
    if (cmimiUpdated=== null || cmimiUpdated === undefined || isNaN(cmimiUpdated)) {
      setCmimiWarning("Cmimi nuk eshte valid!");
      validated = false;
    }
    if (stokuUpdated === null || stokuUpdated === undefined || isNaN(stokuUpdated)) {
      setStokuWarning("Stoku nuk eshte valid!");
      validated = false;
    }
    return validated;
  }

  async function editoProduktin() {
    
    const isValid = validoFormen();

    if (isValid) {
      if (fotoUpdated && typeof(fotoUpdated) !== 'string') {
        const fotoData = new FormData();
        fotoData.append('foto',fotoUpdated);
        console.log("Forma eshte validuar me sukses dhe te dhenat e perditesuara jane : ");
        console.log(emriProduktitUpdated,pershkrimiUpdated,cmimiUpdated,stokuUpdated,fotoUpdated,selectedKompaniaIdUpdated,selectedKategoriaIdUpdated,selectedNenkategoriaIdUpdated,neShitjeUpdated);
        try {
            console.log("fotoja per tu shtuar: "+fotoData);
            await axios.post("https://localhost:7061/api/Produkti/shtoFoton",fotoData)
            .then(async (response)=>{
               await
                axios
                .put(`https://localhost:7061/api/Produkti/perditesoProduktin/${props.id}`, {
                   
                    emri : emriProduktitUpdated,
                    foto : response.data,
                    pershkrimi : pershkrimiUpdated,
                    stoku : stokuUpdated,
                    cmimi : cmimiUpdated,
                    kompania_ID: selectedKompaniaIdUpdated,
                    kategoria_ID: selectedKategoriaIdUpdated,
                    nenKategoria_ID : selectedNenkategoriaIdUpdated,
                    neShitje: neShitjeUpdated,
                })
                .then(async (response) => {
                    console.log(response);
                    props.refreshTeDhenat();
                    toast.success("Produkti eshte perditesuar me sukses!");
                    props.mbyllEditoProduktin();
                }).catch((error)=>{
                    console.log(error);
                })
             })
        } catch (err) {
        toast.error("Ndodhi nje problem ne server gjate shtimit te fotos");
        console.log(err);
        }
      }else{
        await
        axios
        .put(`https://localhost:7061/api/Produkti/perditesoProduktin/${props.id}`, {
           
            emri : emriProduktitUpdated,
            foto : fotoUpdated,
            pershkrimi : pershkrimiUpdated,
            stoku : stokuUpdated,
            cmimi : cmimiUpdated,
            kompania_ID: selectedKompaniaIdUpdated,
            kategoria_ID: selectedKategoriaIdUpdated,
            nenKategoria_ID : selectedNenkategoriaIdUpdated,
            neShitje: neShitjeUpdated,
        })
        .then(async (response) => {
            console.log(response);
            props.refreshTeDhenat();
            toast.success("Produkti eshte perditesuar me sukses!");
            props.mbyllEditoProduktin();
        }).catch((error)=>{
            console.log(error);
        })
      }
   
    }
    else{
        console.log("Te dhenat me poshte jane invalid:");
        console.log(emriProduktitUpdated,pershkrimiUpdated,cmimiUpdated,stokuUpdated,fotoUpdated,selectedKompaniaIdUpdated,selectedKategoriaIdUpdated,selectedNenkategoriaIdUpdated,neShitjeUpdated);
    }
  }    

  return (
    <>
      <Modal
        /* show={props.shfaqFormen}*/ show={true}
        onHide={props.mbyllEditoProduktin}
        centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Perditeso Produktin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="crudForm.ProduktiEmri">
              <Form.Label>
                Emri i produktit
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => handleEmri(e.target.value)}
                value={emriProduktitUpdated}
                type="text"
                placeholder="Emri i produktit"
                autoFocus
              />
              {emriWarning && (
                <p
                  /*style={{color:"red"}}*/ className={`crudFormWarning ${
                    kategoriaWarning ? "fade-in" : ""
                  }`}
                >
                  {emriWarning}
                </p>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="crudForm.ProduktiPershkrimi"
            >
              <Form.Label>
                Pershkrimi i produktit
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => handlePershkrimi(e.target.value)}
                value={pershkrimiUpdated}
                type="text"
                placeholder="Pershkrimi i produktit"
                autoFocus
              />
              {pershkrimiWarning && (
                <p
                  /*style={{color:"red"}}*/ className={`crudFormWarning ${
                    pershkrimiWarning ? "fade-in" : ""
                  }`}
                >
                  {pershkrimiWarning}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.Foto">
              <Form.Label>Ndrysho foton</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFoto}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.ProduktiCmimi">
              <Form.Label>
                Cmimi i produktit
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => handleCmimi(e.target.value)}
                value={cmimiUpdated}
                step="0.01"
                min="0"
                placeholder="Enter price"
                autoFocus
              />
              {cmimiWarning && (
                <p
                  /*style={{color:"red"}}*/ className={`crudFormWarning ${
                    cmimiWarning ? "fade-in" : ""
                  }`}
                >
                  {cmimiWarning}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.ProduktiStoku">
              <Form.Label>
                Stoku i produktit
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => handleStoku(e.target.value)}
                value={stokuUpdated}
                min="0"
                placeholder="Enter price"
                autoFocus
              />
              {stokuWarning && (
                <p
                  /*style={{color:"red"}}*/ className={`crudFormWarning ${
                    stokuWarning ? "fade-in" : ""
                  }`}
                >
                  {stokuWarning}
                </p>
              )}
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="crudForm.neShitje">
            <div style={{display:"flex",justifyContent:"flex-start"}}>
              <Form.Label column sm={4}>
                Vendose ne shitje
              </Form.Label>
                <Switch
                  checked={neShitjeUpdated}
                  onChange={handleNeShitje}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#322b9c',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#322b9c', 
                    },
                  }}
                />
              </div>
              {/* <Form.Label column sm={3}>
                Ne Shitje
              </Form.Label>

              <Col sm={9}>
                <Form.Check
                  inline
                  reverse
                  type="radio"
                  label="Po"
                  name="neShitje"
                  value={true}
                  checked={neShitjeUpdated === true}
                  onChange={handleNeShitje}
                />
                <Form.Check
                  inline
                  reverse
                  type="radio"
                  label="Jo"
                  name="neShitje"
                  value={false}
                  checked={neShitjeUpdated === false}
                  onChange={handleNeShitje}
                />
              </Col> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.ProduktiKompania">
              <Button
                aria-controls="company-menu"
                aria-haspopup="true"
                onClick={handleKompania}
                variant="contained"
                className="crudDropdownButton produktetDropdownBtn"
              >
                {selectedKompaniaEmriUpdated}
                <FontAwesomeIcon icon={faCaretDown} />
              </Button>
              <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
              {kompaniaWarning && (
                <p
                  className={`crudFormWarning ${
                    kompaniaWarning ? "fade-in" : ""
                  }`}
                >
                  {kompaniaWarning}
                </p>
              )}
              <Menu
                id="company-menu"
                anchorEl={kompaniaAnchorEl}
                keepMounted
                open={Boolean(kompaniaAnchorEl)}
                onClose={handleCloseCompanies}
                className="crudDropdownList"
              >
                {kompanite.map((k) => (
                  <MenuItem
                    className="crudDropdownListItem"
                    key={
                      k.id
                    } /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                    onClick={() => handleCompanyMenuItemClick(k.id,k.emri)}
                  >
                    {k.emri}
                  </MenuItem>
                ))}
              </Menu>
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.ProduktiKategoria">
              <Button
                aria-controls="category-menu"
                aria-haspopup="true"
                onClick={handleKategoria}
                variant="contained"
                className="crudDropdownButton produktetDropdownBtn"
              >
                {selectedKategoriaEmriUpdated}
                <FontAwesomeIcon icon={faCaretDown} />
              </Button>
              <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
              {kategoriaWarning && (
                <p
                  className={`crudFormWarning ${
                    kategoriaWarning ? "fade-in" : ""
                  }`}
                >
                  {kategoriaWarning}
                </p>
              )}
              {selectedKategoriaIdUpdated && nenkategorite.length <= 0 && (
                <p className="crudFormWarning">
                  No subcategories available for the chosen category
                </p>
              )}
              <Menu
                id="category-menu"
                anchorEl={kategoriaAnchorEl}
                keepMounted
                open={Boolean(kategoriaAnchorEl)}
                onClose={handleCloseCategories}
                className="crudDropdownList"
              >
                {kategorite.map((k) => (
                  <MenuItem
                    className="crudDropdownListItem"
                    key={
                      k.id
                    } /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                    onClick={() => handleCategoryMenuItemClick(k.id,k.emri)}
                  >
                    {k.emri}
                  </MenuItem>
                ))}
              </Menu>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="crudForm.ProduktiNenkategoria"
            >
              <Button
                aria-controls="subcategory-menu"
                aria-haspopup="true"
                onClick={handleNenkategoria}
                variant="contained"
                className="crudDropdownButton produktetDropdownBtn"
                disabled={!selectedKategoriaIdUpdated}
              >
                {selectedNenkategoriaIdUpdated
                  ? selectedNenkategoriaEmriUpdated
                  : "Zgjedh nenkategorine "}
                <FontAwesomeIcon icon={faCaretDown} />
              </Button>
              <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
              {nenkategoriaWarning && (
                <p
                  className={`crudFormWarning ${
                    nenkategoriaWarning ? "fade-in" : ""
                  }`}
                >
                  {nenkategoriaWarning}
                </p>
              )}
              {nenkategorite.length > 0 && (
                <Menu
                  id="subcategory-menu"
                  anchorEl={nenkategoriaAnchorEl}
                  keepMounted
                  open={Boolean(nenkategoriaAnchorEl)}
                  onClose={handleCloseSubcategories}
                  className="crudDropdownList"
                >
                  {nenkategorite.map((k) => (
                    <MenuItem
                      className="crudDropdownListItem"
                      key={
                        k.id
                      } /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                      onClick={() => handleSubCategoryMenuItemClick(k.id,k.emri)}
                    >
                      {k.emri}
                    </MenuItem>
                  ))}
                </Menu>
              )}
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
           onClick={editoProduktin}
          >
            Ruaj  <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

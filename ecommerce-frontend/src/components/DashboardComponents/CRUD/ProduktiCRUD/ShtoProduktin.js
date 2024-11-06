import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";
import Switch from '@mui/material/Switch';


export default function ShtoProduktin(props) {
  // niher eshte e bome pa uploading te fotove !!!
  const [kategorite, setKategorite] = useState([]);
  const [nenkategorite, setNenkategorite] = useState([]);
  const [kompanite, setKompanite] = useState([]);
  const [selectedKategoria, setSelectedKategoria] = useState(null);
  const [selectedNenkategoria, setSelectedNenkategoria] = useState(null);
  const [selectedKompania, setSelectedKompania] = useState(null);
  const [emriProduktit, setEmriProduktit] = useState("");
  const [pershkrimi, setPershkrimi] = useState("");
  const [cmimi, setCmimi] = useState(0);
  const [stoku, setStoku] = useState(0);
  const [foto, setFoto] = useState(null);
  const [neShitje, setNeShitje] = useState(false);
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
      if (selectedKategoria) {
        axios
          .get(
            `https://localhost:7061/api/NenKategoria/shfaqNenkategoriseSipasKategorise/${selectedKategoria.id}`
          )
          .then((response) => {
            setNenkategorite(response.data);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [selectedKategoria]);

  const anulo = () => {
    props.mbyllShtoProduktin();
  };

  const handleEmri = (value) => {
    setEmriWarning("");
    setEmriProduktit(value);
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
    setPershkrimi(value);
  };

  const handleCmimi = (value) => {
    setCmimiWarning("");

    if (isNaN(value)) {
      // setCmimiWarning("Cmimi nuk eshte valid");
      setCmimi(null);
    } else if (parseFloat(value) < 0) {
      // setCmimiWarning("Cmimi nuk duhet te jete negativ");
      setCmimi(null);
    } else {
      const parsedValue = parseFloat(value);
      // if (!isNaN(parsedValue)) {
      setCmimi(parsedValue);
    }
  };

  const handleStoku = (value) => {
    setStokuWarning("");

    if (isNaN(value)) {
      setStoku(null);
    } else if (parseInt(value) < 0) {
      setStoku(null);
    } else {
      const parsedValue = parseInt(value, 10);
      // if (!isNaN(parsedValue) && parsedValue >= 0) {
      setStoku(parsedValue);
    }
  };

  const handleNeShitje = (event) => {
    setNeShitje(event.target.checked);
   // setNeShitje(event.target.value === "true");
  };

  const handleCompanyMenuItemClick = (kompania) => {
    setKompaniaWarning("");
    setNenkategoriaWarning("");
    setSelectedKompania(kompania);
    setKompaniaAnchorEl(null);
  };

  const handleCategoryMenuItemClick = (kategoria) => {
    setKategoriaWarning("");
    setSelectedKategoria(kategoria);
    setSelectedNenkategoria(null);
    // setNenkategoriaWarning("");
    setKategoriaAnchorEl(null);

    // if(nenkategorite.length<=0){
    //     setNenkategoriaWarning("Kjo kategori nuk permban asnje nenkategori.Zgjedh nje kategori tjeter.");
    // }
  };

  const handleSubCategoryMenuItemClick = (nenkategoria) => {
    setNenkategoriaWarning("");
    setSelectedNenkategoria(nenkategoria);
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
    setFoto(event.target.files[0]);
  };

  function validoFormen() {
    let validated = true;
    if (!emriProduktit || emriProduktit.trim() === "") {
      setEmriWarning("Emri i produktit nuk duhet te jete i zbrazet!");
      validated = false;
    }

    if (!pershkrimi || pershkrimi.trim() === "") {
      setPershkrimiWarning(
        "Pershkrimi i produktit nuk duhet te jete i zbrazet!"
      );
      validated = false;
    }

    if (!selectedKompania) {
      setKompaniaWarning("Duhet te zgjidhni patjeter nje kompani");
      validated = false;
    }

    if (!selectedKategoria) {
      setKategoriaWarning("Duhet te zgjidhni nje kategori patjeter!");
      validated = false;
    }

    if (!selectedNenkategoria) {
      setNenkategoriaWarning("Duhet te zgjidhni nje nenkategori patjeter!");
      validated = false;
    }
    if (cmimi === null || cmimi === undefined || isNaN(cmimi)) {
      setCmimiWarning("Cmimi nuk eshte valid!");
      validated = false;
    }
    if (stoku === null || stoku === undefined || isNaN(stoku)) {
      setStokuWarning("Stoku nuk eshte valid!");
      validated = false;
    }
    return validated;
  }

  async function shtoProduktin() {
    const isValid = validoFormen();

    if (isValid) {
      if (foto) {
        const fotoData = new FormData();
        fotoData.append("foto", foto);
        try {
          console.log("fotoja per tu shtuar: " + fotoData);
          await axios
            .post("https://localhost:7061/api/Produkti/shtoFoton", fotoData)
            .then(async (response) => {
              await axios
                .post("https://localhost:7061/api/Produkti/shtoProduktin", {
                  emri: emriProduktit,
                  foto: response.data,
                  pershkrimi: pershkrimi,
                  stoku: stoku,
                  cmimi: cmimi,
                  kompania_ID: selectedKompania.id,
                  kategoria_ID: selectedKategoria.id,
                  nenKategoria_ID: selectedNenkategoria.id,
                  neShitje: neShitje,
                })
                .then(async (response) => {
                  console.log(response);
                  props.refreshTeDhenat();
                  toast.success("Produkti eshte shtuar me sukses!");
                  props.mbyllShtoProduktin();
                })
                .catch((error) => {
                  console.log(error);
                });
            });
        } catch (err) {
          toast.error("Ndodhi nje problem ne server gjate shtimit te fotos");
          console.log(err);
        }
      } else {
        // nese eshte zgjedhur ndonje foto , boje upload pa foto
        axios
          .post("https://localhost:7061/api/Produkti/shtoProduktin", {
            emri: emriProduktit,
            pershkrimi: pershkrimi,
            stoku: stoku,
            cmimi: cmimi,
            kompania_ID: selectedKompania.id,
            kategoria_ID: selectedKategoria.id,
            nenKategoria_ID: selectedNenkategoria.id,
            neShitje: neShitje,
          })
          .then((response) => {
            console.log(response);
            props.refreshTeDhenat();
            toast.success("Produkti eshte shtuar me sukses!");
            props.mbyllShtoProduktin();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  return (
    <>
      <Modal
        /* show={props.shfaqFormen}*/ show={true}
        onHide={props.mbyllShtoProduktin}
        centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Shto Produktin e ri
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
                value={emriProduktit}
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
                value={pershkrimi}
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
              <Form.Label>Ngarko foton</Form.Label>
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
                value={cmimi}
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
                value={stoku}
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
                  checked={neShitje}
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
  
              {/* <Col sm={9}>
                <Form.Check
                  inline
                  reverse
                  type="radio"
                  label="Po"
                  name="neShitje"
                  value={true}
                  checked={neShitje === true}
                  onChange={handleNeShitje}
                />
                <Form.Check
                  inline
                  reverse
                  type="radio"
                  label="Jo"
                  name="neShitje"
                  value={false}
                  checked={neShitje === false}
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
                {selectedKompania ? selectedKompania.emri : "Zgjedh kompanine"}{" "}
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
                    onClick={() => handleCompanyMenuItemClick(k)}
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
                {selectedKategoria
                  ? selectedKategoria.emri
                  : "Zgjedh kategorine "}{" "}
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
              {selectedKategoria && nenkategorite.length <= 0 && (
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
                    onClick={() => handleCategoryMenuItemClick(k)}
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
                disabled={!selectedKategoria}
              >
                {selectedNenkategoria
                  ? selectedNenkategoria.emri
                  : "Zgjedh nenkategorine "}{" "}
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
                      onClick={() => handleSubCategoryMenuItemClick(k)}
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
          <Button
            className="crudFormeSubmitButoni"
            onClick={shtoProduktin}
            variant="contained"
          >
            Shto Produktin <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

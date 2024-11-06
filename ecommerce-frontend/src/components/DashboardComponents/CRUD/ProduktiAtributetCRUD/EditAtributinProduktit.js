import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function EditAtributinProduktit(props) {
  const [produktiAtributi, setAtributiProdukti] = useState({
    atributiId: 0,
    produktiId: 0,
    atributiValue: "",
  });
  const [attributeType,setAttributeType] = useState("");
  const [atributiOpsionet, setAtributiOpsionet] = useState([]);
  const [valueWarning, setValueWarning] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://localhost:7061/api/ProduktiAtributi/get-product-attribute/${props.id}`
      );
      setAtributiProdukti(response.data);
      const atributiResponse = await axios.get(
        `https://localhost:7061/api/Atributi/get-attribute/${response.data.atributiId}`
      );
      setAttributeType(atributiResponse.data.dataType);
      if (atributiResponse.data.dataType === "option-list") {
        const opsionetResponse = await axios.get(
          `https://localhost:7061/api/AtributiOption/get-options-sipas-atributit/${atributiResponse.data.id}`
        );
        setAtributiOpsionet(opsionetResponse.data);
      }
    };

    fetchData();
  }, [props.id]);

  const anulo = () => {
    props.mbyllEdit();
  };

  const handleChange = (e) => {
    setAtributiProdukti({
      ...produktiAtributi,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpsioni = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (a) => {
    setAtributiProdukti({
      ...produktiAtributi,
      atributiValue: a.optionValue,
    });
    setAnchorEl(null);
  };

  function validoFormen() {
    let validated = true;
    if (
      !produktiAtributi.atributiValue ||
      produktiAtributi.atributiValue.trim() === ""
    ) {
      setValueWarning("Vlera e atributit nuk duhet te jete e zbrazet!");
      validated = false;
    }

    return validated;
  }

  async function editAtributin(){
      const isValid = validoFormen();
      if(isValid)
      {
          try {
             const response = await axios
              .put(`https://localhost:7061/api/ProduktiAtributi/edit-product-attribute/${props.id}`,produktiAtributi)
                console.log(response);
                props.refreshTeDhenat();
                toast.success(response.data);
                props.mbyllEdit();
            } catch (err) {
                  toast.error("Ndodhi nje problem ne server");
                  console.log(err);
            }
      }
  }

  return (
    <>
      <Modal
        show={true}
        onHide={props.mbyllEdit}
        contentClassName="custom-modal-content"
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Perditeso Vleren e Atributit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {attributeType === 'option-list'  ? (
              <Form.Group
                className="mb-3"
                controlId="crudForm.opsionetDropdown"
              >
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleOpsioni}
                  variant="contained"
                  className="crudDropdownButton"
                >
                  {produktiAtributi.atributiValue
                    ? produktiAtributi.atributiValue
                    : "Zgjedh nje opsion"}{" "}
                  <FontAwesomeIcon icon={faCaretDown} />
                </Button>
                <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className="crudDropdownList"
                >
                  {atributiOpsionet.map((a) => (
                    <MenuItem
                      className="crudDropdownListItem"
                      key={a.id}
                      onClick={() => handleMenuItemClick(a)}
                    >
                      {a.optionValue}
                    </MenuItem>
                  ))}
                </Menu>
              </Form.Group>
            ) : (
              <Form.Group className="mb-3" controlId="crudForm.KategoriaEmri">
                <Form.Label>
                  Vlera <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  name="atributiValue"
                  onChange={(e) => {
                    handleChange(e);
                    setValueWarning("");
                  }}
                  value={produktiAtributi.atributiValue}
                  type={attributeType === 'text'? "text":"number"}
                  placeholder="Vendos vleren e atributit..."
                  autoFocus
                />
              </Form.Group>
            )}
            {valueWarning && (
              <p className={`crudFormWarning ${valueWarning ? "fade-in" : ""}`}>
                {valueWarning}
              </p>
            )}
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
            onClick={editAtributin}
            variant="contained"
          >
            Ruaj <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

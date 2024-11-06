import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";

export default function ShtoAtributinProduktit(props) {
  const [attributes, setAttributes] = useState([]);
  const [atributetDropdown, setAtributetDropdown] = useState([]);
  const [optionsByAttribute, setOptionsByAttribute] = useState({});
  const [anchorEls, setAnchorEls] = useState([]);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7061/api/ProduktiAtributi/get-available-attributes/${props.id}`
        );
        setAtributetDropdown(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props.id]); //produktiId

  const handleChange = (e, index) => {
    const newAttributes = [...attributes];
    attributes[index].value = e.target.value;
    setAttributes(newAttributes);
  };

  const handleAtributetClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const handleZgjedhAtributin = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleZgjedhOpsionin = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = async (atributiZgjedhur) => {
    const updatedAttributes = [
      ...attributes,
      {
        id: atributiZgjedhur.id,
        name: atributiZgjedhur.name,
        dataType: atributiZgjedhur.dataType,
        value: "",
      },
    ];

    const newIndex = updatedAttributes.length - 1; // Get the index of the newly added attribute
    setAttributes(updatedAttributes);

    const updatedDropdown = atributetDropdown.filter(
      (a) => a.id !== atributiZgjedhur.id
    );
    setAtributetDropdown(updatedDropdown);
    setAnchorEl(null);

    if (atributiZgjedhur.dataType === "option-list") {
      try {
        const response = await axios.get(
          `https://localhost:7061/api/AtributiOption/get-options-sipas-atributit/${atributiZgjedhur.id}`
        );
        setOptionsByAttribute((prevOptions) => ({
          ...prevOptions,
          [newIndex]: response.data, // Store options by attribute ID
        }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleOptionMenuItemClick = (selectedOption, index) => {
    const newAttributes = [...attributes];
    attributes[index].value = selectedOption.optionValue;
    setAttributes(newAttributes);
    handleAtributetClose(index);
  };

  const anulo = () => {
    props.mbyllShto();
  };

  function validoFormen() {
    let validated = true;
    for (const input of attributes) {
      if (!input.value || input.value.trim() === "") {
        setError("Sigurohu qe te gjitha input fields te jene te plotesuara!");
        validated = false;
      }
    }

    return validated;
  }

  async function shtoAtributet() {
    const isValid = validoFormen();

    if (isValid) {
      const transformedAttributes = attributes.map((attribute) => ({
        atributiValue: attribute.value,
        produktiId: props.id,
        atributiId: attribute.id,
      }));

      //console.log(transformedAttributes);

      try {
        const response = await axios.post(
          "https://localhost:7061/api/ProduktiAtributi/add-product-attributes",
          transformedAttributes
        );
        console.log(response);
        props.refreshTeDhenat();
        toast.success(response.data);
        props.mbyllShto();
      } catch (err) {
        toast.error("Ndodhi nje problem ne server");
        console.log(err);
      }
    }
  }
  return (
    <>
      <Modal show={true} onHide={props.mbyllShto} centered>
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Shto Atributet e reja
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="crudForm.NenkategoriaPershkrimi"
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleZgjedhAtributin}
                disabled={atributetDropdown.length === 0}
                variant="contained"
                className="crudDropdownButton"
              >
                {atributetDropdown.length !== 0
                  ? "Perzgjedh atributin per te shtuar"
                  : "Nuk ka me atribute ne dispozicion"}{" "}
                <FontAwesomeIcon icon={faCaretDown} />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="crudDropdownList"
              >
                {atributetDropdown.map((a) => (
                  <MenuItem
                    className="crudDropdownListItem"
                    key={a.id}
                    onClick={() => handleMenuItemClick(a)}
                  >
                    {a.name}({a.dataType})
                  </MenuItem>
                ))}
              </Menu>
            </Form.Group>
            {attributes.map((at, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Label>
                  {at.name} <span style={{ color: "red" }}>*</span>
                </Form.Label>
                {at.dataType === "option-list" ? (
                  <div>
                    <Button
                      aria-controls={`simple-menu-${index}`}
                      aria-haspopup="true"
                      onClick={(e) => handleZgjedhOpsionin(e, index)}
                      variant="contained"
                      className="crudDropdownButton"
                    >
                      {at.value ? at.value : "Zgjedh një opsion"}{" "}
                      <FontAwesomeIcon icon={faCaretDown} />
                    </Button>
                    <Menu
                      id={`simple-menu-${index}`}
                      anchorEl={anchorEls[index]} // Use the corresponding anchorEl
                      keepMounted
                      open={Boolean(anchorEls[index])}
                      onClose={() => handleAtributetClose(index)}
                      className="crudDropdownList"
                    >
                      {optionsByAttribute[index]?.map((option, idx) => (
                        <MenuItem
                          className="crudDropdownListItem"
                          key={idx}
                          onClick={() =>
                            handleOptionMenuItemClick(option, index)
                          }
                        >
                          {option.optionValue}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                ) : (
                  <>
                    <Form.Control
                      onChange={(e) => {
                        handleChange(e, index);
                      }}
                      value={attributes[index].value}
                      type={at.dataType}
                      placeholder="Enter value"
                      autoFocus
                    />
                  </>
                )}
              </Form.Group>
            ))}
          </Form>
          {error && (
            <Alert
              style={{
                marginTop: "10px",
                backgroundColor: "darkred",
                fontWeight: "bold",
              }}
            >
              {error}
            </Alert>
          )}
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
            onClick={shtoAtributet}
            variant="contained"
            disabled={attributes.length === 0}
          >
            Shto Atributet <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload,faXmark } from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuItem } from "@mui/material";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";

export default function CreateReport(props) {
  const [selectedType, setSelectedType] = useState("");
  const reportTypes = ["excel", "csv", "html"];
  const [anchorEl, setAnchorEl] = useState(null);
  const fileExtensions = {
    excel: 'xlsx',
    csv: 'csv',
    html: 'html'
 };
  const handleOpsioni = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (type) => {
    setSelectedType(type);
    setAnchorEl(null);
  };

  const anulo = () => {
    props.mbyllShto();
  };

  const createReport = async () => {
    const headers = props.headers;
    const rows = 
     props.rows
    const tableData = {
      Headers: headers,
      Rows: rows,
    };


    try {
      const response = await axios.post(
        `https://localhost:7061/api/Reports/${selectedType}`,
        tableData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report.${ fileExtensions[selectedType] || selectedType}`);  // Default to the selectedType for extension
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
      props.mbyllShto();
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <>
      <Modal show={true} onHide={props.mbyllShto} centered>
        <Modal.Header>
          <Modal.Title className="crudFormLabel">Generate Report</Modal.Title>
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
                onClick={handleOpsioni}
                variant="contained"
                className="crudDropdownButton"
              >
                {selectedType ? selectedType : "Choose report type"}{" "}
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
                {reportTypes.map((type, index) => (
                  <MenuItem
                    className="crudDropdownListItem"
                    key={index}
                    onClick={() => handleMenuItemClick(type)}
                  >
                    {type}
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
            Cancel <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button
            className="crudFormeSubmitButoni"
            disabled={!selectedType}
            onClick={createReport}
            variant="contained"
          >
            Download Report <FontAwesomeIcon icon={faDownload} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

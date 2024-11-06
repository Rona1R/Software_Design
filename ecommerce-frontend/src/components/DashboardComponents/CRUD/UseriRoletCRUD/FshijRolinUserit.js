import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark ,faCaretDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";
import Alert from 'react-bootstrap/Alert';

export default function FshijRolinUserit(props) { // props.aspNetUserId , 
  const [useriEmri,setUseriEmri] = useState('');
  const [roletDropdown,setRoletDropdown] = useState([]);
  const [roliToDelete,setRoliToDelete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState('');
 

  useEffect(()=>{
    if(props.aspNetUserId)
    {
        try{
            axios
            .get(`https://localhost:7061/api/UseriRolet/getAspNetUser/${props.aspNetUserId}`)
            .then((response)=>{
                setUseriEmri(response.data.userName);
            })

        }catch(error){
            if(error.response && error.response.status === 400)
            {
                setError(error.response.data);
            }
        }
    }
  },[props.aspNetUserId])

  useEffect(()=>{
    if(props.aspNetUserId)
    {
        try{
            axios
            .get(`https://localhost:7061/api/UseriRolet/shfaqRoletPerTuFshire/${props.aspNetUserId}`)
            .then((response)=>{
                setRoletDropdown(response.data);
            })

        }catch(error){
            if(error.response && error.response.status === 400)
            {
                setError(error.response.data);
            }
        }
    }
  },[props.aspNetUserId])

  const anulo = () => {
    props.mbyllFshij();
  };

  const handleRoli = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (roli)=>{
    setError('');
    setRoliToDelete(roli);
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  function validoFormen(){
    let validated = true;

    if(!roliToDelete){
        setError("Roli duhet te perzgjedhet patjeter");
        validated = false;
    }

    return validated;
  }

  async function fshijRolinUserit(){
    const isValid = validoFormen();

    if(isValid){
        try{
           const response = await 
            axios.delete(`https://localhost:7061/api/UseriRolet/largoRolinPerdoruesit/${props.aspNetUserId}`,{
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    roli: roliToDelete
                }
            })
            // .then((response)=>{
                if(response.status && response.status === 200)
                {
                    toast.success(response.data);
                }
                props.mbyllFshij();
                props.refreshTeDhenat();
            // })
    
        }catch(err){
            toast.error("Ndodhi nje problem ne server");
            console.log(err);
        }
    }

  } 

  return (
    <>
      <Modal
        show={true}
        onHide={props.mbyllFshij}
        centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Fshij Rolin Perdoruesit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Perdoruesi
              </Form.Label>
              <Form.Control
                value={useriEmri}
                type="text"
                autoFocus
                readOnly
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleRoli}
                variant="contained"
                className="crudDropdownButton"
                disabled = {roletDropdown.length === 0}
              >
                {roletDropdown.length>0 ? (roliToDelete || "Perzgjedh rolin per ta larguar"):("Nuk ka role te tjera ne dispozicion!")} <FontAwesomeIcon icon={faCaretDown}/>
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
                    roletDropdown.map((roli,index)=>(
                        <MenuItem className="crudDropdownListItem" key={index} /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                        onClick={() => handleMenuItemClick(roli)}
                        >{roli}
                        </MenuItem>
                    ))
                }
              </Menu>
            </Form.Group>
          </Form>
          {error && <Alert  style={{ marginTop: '10px' ,backgroundColor:"darkred",fontWeight:"bold"}}>{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={anulo}
            className="crudFormAnuloButoni"
          >
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button className="crudFshijButoni" variant="contained"
            onClick={fshijRolinUserit}
          >
            FshijRolin  <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark ,faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";
import Alert from 'react-bootstrap/Alert';


export default function EditUserBadge(props) {
  const [username,setUsername] = useState("");
  const [userBadge,setUserBadge] = useState("");
  const [badgeId,setBadgeId] = useState(null);
  const [badges,setBadges] = useState([]); // badges per dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState("");
 
 
  useEffect(()=>{
    try{
        axios.get(`https://localhost:7061/api/User/User-Details/${props.id}`)
        .then((response)=>{
            setUsername(response.data.userName);
            setUserBadge(response.data.badgeName);
            setBadgeId(response.data.badgeId);
        })

    }catch(error){
        console.log(error);
    }
  },[props.id])


  
  useEffect(
    () => {
      try {
        axios
          .get("https://localhost:7061/api/AchievementBadge/shfaqBadges")
          .then((response) => {
            setBadges(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  const anulo = () => {
    props.mbyllEdit();
  };

  const handleBadge = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (id,emri)=>{
    setError("");
    setUserBadge(emri);
    setBadgeId(id);
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const validoFormen = ()=>{
    let validated = true;
    if(badgeId === null)
    {
        setError("Badge duhet te zgjedhet gjithsesi per te ruajtur ndryshimet!")
        validated = false;
    }
    return validated;

  }
  async function editoUserBadge(){
         const isValid = validoFormen();
         if(isValid)
        {
            try {
                const response = await axios
                .put(`https://localhost:7061/api/User/changeAchievementBadge/${props.id}/${badgeId}`)
                // .then((response) => {
                  if(response.status === 200)
                  {
                      toast.success(response.data);
                      props.refreshTeDhenat();
                      props.mbyllEdit();
                  }
                // });
              } catch (err) {
                toast.error("Ndodhi nje problem ne server");
                setError(err);
                console.log(err);
              }
        }
        
  }

  return (
    <>
      <Modal
        show={true}
        onHide={props.mbyllEdit}
        centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Perditeso User Badge 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Perdoruesi
              </Form.Label>
              <Form.Control
                value={username}
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
                onClick={handleBadge}
                variant="contained"
                className="crudDropdownButton"
              >
                {userBadge} <FontAwesomeIcon icon={faCaretDown}/>
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
                    badges.map((b)=>(
                        <MenuItem className="crudDropdownListItem" key={b.badge_Id} /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                        onClick={() => handleMenuItemClick(b.badge_Id,b.badge_Name)}
                        >{b.badge_Name}
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
          <Button className="crudFormeSubmitButoni" variant="contained"
            onClick={editoUserBadge}
          >
            Ruaj  <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

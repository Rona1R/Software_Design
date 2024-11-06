import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faTrash,faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";

export default function RemoveVideo(props) {
    const [videoData,setVideoData] = useState([]);
    const [video,setVideo] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    
    useEffect(()=>{
        try{
            axios.get("https://localhost:7061/api/HomeVideo/getVideot")
            .then((response)=>{
                setVideoData(response.data);
            })
        }catch(err){
            console.log(err);
        }
    })
    
    const handleMenuItemClick = (video)=>{
        setVideo(video);
        setAnchorEl(null);
    }

    async function fshijVideon(){
        if(video){
            try {
                const response = await axios
                .delete(`https://localhost:7061/api/HomeVideo/fshiVideon/${video.id}`
                 )
           
                  console.log(response);
                  props.refreshTeDhenat();
                  props.mbyllFshij();
                  toast.success("Videoja eshte fshire me sukses!");
             
              } catch (err) {
                toast.error("Ndodhi nje problem ne server");
                console.log(err);
              }
         }
    }

    const handleVideo = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () =>{
        setAnchorEl(null);
    }
    

    return (
    <>
        <Modal show={true} onHide={() => props.mbyllFshij()} centered>
            <Modal.Header closeButton>
                <Modal.Title className="crudFshijLabel">Perzgjedh videon per te fshire:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group
              className="mb-3"
              controlId="crudForm.videoDropdown"
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleVideo}
                variant="contained"
                className="crudDropdownButton"
              >
                {video? video.videoUrl : "Zgjedh Videon"} <FontAwesomeIcon icon={faCaretDown}/>
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
                    videoData.map((video)=>(
                        <MenuItem className="crudDropdownListItem" key={video.id} /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                        onClick={() => handleMenuItemClick(video)}
                        >{video.videoUrl}
                        </MenuItem>
                    ))
                }
              </Menu>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.mbyllFshij()} className="crudFormAnuloButoni">
                    Anulo <FontAwesomeIcon icon={faXmark} />
                </Button>
                <Button
                    className="crudFshijButoni"
                    onClick={fshijVideon}
                    disabled={video === null}
                >
                    Fshij Videon <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

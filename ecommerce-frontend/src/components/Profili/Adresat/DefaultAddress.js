import axios from "axios";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

export default function DefaultAdress(props) {    
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [adresa,setAdresa] = useState("");
    const [zipCode, setZipCode] = useState("");
    const loggedUser = JSON.parse(localStorage.getItem('userDetails'));

    
    useEffect(()=>{
      // if(userId){
        try{
          if (!loggedUser) return;

            axios.get(`https://localhost:7061/api/Adresa/listoAdresat/${parseInt(loggedUser.userId)}`)
            .then((response)=>{
               const defaultAdresa = response.data.find(a=>a.isDefault === true);
               if(defaultAdresa){
                setAdresa(defaultAdresa.adresaUserit);
                setSelectedCountry(defaultAdresa.shteti);
                setSelectedCity(defaultAdresa.qyteti);
                setZipCode(defaultAdresa.zipKodi);
               }
            }) 

        }catch(error){
            console.log(error);
        }
      // }
    },[loggedUser])

    const anulo =()=>{
        props.mbyll();
    }
    return (
    <>
      <Modal 
      show = {true} onHide={props.mbyll}
      centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">Default Adresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            selectedCountry === "" && selectedCity ==="" && zipCode ===""
            && adresa === "" ?
            <p style={{fontSize:"larger",fontWeight:"bold"}}>
                Asnje Adrese ekzistuese nuk eshte specifikuar si default.
                Per nje Checkout me te shpejte,ju rekomandojme qe te vendosni nje adrese si default.
            </p> :(
            <Form>
            <Form.Group className="mb-3" controlId="crudForm.Emri">
                <Form.Label>
                    Adresa  
                </Form.Label>
                <Form.Control
                value={adresa}
                type="text"
                readOnly
                />
                </Form.Group>
                <Form.Group controlId="selectCountry">
                <Form.Label>
                    Country: 
                </Form.Label>
                <Form.Control
                value={selectedCountry}
                type="text"
                readOnly
                />
                </Form.Group>
                <Form.Group controlId="selectCity">
                <Form.Label>
                    City: 
                <Form.Control
                value={selectedCity}
                type="text"
                readOnly
                />
                </Form.Label>

                </Form.Group>
                <Form.Group controlId="formZipCode">
                <Form.Label>
                    Zip Code:
                </Form.Label>
                <Form.Control
                    type="text"
                    value={zipCode}
                    readOnly
                />
                </Form.Group>
            </Form>
            )
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={anulo} className="crudFormAnuloButoni">
            Mbyll <FontAwesomeIcon icon={faXmark} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import { useState} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import { Switch } from "@mui/material";
import Alert from 'react-bootstrap/Alert';

const kosovoCities = [
    { id: 1, name: "Deçan" },
    { id: 2, name: "Dragash" },
    { id: 3, name: "Ferizaj" },
    { id: 4, name: "Fushë Kosovë" },
    { id: 5, name: "Gjakovë" },
    { id: 6, name: "Gjilan" },
    { id: 7, name: "Gllogovc" },
    { id: 8, name: "Graçanicë" },
    { id: 9, name: "Hani i Elezit" },
    { id: 10, name: "Istog" },
    { id: 11, name: "Kaçanik" },
    { id: 12, name: "Klinë" },
    { id: 13, name: "Kllokot" },
    { id: 14, name: "Leposaviq" },
    { id: 15, name: "Lipjan" },
    { id: 16, name: "Malishevë" },
    { id: 17, name: "Mitrovicë" },
    { id: 18, name: "Novobërdë" },
    { id: 19, name: "Obiliq" },
    { id: 20, name: "Partesh" },
    { id: 21, name: "Pejë" },
    { id: 22, name: "Podujevë" },
    { id: 23, name: "Pristina" },
    { id: 24, name: "Prizren" },
    { id: 25, name: "Rahovec" },
    { id: 26, name: "Ranillug" },
    { id: 27, name: "Shtime" },
    { id: 28, name: "Shtërpcë" },
    { id: 29, name: "Skenderaj" },
    { id: 30, name: "Suharekë" },
    { id: 31, name: "Viti" },
    { id: 32, name: "Vushtrri" },
    { id: 33, name: "Zubin Potok" },
    { id: 34, name: "Zveçan" }
  ];




export default function AddAdress(props) {
    const [useDefaultAdress,setUseDefaultAdress] = useState(false);
  
    const [selectedCountry, setSelectedCountry] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [adresa,setAdresa] = useState("");
    const [zipCode, setZipCode] = useState("");
    
    const [zipCodeValid,setZipCodeValid] = useState(true);
    const [countryWarning,setCountryWarning] = useState("");
    const [cityWarning,setCityWarning] = useState("");
    const [zipCodeWarning,setZipCodeWarning] = useState("");
    const [adresaWarning,setAdresaWarning] = useState("");
    const [error, setError] = useState('');
    const loggedUser = JSON.parse(localStorage.getItem('userDetails'));


    const additionalCountry = [
        {
          value : "Kosova",
          label:"Kosova"
        }
      ]
    const countriesOptions = countryList().getData();
    const countries = [...additionalCountry,...countriesOptions]
    
     const anulo=()=>{
       props.mbyllShto();
     }
      
    const handleCountryChange = (country) => {
      setCountryWarning("");
      setSelectedCity("");
     
  
      setSelectedCountry(country);
      if(country !== "" && country !== "Kosova"){
        fetchCitiesForCountry(country);
      }
  
      if(country === "Kosova"){
        setCities(kosovoCities);
      }
    };
  
    const handleCityChange = (city) => {
      setCityWarning("");
      setSelectedCity(city);
    };
  
    const handleAdresaChange=(adresa)=>{
      setAdresaWarning("");
      setAdresa(adresa);
    }
  
    const handleUseDefaultAdress=(e)=>{
      setUseDefaultAdress(e.target.checked);
    }
  
    const handleZipCodeChange = (zip) => {
      setZipCodeWarning("");
      setZipCode(zip);
      const pattern = /^[0-9]{4,5}(-[0-9]{4})?$/;
      setZipCodeValid(pattern.test(zip));  
    }

    const fetchCitiesForCountry = async (countryCode) => {
        const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/cities`, {
          headers: {
            'X-CSCAPI-KEY': 'UWhGbnVFMlFmR3ZVeWZSQW1KcUNwVEY5aWVQMGEyeGJDSGNsYUNuVw=='
          }
    })   
    const data = await response.json();
    setCities(data.map(city => ({ id: city.id, name: city.name }))); 
    }; 

    const validoFormen = () =>{
        let validated = true;
   
        if(!zipCodeValid){
          validated = false;
        }
        if(!selectedCountry){
          setCountryWarning("Duhet te zgjedhni patjeter shtetin!");
          validated = false;
        }
    
        if(selectedCity.trim()===""){
          setCityWarning("Duhet te zgjedhni patjeter qytetin!");
          validated = false;
        }
    
        if(adresa.trim()===""){
          setAdresaWarning("Duhet te vendosni patjeter adresen!");
          validated = false;
        }
    
        return validated;
      }
    

    async function shtoAdresen(){
        const isValid = validoFormen();

    
        if(isValid && loggedUser){
            try {
                const response = await
                axios
                .post("https://localhost:7061/api/Adresa/shtoAdresen",{
                    adresa: adresa,
                    shteti: selectedCountry,
                    qyteti: selectedCity,
                    zipKodi : zipCode,
                    isDefault: useDefaultAdress,
                    userId : loggedUser.userId
                })
                // .then((response) => {

                  console.log(response);
              
                  props.mbyllShto();
                  toast.success("Adresa eshte shtuar me sukses!");
                // });
              } catch (error) {
                if (error.response && error.response.status === 400) { // BACKEND VALIDIMI
                    setError(error.response.data);
                    console.log(error.response.data);
                  } else {
                    setError('An unexpected error occurred.');
                  }
              }
        }

    }

    return (
    <>
      <Modal 
      show = {true} onHide={props.mbyllShto}
      centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">Shto Adresen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="crudForm.Emri">
              <Form.Label>
                Adresa  <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
               value={adresa}
               placeholder="e.g., 123 Main Street"
               type="text"
               onChange={(e) => handleAdresaChange(e.target.value)}
               required
               />
              {adresaWarning && (
                 <p className={`crudFormWarning ${adresaWarning ? 'fade-in' : ''}`}>
                 {adresaWarning}
                 </p>
                 )
              }
            </Form.Group>
            <Form.Group controlId="selectCountry">
              <Form.Label>
                Select Country: <span style={{ color: "red" }}>*</span>
                <select
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="userDropdownList"
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </Form.Label>
              {countryWarning && (
                 <p className={`crudFormWarning ${countryWarning ? 'fade-in' : ''}`}>
                 {countryWarning}
                 </p>
                 )
              }
            </Form.Group>
            <Form.Group controlId="selectCity">
              <Form.Label>
                Select City: <span style={{ color: "red" }}>*</span>
                <select
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="userDropdownList"
                  disabled={!selectedCountry}
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </Form.Label>
              {cityWarning && (
                 <p className={`crudFormWarning ${cityWarning ? 'fade-in' : ''}`}>
                 {cityWarning}
                 </p>
                 )
              }
            </Form.Group>
            <Form.Group controlId="formZipCode">
              <Form.Label>
                Zip Code <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zip code"
                value={zipCode}
                onChange={(e)=>handleZipCodeChange(e.target.value)}
                isInvalid={!zipCodeValid}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid zip code.
              </Form.Control.Feedback>
              {zipCodeWarning && (
                 <p className={`crudFormWarning ${zipCodeWarning? 'fade-in' : ''}`}>
                 {zipCodeWarning}
                 </p>
                 )
              }
            </Form.Group>
            <div style={{display:"flex",justifyContent:"flex-start"}}>
                <Form.Label column sm={5}>
                  Perdore si default adrese
                </Form.Label>
                <Form.Group controlId="formBasicCheckbox">
                  <Switch
                  checked={useDefaultAdress}
                  onChange={handleUseDefaultAdress}
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
              </Form.Group>
              </div>
          </Form>
          {error && <Alert  style={{ marginTop: '10px' ,backgroundColor:"darkred",fontWeight:"bold"}}>{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={anulo} className="crudFormAnuloButoni">
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button className="crudFormeSubmitButoni" variant="contained"
            onClick={shtoAdresen}
          >
            Shto Adresen <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

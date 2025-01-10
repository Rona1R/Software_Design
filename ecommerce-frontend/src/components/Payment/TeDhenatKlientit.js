import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCaretDown, faL } from "@fortawesome/free-solid-svg-icons";
import countryList from "react-select-country-list";
import {
  faCreditCard,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCart } from "context/CartProvider";
import ProductPopUp from "components/ProductComponents/ProductPopUp";
import ConfirmationModal from "./ConfirmationModal";

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
  { id: 34, name: "Zveçan" },
];
export default function TeDhenatKlientit(props) {
  const [showCheckoutModal, setShowCheckoutModal] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  // const [klientiID, setKlientiID] = useState(null);
  const [emri, setEmri] = useState("");
  const [email, setEmail] = useState("");
  const [nrTel, setNrTel] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [adresa, setAdresa] = useState("");
  const [zipCode, setZipCode] = useState("");
  // const [nrTelTest, setNrTelTest] = useState("");

  const [zipCodeValid, setZipCodeValid] = useState(true);
  // const [nrTelValid, setNrTelValid] = useState(true);

  const [nrTelWarning, setNrTelWarning] = useState("");
  const [countryWarning, setCountryWarning] = useState("");
  const [cityWarning, setCityWarning] = useState("");
  const [zipCodeWarning, setZipCodeWarning] = useState("");
  const [adresaWarning, setAdresaWarning] = useState("");
  const [adresatDropdown, setAdresatDropdown] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const loggedUser = JSON.parse(localStorage.getItem("userDetails"));
  // useEffect(() => {
  //   if (loggedUser) {
  //     setKlientiID(parseInt(loggedUser.userId));
  //   }
  // }, [loggedUser]);

  useEffect(() => {
    if (loggedUser.userId) {
      try {
        axios
          .get(
            `https://localhost:7061/api/User/User-Checkout-Details/${loggedUser.userId}`
          )
          .then((response) => {
            setEmri(response.data.userName);
            setEmail(response.data.email);
            setNrTel(response.data.phoneNumber);
            setAdresatDropdown(response.data.adresat);
            const defaultAdresa = response.data.adresat.find(
              (a) => a.isDefault
            );
            if (defaultAdresa) {
              // Nese ka default adrese , me i mbush fields paraprakisht me te dhenat e default adreses:
              setAdresa(defaultAdresa.adresaUserit);
              handleCountryChange(defaultAdresa.shteti);
              setSelectedCity(defaultAdresa.qyteti);
              setZipCode(defaultAdresa.zipKodi);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [loggedUser.userId]);

  const additionalCountry = [
    {
      value: "Kosova",
      label: "Kosova",
    },
  ];
  const countriesOptions = countryList().getData();
  const countries = [...additionalCountry, ...countriesOptions];

  const handleNrTelChange = (numri) => {
    console.log("Numri i telefonit eshte: " + numri);

    setNrTelWarning("");
    setNrTel(numri);
  };
  // const handleNrTel = (numri) => {
  //   setNrTelWarning("");
  //   const pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/;
  //   setNrTelValid(pattern.test(numri));
  //   setNrTel(numri);
  // };

  const handleCountryChange = (country) => {
    setCountryWarning("");

    setSelectedCity("");

    setSelectedCountry(country);
    if (country !== "" && country !== "Kosova") {
      fetchCitiesForCountry(country);
    }

    if (country === "Kosova") {
      setCities(kosovoCities);
    }
  };

  const handleCityChange = (city) => {
    setCityWarning("");
    setSelectedCity(city);
  };

  const handleAdresaChange = (adresa) => {
    setAdresaWarning("");
    setAdresa(adresa);
  };

  const handleZipCodeChange = (zip) => {
    setZipCodeWarning("");
    setZipCode(zip);
    const pattern = /^[0-9]{4,5}(-[0-9]{4})?$/;
    setZipCodeValid(pattern.test(zip));
  };

  const handleAdresa = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (adresaUserit, shteti, qyteti, zipKodi) => {
    setAdresaWarning("");
    setCountryWarning("");
    setZipCodeWarning("");
    setCityWarning("");

    setAdresa(adresaUserit);
    handleCountryChange(shteti);
    setSelectedCity(qyteti);
    setZipCode(zipKodi);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const validoFormen = () => {
    let validated = true;
    if (!nrTel || nrTel.trim() === "") {
      setNrTelWarning("Numri i telefonit nuk duhet te jete i zbrazet!");
      validated = false;
    }

    // if (!nrTelValid) {
    //   validated = false;
    // }

    if (!zipCodeValid) {
      validated = false;
    }
    if (!selectedCountry) {
      setCountryWarning("Duhet te zgjedhni patjeter shtetin!");
      validated = false;
    }

    if (selectedCity.trim() === "") {
      setCityWarning("Duhet te zgjedhni patjeter qytetin!");
      validated = false;
    }

    if (adresa.trim() === "") {
      setAdresaWarning("Duhet te vendosni patjeter adresen!");
      validated = false;
    }

    return validated;
  };

  function vazhdoPagesen() {
    const isValid = validoFormen();

    if (isValid) {
      console.log(
        "Te dhenat jane valide, mund te vazhdoni me kompletim te pageses!"
      );
      navigate("/Checkout", {
        state: {
          orderData: { nrTel, selectedCountry, selectedCity, zipCode, adresa },
        },
      });
    } else {
      console.log("Te dhenat jane jo valide, nuk mund te vazhdoni te paguani!");
    }
  }
  const fetchCitiesForCountry = async (countryCode) => {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY":
            "UWhGbnVFMlFmR3ZVeWZSQW1KcUNwVEY5aWVQMGEyeGJDSGNsYUNuVw==",
        },
      }
    );
    const data = await response.json();
    setCities(data.map((city) => ({ id: city.id, name: city.name })));
  };

  const handleKonfirmimin = () => {
    const isValid = validoFormen();
    if (isValid) {
      setShowCheckoutModal(false);
      setShowConfirmationModal(true);
    }
  };

  async function paguajPasPranimit() {
    // const isValid = validoFormen();

    // if (isValid) {
    try {
      const response = await axios.post(
        "https://localhost:7061/api/Porosia/shtoPorosine",
        {
          nrProdukteve: state.cartItems.length,
          cmimiTotal: parseFloat(props.cmimiTotalMeTvsh),
          adresa: adresa,
          shteti: selectedCountry,
          metodaPageses: "Pas Pranimit",
          qyteti: selectedCity,
          nrKontaktues: nrTel,
          zipKodi: String(zipCode),
          userId: loggedUser.userId,
          items: state.cartItems.map((item) => ({
            sasia: item.sasia,
            produktiId: item.id,
            cmimi: item.cmimiBaze,
          })),
        }
      );
      const porosiaVendosurId = response.data;
      dispatch({ type: "EMPTY_CART" });
      navigate(
        "/checkout-success",
        { state: { porosiaVendosurId } },
        { replace: true }
      );
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setShowCheckoutModal(false);
        setShowConfirmationModal(false);
        setErrorMessage(error.response.data);
        setShowErrorPopUp(true);
        console.log(error.response.data);
      } else {
        console.log("Unexpected error occured.");
      }
    }
    // }
  }
  return (
    <>
      <ProductPopUp
        show={showErrorPopUp}
        onHide={() => setShowErrorPopUp(false)}
        notificationType={errorMessage}
        error="true"
      />

      <Modal show={showCheckoutModal} onHide={props.mbyllTeDhenat} centered>
        <Modal.Header>
          <Modal.Title className="crudFormLabel">Checkout Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="crudForm.Emri">
              <Form.Label>Username</Form.Label>
              <Form.Control value={emri} type="text" readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.Email">
              <Form.Label>Email</Form.Label>
              <Form.Control value={email} type="text" readOnly />
            </Form.Group>
            <Form.Group controlId="formTestPhoneNumber" id="phoneNumberTest">
              <Form.Label>
                Phone Number<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <PhoneInput
                country={"xk"} // default country
                value={nrTel}
                onChange={(nrTel) => handleNrTelChange(nrTel)}
                inputStyle={{ width: "100%" }}
              />
              {nrTelWarning && (
                <p
                  className={`crudFormWarning ${nrTelWarning ? "fade-in" : ""}`}
                >
                  {nrTelWarning}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.Emri">
              <Form.Label>
                Adresa <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                value={adresa}
                placeholder="e.g., 123 Main Street"
                type="text"
                onChange={(e) => handleAdresaChange(e.target.value)}
                required
              />
              {adresaWarning && (
                <p
                  className={`crudFormWarning ${
                    adresaWarning ? "fade-in" : ""
                  }`}
                >
                  {adresaWarning}
                </p>
              )}
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
                <p
                  className={`crudFormWarning ${
                    countryWarning ? "fade-in" : ""
                  }`}
                >
                  {countryWarning}
                </p>
              )}
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
                <p
                  className={`crudFormWarning ${cityWarning ? "fade-in" : ""}`}
                >
                  {cityWarning}
                </p>
              )}
            </Form.Group>
            <Form.Group controlId="formZipCode">
              <Form.Label>
                Zip Code <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zip code"
                value={zipCode}
                onChange={(e) => handleZipCodeChange(e.target.value)}
                isInvalid={!zipCodeValid}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid zip code.
              </Form.Control.Feedback>
              {zipCodeWarning && (
                <p
                  className={`crudFormWarning ${
                    zipCodeWarning ? "fade-in" : ""
                  }`}
                >
                  {zipCodeWarning}
                </p>
              )}
            </Form.Group>
            {adresatDropdown.length > 0 && (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                style={{ marginTop: "10px" }}
              >
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleAdresa}
                  variant="contained"
                  className="crudDropdownButton"
                >
                  Perzgjedh nga adresat e ruajtura
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
                  {adresatDropdown.map((k, index) => (
                    <MenuItem
                      className="crudDropdownListItem"
                      key={
                        index
                      } /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                      onClick={() =>
                        handleMenuItemClick(
                          k.adresaUserit,
                          k.shteti,
                          k.qyteti,
                          k.zipKodi
                        )
                      }
                    >
                      {k.adresaUserit},{k.shteti},{k.qyteti},{k.zipKodi}
                    </MenuItem>
                  ))}
                </Menu>
              </Form.Group>
            )}
          </Form>
          <Form.Group controlId="metodaPageses">
            <Form.Label>Perzgjedh metoden e pageses</Form.Label>
            <div className="pagesa-butonat">
              <Button
                className="crudFormeSubmitButoni"
                onClick={handleKonfirmimin}
                variant="contained"
              >
                Paguaj Pas Pranimit <FontAwesomeIcon icon={faMoneyBillWave} />
              </Button>
              <Button
                className="crudFormeSubmitButoni"
                onClick={vazhdoPagesen}
                variant="contained"
              >
                Paguaj Me Stripe <FontAwesomeIcon icon={faCreditCard} />
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={props.mbyllTeDhenat}
            className="crudFormAnuloButoni"
          >
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmationModal
        showConfirmationModal={showConfirmationModal}
        closeConfirmationModal={() => setShowConfirmationModal(false)}
        openCheckout={() => setShowCheckoutModal(true)}
        vendosPorosine={paguajPasPranimit}
      />
    </>
  );
}

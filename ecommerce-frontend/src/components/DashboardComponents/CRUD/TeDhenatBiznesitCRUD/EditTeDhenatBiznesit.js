import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";

export default function EditTeDhenatBiznesit(props) {
  const [emri, setEmri] = useState("");
  const [email, setEmail] = useState("");
  const [nrTel, setNrTel] = useState("");
  const [instagram,setInstagram] = useState("");
  const [twitter,setTwitter] = useState("");
  const [linkedin,setLinkedin] = useState("");
  const [facebook,setFacebook] = useState("");
  const [emriWarning, setEmriWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [nrTelWarning, setNrTelWarning] = useState("");
  const [linkWarning,setLinkWarning] = useState("");

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7061/api/TeDhenatBiznesit/getTeDhenat")
        .then((response) => {
          setEmri(response.data.emriBiznesit);
          setEmail(response.data.emailBiznesit);
          setNrTel(response.data.nrKontaktues);
          setInstagram(response.data.instagramLink);
          setFacebook(response.data.facebookLink);
          setTwitter(response.data.twitterLink);
          setLinkedin(response.data.linkedInLink);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleEmri = (value) => {
    setEmriWarning("");
    setEmri(value);
  };

  const handleEmail = (email) => {
    setEmailWarning("");
    const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    setEmailValid(pattern.test(email));
    setEmail(email);
  };

  const handleNrTelChange = (nrTel) => {
    setNrTelWarning("");
    setNrTel(nrTel);
  };

  const anulo = () => {
    props.mbyllEdit();
  };

  function validoFormen(){
      let validated=true;
      if (!emri || emri.trim() === "") {
          setEmriWarning("Emri i biznesit nuk duhet te jete i zbrazet!");
          validated = false;
      }

      if(!emailValid){
        validated = false;
      }

      if (!email || email.trim() === "") {
        setEmailWarning("Email e biznesit nuk duhet te jete e zbrazet!");
        validated = false;
    }

    if (!email || email.trim() === "") {
        setEmailWarning("Email e biznesit nuk duhet te jete e zbrazet!");
        validated = false;
    }

    if (!nrTel || nrTel.trim() === "") {
        setNrTelWarning("Numri i telefonit nuk duhet te jete i zbrazet!");
        validated = false;
    }

    if (!instagram || instagram.trim() === "" || !twitter|| twitter.trim() === "" 
    || !linkedin || linkedin.trim() === ""  || !facebook || facebook.trim() === ""
    ) {
      setLinkWarning("Sigurohu qe te te gjithe link-at te jene te mbushur!");
      validated = false;
  }

    return validated;
  }

  async function editoTeDhenat(){
      const isValid = validoFormen();

      if(isValid){
          try {
              await axios
              .put("https://localhost:7061/api/TeDhenatBiznesit/perditesoTeDhenat",{
                  emriBiznesit: emri,
                  emailBiznesit: email,
                  nrKontaktit: nrTel,
                  instagram:instagram,
                  twitter:twitter,
                  linkedin:linkedin,
                  facebook:facebook
              })
              // .then(() => {
                props.refreshTeDhenat();
                props.mbyllEdit();
                toast.success("Te dhenat e biznesit jane perditesuar me sukses!");

              // });
            } catch (err) {
              toast.error("Ndodhi nje problem ne server");
              console.log(err);
            }
      }

  }

  return (
    <>
      <Modal
        /* show={props.shfaqFormenEdit}*/ show={true}
        onHide={props.mbyllEdit}
        centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Perditeso te dhenat e biznesit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="crudForm.Emri">
              <Form.Label>
                Emri i biznesit <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => handleEmri(e.target.value)}
                value={emri}
                type="text"
                placeholder="emri biznesit"
                autoFocus
              />
              {emriWarning && (
                <p
                  className={`crudFormWarning ${emriWarning ? "fade-in" : ""}`}
                >
                  {emriWarning}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.Email">
              <Form.Label>
                Email <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => handleEmail(e.target.value)}
                value={email}
                type="text"
                isInvalid={!emailValid}
                placeholder="example@gmail.com"
              />
              <Form.Control.Feedback type="invalid">
                Vendos nje email valide ne formatin example@gmail.com!
              </Form.Control.Feedback>
              {emailWarning && (
                <p
                  className={`crudFormWarning ${emailWarning ? "fade-in" : ""}`}
                >
                  {emailWarning}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.NrTel">
              <Form.Label>
                NrTel <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <PhoneInput
                country={"xk"}
                value={nrTel}
                onChange={(nrTel) => handleNrTelChange(nrTel)}
                inputStyle={{
                  width: "100%",
                  height: "40px",
                  borderColor: "#655CDB",
                }}
              />
              {nrTelWarning && (
                <p
                  className={`crudFormWarning ${nrTelWarning ? "fade-in" : ""}`}
                >
                  {nrTelWarning}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.Email">
              <Form.Label>
                Instagram Link<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => setInstagram(e.target.value)}
                value={instagram}
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.Email">
              <Form.Label>
                Twitter Link<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => setTwitter(e.target.value)}
                value={twitter}
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.Email">
              <Form.Label>
                Facebook Link<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => setFacebook(e.target.value)}
                value={facebook}
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.Email">
              <Form.Label>
                LinkedIn Link<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
                type="text"
                required
              />
            </Form.Group>
            {linkWarning && (
                <p
                  className={`crudFormWarning ${linkWarning ? "fade-in" : ""}`}
                >
                  {linkWarning}
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
            variant="contained"
            onClick={editoTeDhenat}
          >
            Ruaj <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

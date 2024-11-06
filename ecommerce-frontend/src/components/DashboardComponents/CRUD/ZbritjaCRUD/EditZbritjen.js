import { useState,useEffect} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import dayjs from 'dayjs';
dayjs.extend(advancedFormat);

export default function EditZbritjen(props) {

    const [emriZbritjes,setEmriZbritjes] = useState("");
    const [perqindjaZbritjes,setPerqindjaZbritjes] = useState(10);
    const [dataSkadimit,setDataSkadimit] = useState(null);

    const [emriWarning,setEmriWarning] = useState("");
    const [perqindjaWarning,setPerqindjaWarning] = useState("");
    const [datetimeWarning,setDatetimeWarning] = useState("");

    const now = dayjs();

    useEffect(()=>{
        try {
            axios
            .get(`https://localhost:7061/api/Zbritja/shfaqZbritjen/${props.id}`)
            .then((response) => {
              setEmriZbritjes(response.data.zbritjaEmri);
              setPerqindjaZbritjes(response.data.perqindjaZbritjes);
              setDataSkadimit(dayjs(response.data.dataSkadimit));
            });
          } catch (err) {
            console.log(err);
          }
    },[props.id])

    const anulo=()=>{
      props.mbyllEditZbritjen();
    }

    const handleEmri =(value)=>{
        setEmriWarning("");
        setEmriZbritjes(value);
    }

    const handlePerqindja= (value) => {
        setPerqindjaWarning("");
    
        if (isNaN(value)) {
          setPerqindjaZbritjes(null);
        } else if (parseInt(value) < 0) {
          setPerqindjaZbritjes(null);
        } else {
          const parsedValue = parseInt(value, 10);
          // if (!isNaN(parsedValue) && parsedValue >= 0) {
          setPerqindjaZbritjes(parsedValue);
        }
      };
      
    const handleDateTime = (newDateTime) => {
        setDatetimeWarning("");
        setDataSkadimit(newDateTime);
      };

    function validoFormen(){
        let validated=true;
        if (!emriZbritjes || emriZbritjes.trim() === "") {
            setEmriWarning("Emri i zbritjes nuk duhet te jete i zbrazet!");
            validated = false;
        }
    
        if (perqindjaZbritjes === null || perqindjaZbritjes=== undefined || isNaN(perqindjaZbritjes)) {
            setPerqindjaZbritjes("Perqindja nuk eshte valide!");
            validated = false;
          }

        if (dataSkadimit == null) {
          setDatetimeWarning("Duhet te zgjedhni patjeter daten e skadimit!");
          validated = false;
        } else if (dataSkadimit.isBefore(now)) {
          setDatetimeWarning("Data e skadimit duhet te jete pas kohes aktuale!");
          validated = false;
        }
        return validated
    }

    async function editoZbritjen(){
        const isValid = validoFormen();

        if(isValid){
          const timezoneOffset = new Date().getTimezoneOffset() * 60000; 
          const adjustedISODateString = new Date(dataSkadimit - timezoneOffset).toISOString().split('.')[0];

            // console.log("Te dhenat e formes jane valide:");
            // console.log({zbritjaEmri:emriZbritjes,perqindjaZbritjes: perqindjaZbritjes,dataSkadimit:isoDateString});
            try {
                await axios
                .put(`https://localhost:7061/api/Zbritja/perditesoZbritjen/${props.id}`,
                    {zbritjaEmri:emriZbritjes,
                    perqindjaZbritjes: perqindjaZbritjes,
                    dataSkadimit:adjustedISODateString}
                )
                // .then(() => {
                  props.refreshTeDhenat();
                  toast.success("Zbritja eshte perditesuar me sukses!");
                  props.mbyllEditZbritjen();
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
     show = {true} onHide={props.mbyllEditZbritjen}
      centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Perditeso Zbritjen
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3"
             controlId="crudForm.ZbritjaEmri"
            >
              <Form.Label>
                Lloji i Zbritjes<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e)=> handleEmri(e.target.value)}
                value={emriZbritjes}
                type="text"
                placeholder="Lloji i zbritjes"
                autoFocus
              />
              {
              emriWarning&& (
                 <p /*style={{color:"red"}}*/  className={`crudFormWarning ${emriWarning ? 'fade-in' : ''}`}>
                 {emriWarning}
                 </p>
                 )
              }
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.Perqindja">
              <Form.Label>
                Perqindja e zbritjes
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => handlePerqindja(e.target.value)}
                value={perqindjaZbritjes}
                min="0"
                placeholder="Cakto perqindjen"
                autoFocus
              />
              {perqindjaWarning && (
                <p
                  /*style={{color:"red"}}*/ className={`crudFormWarning ${
                    perqindjaZbritjes? "fade-in" : ""
                  }`}
                >
                  {perqindjaWarning}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="crudForm.dateTime">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    
                        <DateTimePicker
                        minDateTime={now}
                        label={
                            <span>
                              Perzgjedh daten e Skadimit <span style={{ color: 'red' }}>*</span>
                            </span>
                          }
                        value={dataSkadimit}
                        onChange={handleDateTime}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                {datetimeWarning && (
                <p
                  /*style={{color:"red"}}*/ className={`crudFormWarning ${
                    datetimeWarning? "fade-in" : ""
                  }`}
                >
                  {datetimeWarning}
                </p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={anulo} className="crudFormAnuloButoni">
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button className="crudFormeSubmitButoni" 
           onClick={editoZbritjen}
           variant="contained"
          >
              Ruaj  <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import "../Style/SavedAdresses.css";
import { TailSpin } from "react-loader-spinner";
import { faPenToSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import EditAddress from "./EditAddress";
import FshijAddress from "./FshijAddress";


export default function SavedAdresses() {
  const loggedUser = JSON.parse(localStorage.getItem('userDetails'));
  const [adresat, setAdresat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shfaqEdit,setShfaqEdit] = useState(false);
  const [shfaqDelete,setShfaqDelete] = useState(false);
  const [addressToEditId,setAdressToEditId] = useState(null);
  const [addressToDeleteId,setAdressToDeleteId] = useState(null);
  const [refreshKey,setRefreshKey] = useState("");



  useEffect(() => {
    // if(userId){
      try {
        if (!loggedUser) return;

        axios
          .get(`https://localhost:7061/api/Adresa/listoAdresat/${parseInt(loggedUser.userId)}`)
          .then((response) => {
            setAdresat(response.data);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    // }
  }, [refreshKey]);

  const handleEdit=(adresa)=>{
    setAdressToEditId(adresa);
    setShfaqEdit(true);
  }

  const handleDelete=(adresa)=>{
    setAdressToDeleteId(adresa);
    setShfaqDelete(true);
  }

  return (
    <div className="adress-container">
      {
        shfaqEdit && (
          <EditAddress 
           adresaId = {addressToEditId}
           mbyllEdit = {()=>setShfaqEdit(false)}
           refreshTeDhenat = {()=>setRefreshKey(Date.now())}
          />
        )
      }

      {
        shfaqDelete && (
          <FshijAddress 
            adresaId = {addressToDeleteId}
            mbyllFshij = {()=>setShfaqDelete(false)}
            refreshTeDhenat = {()=>setRefreshKey(Date.now())}
          />
        )
      }

      {loading ? (
        <div>
          <TailSpin
            height="260"
            width="120"
            color="#322b9c"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : adresat.length > 0 ? (
        adresat.map((adresa,index) => (
          <div className="address-block" key={index}>
            <div className="crud-funksionet">
              <Button
                sx={{
                  backgroundColor: "inherit",
                  "&:hover": { backgroundColor: "inherit" },
                  padding: 0,
                  minWidth: "auto",
                }}
                onClick={()=>handleEdit(adresa.adresa_Id)}
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ color: "#000004",fontSize:"23px",marginRight:"15px"}}
                />
              </Button>
              <Button
                sx={{
                  backgroundColor: "inherit",
                  "&:hover": { backgroundColor: "inherit" },
                  padding: 0,
                  minWidth: "auto",
                }}
                onClick={()=>handleDelete(adresa.adresa_Id)}
              >
                <FontAwesomeIcon
                  icon={faX}
                  style={{ color: "#000004",fontSize:"23px" }}
                />
              </Button>
            </div>
            <div>
              <p className="address-line">{adresa.adresaUserit}</p>
              <p className="address-line">{adresa.shteti}</p>
              <p className="address-line">{adresa.qyteti}</p>
              <p className="address-line">{adresa.zipKodi}</p>
              <p className="address-default">
                {adresa.isDefault ? "Default Adresa" : ""}{" "}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-address-block">
          <div>Nuk keni shtuar ndonje Adrese!</div>
        </div>
      )}
    </div>
  );
}

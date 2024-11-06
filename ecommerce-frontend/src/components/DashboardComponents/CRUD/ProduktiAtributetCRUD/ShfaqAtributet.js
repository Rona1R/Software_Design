import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { TailSpin } from "react-loader-spinner";
import AttributeTable from "./AtributetTable";
import FshijAtributinProduktit from "./FshijAtributinProduktit";
import EditAtributinProduktit from "./EditAtributinProduktit";

export default function ShfaqAtributet(props) {
  const [produktiMeAtribute, setProduktiMeAtribute] = useState(null);
  const [shfaqFshij,setShfaqFshij] = useState(false);
  const [shfaqEdito,setShfaqEdito] = useState(false);
  const [prodAtributiId,setProdAtributiId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey,setRefreshKey] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://localhost:7061/api/ProduktiAtributi/get-product-attributes/${props.id}`
      );
      setProduktiMeAtribute(response.data);
      setLoading(false);
    };

    fetchData();
  }, [props.id,refreshKey]);

  const handleAtributiEdit=(id)=>{
    setProdAtributiId(id);
    setShfaqEdito(true);
  }

  const handleAtributiDelete=(id)=>{
    setProdAtributiId(id);
    setShfaqFshij(true);
  }
  return (
    <>
      <Modal show={true} onHide={props.mbyllShfaq} centered> 
        <Modal.Header closeButton>
          <Modal.Title className="crudFormLabel">
            {produktiMeAtribute && produktiMeAtribute.emriProdukti}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="loading">
              <TailSpin
                height="80"
                width="80"
                color="#322b9c"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            // produktiMeAtribute &&
            produktiMeAtribute.atributet.length > 0 ? (
              <AttributeTable 
                kaFunksione = {true}
                atributet = {produktiMeAtribute.atributet}
                handleEdit={handleAtributiEdit}
                handleDelete={handleAtributiDelete}
              />
            ):(
                <div  style={{ height: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <p style={{color:"#000004",fontWeight:"bold",fontSize:"larger"}}>No Additional Information is available for this product</p>
                </div>
            )
          )}
        </Modal.Body>
      </Modal>

      {
        shfaqFshij && (
          <FshijAtributinProduktit 
            id = {prodAtributiId}
            mbyllFshij={()=>setShfaqFshij(false)}
            refreshTeDhenat={()=>setRefreshKey(Date.now())}
          />
        )
      }

      {
        shfaqEdito && (
          <EditAtributinProduktit 
            id={prodAtributiId}
            mbyllEdit={()=>setShfaqEdito(false)}
            refreshTeDhenat={()=>setRefreshKey(Date.now())}
          />
        )
      }
    </>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import AttributeTable from "components/DashboardComponents/CRUD/ProduktiAtributetCRUD/AtributetTable";
import { TailSpin } from "react-loader-spinner";

export default function AttributesTab(props) {
  const [produktiMeAtribute, setProduktiMeAtribute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
    if(props.id){
        const response = await axios.get(
          `https://localhost:7061/api/ProduktiAtributi/get-product-attributes/${props.id}`
        );
        setProduktiMeAtribute(response.data);
        setLoading(false);
      };
    }

    fetchData();
  }, [props.id]);

  return (
    <>
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
            produktiMeAtribute.atributet.length > 0 ? (
              <div> 
                <AttributeTable 
                  kaFunksione = {false}
                  atributet = {produktiMeAtribute.atributet}
                />
              </div>
            ):(
                <div  style={{ height: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <p style={{color:"#000004",fontWeight:"bold",fontSize:"larger"}}>No Additional Information is available for this product</p>
                </div>
            )
          )}
    </>
  );
}

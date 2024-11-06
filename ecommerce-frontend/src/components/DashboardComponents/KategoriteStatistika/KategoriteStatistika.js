import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import "./KategoriaStatistika.css";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import { useState, useEffect } from "react";

export default function KategoriteStatistika() {
  console.log("Kategoria Rendered !!");
  const [kategoriteNrProdukteve, setKategoriteNrProdukteve] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () =>{
      try {
       const response = await axios
          .get("https://localhost:7061/api/Statistika/getKategoriStatistika")
          // .then((response) => {
            if(response && response.status === 200){
              setKategoriteNrProdukteve(response.data);
              setLoading(false);
            }
          // });
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
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
        <div style={{ width: '100%' }}> 
          <PieChart
            series={[
              {
                data: kategoriteNrProdukteve,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              },
            ]}
            height={200}
        />
        </div>
      )}
    </>
  );
}

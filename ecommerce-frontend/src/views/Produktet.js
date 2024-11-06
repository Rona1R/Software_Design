import TabelaProdukteve from "components/DashboardComponents/Tables/TabelaProdukteve";
import "../components/DashboardComponents/DashboardStyles/Dashboard.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import TabelaAtributeve from "components/DashboardComponents/Tables/TabelaAtributeve";

export default function Produktet() {
  const [value, setValue] = useState("tabelaProdukteve"); // value per tabs

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          sx={{ 
               '& .MuiTab-root': {
                 color: 'black', 
                 fontWeight:'bold',
                 '&.Mui-selected': {
                   color: '#322b9c', 
                 },
               },
               '& .MuiTabs-indicator': {
                 backgroundColor: '#322b9c',
               },
             }}
        >
          <Tab value="tabelaProdukteve" label="Produktet" />
          <Tab value="tabelaAtributeve" label="Atributet" />
        </Tabs>
      </Box>
     <div className="tabelat">
               {value === "tabelaProdukteve" &&
                    <TabelaProdukteve />
               }
               
               {value === "tabelaAtributeve" &&
                    <TabelaAtributeve/>
               }
     </div>
    </>
  );
}

import "../components/DashboardComponents/DashboardStyles/Dashboard.css";
import TabelaZbritjeve from "components/DashboardComponents/Tables/TabelaZbritjeve";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import TabelaLlojeveZbritjeve from "components/DashboardComponents/Tables/TabelaLlojeveZbritjeve";

export default function Zbritjet() {
  const [value, setValue] = useState("tabelaZbritjev"); // value per tabs

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
          <Tab value="tabelaZbritjev" label="Zbritjet" />
          <Tab value="tabelaLlojevZbritjev" label="Llojet e Zbritjeve" />
        </Tabs>
      </Box>
     <div className="tabelat">

               {value === "tabelaZbritjev" && 
                    <TabelaZbritjeve />          
               }

               {
                value === "tabelaLlojevZbritjev" && 
                (
                  <TabelaLlojeveZbritjeve />
                )
               }
     </div>
    </>
  );
}

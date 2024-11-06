import TabelaKategorive from "components/DashboardComponents/Tables/TabelaKategorive";
import TabelaNenKategorive from "components/DashboardComponents/Tables/TabelaNenKategorive";
import "../components/DashboardComponents/DashboardStyles/Dashboard.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";


export default function Kategorite() {
  const [value, setValue] = useState("tabelaKategorive"); // value per tabs

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
          <Tab value="tabelaKategorive" label="Kategorite" />
          <Tab value="tabelaNenKategorive" label="Nen-kategorite" />
        </Tabs>
      </Box>
     <div className="tabelat">
               {value === "tabelaKategorive" && 
                    <TabelaKategorive />
               }

               {value === "tabelaNenKategorive" && 
                    <TabelaNenKategorive />
               }
     </div>
    </>
  );
}

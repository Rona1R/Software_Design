import React, { useState } from "react";
import TabelaPerdoruesve from "components/DashboardComponents/Tables/TabelaPerdoruesve";
import "components/DashboardComponents/DashboardStyles/Dashboard.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabelaBadges from "components/DashboardComponents/Tables/TabelaBadges";

function Perdoruesit() {
  // Add state to manage the selected tab
  const [value, setValue] = useState("tabelaPerdoruesve");

  // Handle tab change
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
              fontWeight: 'bold',
              '&.Mui-selected': {
                color: '#322b9c', 
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#322b9c',
            },
          }}
        >
          <Tab value="tabelaPerdoruesve" label="Perdoruesit" />
          <Tab value="tabelaBadges" label="Achievement Badges" />
        </Tabs>
      </Box>
      <div className="tabelat">
        {value === "tabelaPerdoruesve" && <TabelaPerdoruesve />}
        {value === "tabelaBadges" && <TabelaBadges />}
      </div>
    </>
  );
}

export default Perdoruesit;



// import React from "react";
// // import DataG from "components/DashboardComponents/Tables/DataGridDemo";
// import TabelaPerdoruesve from "components/DashboardComponents/Tables/TabelaPerdoruesve";
// import "components/DashboardComponents/DashboardStyles/Dashboard.css";

// function Perdoruesit() {
//   return (
//     <>
//       <h3 className="tableTitle">Perdoruesit</h3>
//       <TabelaPerdoruesve />
//     </>
//   );
// }

// export default Perdoruesit;

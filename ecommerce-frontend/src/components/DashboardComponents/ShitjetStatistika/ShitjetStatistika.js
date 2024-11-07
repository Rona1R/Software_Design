import { BarChart } from "@mui/x-charts/BarChart";
import { Dropdown } from "react-bootstrap";
import { useState,useEffect } from "react";
import "./ShitjetStatistika.css";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";


const ShitjetStatistika = () => {
  console.log("Shitjet Rendered !!");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years,setYears] = useState(null);
  const [shitjetMujore,setShitjetMujore] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get(`https://localhost:7061/api/Statistika/getSaleStatistics/${selectedYear}`)
        // .then((response)=>{
          if(response && response.status === 200){
            setYears(response.data.availableYears);
            setShitjetMujore(response.data.result);
            setLoading(false);
          }
        // })
      }catch(error){
        console.log(error);
      }
    }

    fetchData();
  },[selectedYear])

  //const years = ['2023','2022','2021'];

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    // Add any additional logic you want to execute when a year is selected
    console.log(`Selected year: ${year}`);
  };

  const chartSetting = {
    xAxis: [
      {
        label: "numri i Produkteve",
      },
    ],
    width: 400,
    height: 400,
  };
  const valueFormatter = (value) => `${value} produkte`;

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
          <div style={{ width: '100%' }}> 
          <div className="filterByYear">
            <p className="card-category">Filter By Year</p>
            
            <Dropdown className="dropdown-year">
              <Dropdown.Toggle id="dropdown-year">
                {selectedYear}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {years.map((year) => (
                  <Dropdown.Item key={year} onClick={() => handleYearSelect(year)}>
                    {year}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ width: '100%' }}> 
            <BarChart
              dataset={shitjetMujore}
              yAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[
                {
                  dataKey: "numriProdukteve",
                  label: `Shitjet ${selectedYear}`,
                  valueFormatter,
                },
              ]}
              layout="horizontal"
              {...chartSetting}
            />
          </div>
          </div>    )}
    </>
  );
};

export default ShitjetStatistika;
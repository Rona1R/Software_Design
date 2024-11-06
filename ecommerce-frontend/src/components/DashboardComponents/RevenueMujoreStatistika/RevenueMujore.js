import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";

const valueFormatter = (value) => `${value} €`;

export default function RevenueMujore() {
  console.log("Revenue rendered !!");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState(null);
  const [revenueMujoreData, setRevenueMujoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7061/api/Statistika/getMonthlyRevenueStatistics/${selectedYear}`
        );
        // .then((response) => {
        if (response && response.status === 200) {
          setYears(response.data.availableYears);
          setRevenueMujoreData(response.data.result);
          setLoading(false);
        }
        // });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedYear]);

  // const years = ["2023", "2022", "2021"];

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  const chartSetting = {
    yAxis: [
      {
        label: "amount (€)",
      },
    ],
    series: [
      {
        dataKey: "totali",
        label: `Fitimet mujore ${selectedYear}`,
        valueFormatter,
        color: "#665DDB",
      },
    ],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

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
        <div style={{ width: "100%" }}>
          <div className="filterByYear">
            <p className="card-category">Filter By Year</p>
            <Dropdown className="dropdown-year">
              <Dropdown.Toggle id="dropdown-year">
                {selectedYear}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {years.map((year) => (
                  <Dropdown.Item
                    key={year}
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ width: "100%"}}>
            <BarChart
              dataset={revenueMujoreData}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              {...chartSetting}
            />
          </div>
        </div>
      )}
    </>
  );
}

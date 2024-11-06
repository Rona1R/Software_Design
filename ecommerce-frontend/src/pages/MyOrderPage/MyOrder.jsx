import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import SideNav from "pages/Home/SideNav/SideNav";
import Footer from "pages/Home/Footer";
import BreadcrumbComponent from "../../components/Additional/BreadcrumbComponent";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import "./MyOrder.css";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


export default function MyOrder() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showReset, setShowReset] = useState(false);
  const [porosite, setPorosite] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loggedUser = JSON.parse(localStorage.getItem("userDetails"));


  useEffect(() => {
    // if(userId){
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7061/api/Porosia/shfaqPorositeSipasPerdoruesit/${parseInt(loggedUser.userId)}`
        );
        setPorosite(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    // }
  }, [loggedUser]);

  useEffect(() => {
    if (startDate || endDate) {
      const filtered = porosite.filter((item) => {
        const itemDate = new Date(item.dataPorosise);
        return (
          (!startDate || itemDate >= new Date(startDate)) &&
          (!endDate || itemDate <= new Date(endDate))
        );
      });
      setFilteredData(filtered);
      setShowReset(true);
    } else {
      setFilteredData(porosite);
      setShowReset(false);
    }
  }, [startDate, endDate, porosite]);

  const handleNavigoTeFatura = (porosiaId) => {
    navigate(`/Fatura/${porosiaId}`);
  };

  const columns = [
    {
      field: "porosiaID",
      headerName: "Porosia ID",
      width: 90,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "dataPorosise",
      headerName: "Data e Porosise",
      width: 250,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => {
        const date = new Date(params.value + "Z");
        const formattedDate = date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }); //.format(date);
        return <>{formattedDate}</>;
      },
    },
    {
      field: "totali",
      headerName: "Totali € (me tvsh)",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "metodaPageses",
      headerName: "Metoda Pageses",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "adresaDerguese",
      headerName: "Adresa",
      width: 250,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => {
        const adresaData = params.row.adresaDerguese;
        return (
          <>
            {adresaData.adresa},{adresaData.qyteti},{adresaData.shteti}
          </>
        );
      },
    },
    {
      field: "statusi",
      headerName: "Statusi",
      width: 250,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "detajetPorosise",
      headerName: "Detajet e Porosise",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleNavigoTeFatura(params.id)}
          sx={{
            backgroundColor: "purple",
            "&:hover": {
              backgroundColor: "#4b0082",
            },
          }}
        >
          Shiko Faturen
          <i className="fa-regular fa-eye" style={{ paddingLeft: "4px" }}></i>
        </Button>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
  ];
  const totalWidth = columns.reduce(
    (acc, column) => acc + (column.width || 0),
    0
  );
  return (
    <div className="orderPage-body">
      <SideNav />
     
      <div className="orderPage">
      <div className="BreadcrumbContainer" style={{paddingTop:"10px"}} >
          <BreadcrumbComponent
            path={[{ pageType: "OrderPage", emri: "My Orders" }]}
          />
        </div>
        <div className="myOrders">
          <h1 className="loved" style={{fontSize:"3em"}}>
            Porosite e mija
            <FontAwesomeIcon
              icon={faCreditCard}
              style={{ paddingLeft: "10px" }}
            />
          </h1>
          <hr className="title-divider" />
        </div>
        {loading ? (
          <div className="loading productsPageLoader">
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
        ) : (
          <div className="orders-tabela-wrapper">
            {porosite.length !== 0 ? (
              <>
                <h3 className="filter-title">Filtro Sipas Dates</h3>
                <div
                  className="filter-options"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      slots={{ textField: TextField }}
                    />
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      slots={{ textField: TextField }}
                    />
                  </LocalizationProvider>
                  {showReset && (
                    <Button
                      className="reseto-date-filters"
                      onClick={() => {
                        setStartDate(null);
                        setEndDate(null);
                      }}
                    >
                      Reseto filtrat
                    </Button>
                  )}
                </div>

                <Box sx={{ width: "100%", overflowX: "auto" }}>
                  <Box sx={{ width: totalWidth + 50, margin: "0 auto" }}>
                    <DataGrid
                      rows={filteredData}
                      columns={columns}
                      getRowId={(row) => row.porosiaID}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                          },
                        },
                      }}
                      pageSizeOptions={[5, 10, 15]}
                      autoHeight
                      // checkboxSelection
                      disableRowSelectionOnClick
                      getRowClassName={(params) => `super-app-theme--row`}
                    />
                  </Box>
                </Box>
              </>
            ):(
              <div className="no-orders-yet">
                  <p>No Orders , yet</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

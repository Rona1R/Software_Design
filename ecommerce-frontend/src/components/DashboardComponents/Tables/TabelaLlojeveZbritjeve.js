import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "./TableStyles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import ShtoZbritjen from "../CRUD/ZbritjaCRUD/ShtoZbritjen";
import FshijZbritjen from "../CRUD/ZbritjaCRUD/FshijZbritjen";
import EditZbritjen from "../CRUD/ZbritjaCRUD/EditZbritjen";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function TabelaLlojeveZbritjeve() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showReset, setShowReset] = useState(false);

  const [llojetZbritjeve, setLlojetZbritjeve] = useState([]);
  const [shfaqShto, setShfaqShto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [zbritjaToDeleteId, setZbritjaToDeleteId] = useState(null);
  const [shfaqFshij, setShfaqFshij] = useState(false);
  const [zbritjaToEditId, setZbritjaToEditId] = useState(null);
  const [shfaqEdit, setShfaqEdit] = useState(false);
  const [refreshKey, setRefreshKey] = useState("");

  useEffect(() => {
    try {
      // setLoading(true);
      axios
        .get("https://localhost:7061/api/Zbritja/shfaqZbritjet")
        .then((response) => {
          setLlojetZbritjeve(response.data);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [refreshKey]);

  useEffect(() => {
    if (startDate || endDate) {
      const filtered = llojetZbritjeve.filter((item) => {
        const itemDate = new Date(item.dataKrijimit);
        const skadon = new Date(item.dataSkadimit);
        return (
          (!startDate || itemDate >= new Date(startDate)) &&
          (!endDate || skadon <= new Date(endDate))
        );
      });
      setFilteredData(filtered);
      setShowReset(true);
    } else {
      setFilteredData(llojetZbritjeve);
      setShowReset(false);
    }
  }, [startDate, endDate, llojetZbritjeve]);

  const handleEditClick = (id) => {
    setZbritjaToEditId(id);
    setShfaqEdit(true);
  };

  const handleDeleteClick = (id) => {
    setZbritjaToDeleteId(id);
    setShfaqFshij(true);
  };

  const columns = [
    {
      field: "zbritja_ID",
      headerName: "Zbritja ID",
      width: 100,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "zbritjaEmri",
      headerName: "Lloji i Zbritjes",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "perqindjaZbritjes",
      headerName: "Perqindja e zbritjes",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "dataKrijimit",
      headerName: "Data Krijimit",
      width: 190,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => {
        const date = new Date(params.value);
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
      field: "dataSkadimit",
      headerName: "Data Skadimit",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = date.toLocaleDateString("en-US", {
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
      field: "edit",
      headerName: "Edit",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          sx={{
            backgroundColor: "#322b9c",
            "&:hover": {
              backgroundColor: "#242154",
            },
          }}
          onClick={() => handleEditClick(params.id)}
        >
          Edito Zbritjen
          <i className="fa-solid fa-pen-to-square" style={{paddingLeft:"4px"}}></i>
        </Button>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "darkred",
            "&:hover": {
              backgroundColor: "brown",
            },
          }}
          onClick={() => handleDeleteClick(params.id)}
        >
          Fshij Zbritjen
          <i className="fa-solid fa-trash" style={{paddingLeft:"4px"}}></i>
        </Button>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
  ];
  const totalWidth = columns.reduce((acc, column) => acc + (column.width || 0), 0);
  return (
    <>
      <div className="shtoButoni">
        <Button onClick={() => setShfaqShto(true)}>Shto Zbritjen</Button>
      </div>
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
        <>
        {
          llojetZbritjeve.length !== 0 && 
          (
          <>           
            <h3 className="filter-title">Filtro Llojet e Zbritjeve</h3>
            <div
              className="filter-options"
              style={{ display: "flex",justifyContent:"center", gap: "1rem", marginBottom: "1rem" }}
            >
              <div>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Data Krijimit"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slots={{ textField: TextField }}
                />
                <DatePicker
                  label="Data Skadimit"
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
          </>
          )

        }
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box  sx={{ width: totalWidth + 50,margin:"0 auto" }}>
              <DataGrid
                rows={filteredData}
                columns={columns}
                getRowId={(row) => row.zbritja_ID}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[5,10,20]}
                autoHeight
                // checkboxSelection
                disableRowSelectionOnClick
                getRowClassName={(params) => `super-app-theme--row`}
              />
            </Box>
          </Box>
        </>
      )}

      {shfaqShto && (
        <ShtoZbritjen
          mbyllShtoZbritjen={() => setShfaqShto(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}

      {shfaqFshij && zbritjaToDeleteId && (
        <FshijZbritjen
          id={zbritjaToDeleteId}
          shfaqFshij={shfaqFshij}
          mbyllFshij={() => setShfaqFshij(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}

      {shfaqEdit && zbritjaToEditId && (
        <EditZbritjen
          mbyllEditZbritjen={() => setShfaqEdit(false)}
          id={zbritjaToEditId}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}
    </>
  );
}

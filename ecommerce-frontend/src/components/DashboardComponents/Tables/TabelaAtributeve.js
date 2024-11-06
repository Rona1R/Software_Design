import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "./TableStyles.css";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import ShtoAtributin from "../CRUD/AtributetCRUD/ShtoAtributin";
import FshijAtributin from "../CRUD/AtributetCRUD/FshijAtributin";
import PerditesoAtributin from "../CRUD/AtributetCRUD/EditAtributin";
import OpsionetSipasAtributit from "../CRUD/AtributiOpsionetCRUD/OpsionetSipasAtributit";

export default function TabelaAtributeve() {
  const [atributet, setAtributet] = useState([]);
  const [shfaqShto, setShfaqShto] = useState(false);
  const [refreshKey, setRefreshKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [shfaqEdito, setShfaqEdito] = useState(false);
  const [shfaqFshij, setShfaqFshij] = useState(false);
  const [atributiId, setAtributiId] = useState(null);
  const [openOptions, setOpenOptions] = useState(false);

  const handleEditClick = (id) => {
    setAtributiId(id);
    setShfaqEdito(true);
  };

  const handleDeleteClick = (id) => {
    setAtributiId(id);
    setShfaqFshij(true);
  };

  const handleOptions =(id)=>{
    setAtributiId(id);
    setOpenOptions(true);
  }
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 140,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "dataType",
      headerName: "Input field",
      width: 300,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
        field: "options",
        headerName: "Options",
        width: 160,
        sortable: false,
        filterable: false,
        renderCell: (params) =>
          params.row.dataType === "option-list" ? (
            <Button
              variant="contained"
              onClick={() => handleOptions(params.id)}
            >
              Show Options
            </Button>
          ) : ("/"),
        headerClassName: "super-app-theme--header",
        cellClassName: "super-app-theme--cell",
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 160,
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
          Edit
          <i
            className="fa-solid fa-pen-to-square"
            style={{ paddingLeft: "4px" }}
          ></i>
        </Button>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 160,
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
          Delete
          <i className="fa-solid fa-trash" style={{ paddingLeft: "4px" }}></i>
        </Button>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
  ];

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7061/api/Atributi/get-all-atributtes")
        .then((response) => {
          setAtributet(response.data);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [refreshKey]);

  const totalWidth = columns.reduce(
    (acc, column) => acc + (column.width || 0),
    0
  );
  return (
    <>
      <div className="shtoButoni">
        <Button onClick={() => setShfaqShto(true)}>Shto Atributin e ri</Button>
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
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Box sx={{ width: totalWidth + 50, margin: "0 auto" }}>
            <DataGrid
              rows={atributet}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 20]}
              autoHeight
              disableRowSelectionOnClick
              getRowClassName={(params) => `super-app-theme--row`}
            />
          </Box>
        </Box>
      )}

      {
        openOptions && (
            <OpsionetSipasAtributit 
                id = {atributiId}
                mbyllShfaq = {()=>setOpenOptions(false)}
            />
        )
      }

      {shfaqShto && (
        <ShtoAtributin
          mbyllShto={() => setShfaqShto(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}

      {shfaqEdito && (
        <PerditesoAtributin
          id={atributiId}
          mbyllEdit={() => setShfaqEdito(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}

      {shfaqFshij && (
        <FshijAtributin
          id={atributiId}
          mbyllFshij={() => setShfaqFshij(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}
    </>
  );
}

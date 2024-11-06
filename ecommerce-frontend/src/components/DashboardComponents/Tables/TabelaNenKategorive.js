import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "./TableStyles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import ShtoNenkategorine from "../CRUD/NenkategoriaCRUD/ShtoNenkategorine";
import EditNenkategorine from "../CRUD/NenkategoriaCRUD/EditNenkategorine";
import FshijNenkategorine from "../CRUD/NenkategoriaCRUD/FshijNenkategorine";

export default function TabelaNenKategorive() {
  const [nenkategorite, setNenkategorite] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState("");
  const [nenkategoriaToEditID, setNekategoriaToEditID] = useState(null);
  const [nenkategoriaToDeleteID, setNekategoriaToDeleteID] = useState(null);
  const [shfaqShto, setShfaqShto] = useState(false);
  const [shfaqEdito, setShfaqEdito] = useState(false);
  const [shfaqFshij, setShfaqFshij] = useState(false);

  const handleEditClick = (id) => {
    // console.log(`Edit button clicked for row with id: ${id}`);
    setNekategoriaToEditID(id);
    setShfaqEdito(true);
  };

  const handleDeleteClick = (id) => {
   setNekategoriaToDeleteID(id);
   setShfaqFshij(true);
  };

  const closeShtoNenkategorine =()=>{
    setShfaqShto(false);
  }
  const openShtoNenkategorine=()=>{
    setShfaqShto(true);
  }

  const closeEditNenkategorine=()=>{  
    setShfaqEdito(false);
  }

  const closeShfaqFshij=()=>{
    setShfaqFshij(false);
  }
  
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "emri",
      headerName: "Emri",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "kategoria",
      headerName: "Kategoria",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 250,
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
          Edito Nenkategorine
          <i className="fa-solid fa-pen-to-square" style={{paddingLeft:"4px"}}></i>
        </Button>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 250,
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
          Fshij Nenkategorine
          <i className="fa-solid fa-trash" style={{paddingLeft:"4px"}}></i>
        </Button>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
  ];

  useEffect(() => {
    try {
      // setLoading(true);
      axios
        .get("https://localhost:7061/api/NenKategoria/shfaqNenKategorite")
        .then((response) => {
          console.log(response.data);
          setNenkategorite(response.data);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [refreshKey]);

  const totalWidth = columns.reduce((acc, column) => acc + (column.width || 0), 0);
  return (
    <>
      <div className="shtoButoni">
        <Button onClick={openShtoNenkategorine}>Shto Nen-kategorine</Button>
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
          <Box sx={{ width: totalWidth + 50,margin:"0 auto" }}>
            <DataGrid
              rows={nenkategorite}
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
              // checkboxSelection
              disableRowSelectionOnClick
              getRowClassName={(params) => `super-app-theme--row`}
            />
          </Box>
        </Box>

      )}

      {
        shfaqShto && (
          <ShtoNenkategorine
            mbyllShtoNenKategorine = {closeShtoNenkategorine}
            refreshTeDhenat = {()=>setRefreshKey(Date.now())}
          />
        )
      }

      {
        shfaqEdito && nenkategoriaToEditID && (
          <EditNenkategorine
            mbyllEditNenKategorine = {closeEditNenkategorine}
            id= {nenkategoriaToEditID}
            refreshTeDhenat = {()=>setRefreshKey(Date.now())}
          />
        )
      }

      {
        shfaqFshij && nenkategoriaToDeleteID && (
          <FshijNenkategorine 
          id = {nenkategoriaToDeleteID}
          shfaqFshij = {shfaqFshij}
          mbyllFshij = {closeShfaqFshij}
          refreshTeDhenat = {()=>setRefreshKey(Date.now())}
          />
        )

      }
    </>
  );
}

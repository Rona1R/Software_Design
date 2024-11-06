import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "./TableStyles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ShtoKategorine from "../CRUD/KategoriaCRUD/ShtoKategorine";
import EditoKategorine from "../CRUD/KategoriaCRUD/EditKategorine";
import FshijKategorine from "../CRUD/KategoriaCRUD/FshijKategorine";
import { TailSpin } from 'react-loader-spinner';

export default function TabelaKategorive() {
  const [kategorite, setKategorite] = useState([]);
  const [shfaqShto,setShfaqShto] = useState(false);
  const [shfaqEdito,setShfaqEdito] = useState(false);
  const [shfaqFshij,setShfaqFshij] = useState(false);
  const [refreshKey, setRefreshKey] = useState("");
  const [kategoriaToEditID,setKategoriaToEditID] = useState(null);
  const [kategoriaToDeleteID,setKategoriaToDeleteID] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const handleEditClick = (id) => {
    setKategoriaToEditID(id);
    console.log(`Edit button clicked for row with id: ${id}`);
    setShfaqEdito(true);

  };
  
  const handleDeleteClick = (id) => {
    console.log(`Delete button clicked for row with id: ${id}`);
    setKategoriaToDeleteID(id);
    setShfaqFshij(true);
  };
  
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "emri",
      headerName: "Emri",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "pershkrimi",
      headerName: "Pershkrimi",
      width: 600,
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
          Edito Kategorine
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
          Fshij Kategorine
          <i className="fa-solid fa-trash" style={{paddingLeft:"4px"}}></i>
        </Button>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
  ];
  
  const openShtoKategorine=()=>{
    setShfaqShto(true);
  }
  const closeShtoKategorine=()=>{
    setShfaqShto(false);
  }

  const closeFormenEdit=()=>{
    setShfaqEdito(false);
  }

  const closeShfaqFshij=()=>{
    setShfaqFshij(false);
  }
  
  // katgorite read :
  useEffect(() => {
    try {
      // setLoading(true);
      axios
      .get('https://localhost:7061/api/Kategoria/shfaqKategorite')
      .then((response) => {
        setKategorite(response.data);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [refreshKey]);
  
  console.log("Data received from backend---------------:");
  console.log(kategorite);

  const totalWidth = columns.reduce((acc, column) => acc + (column.width || 0), 0);
  return (
    <Box>
      <div className='shtoButoni'>
        <Button onClick={openShtoKategorine}>Shto Kategorine</Button>
      </div>
      {
        loading ? (
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
        <Box  sx={{ width: totalWidth + 50 ,margin:"0 auto"}}>
          <DataGrid
            rows={kategorite}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            autoHeight 
            pageSizeOptions={[5, 10, 20]}
            // checkboxSelection
            disableRowSelectionOnClick
            getRowClassName={(params) => `super-app-theme--row`}
            />
        </Box>
      </Box>
      )
     }
       
       {
        shfaqShto && (
        <ShtoKategorine
          //  shfaqFormen = {shfaqShto}
            mbyllShtoKategorine = {closeShtoKategorine}
          //  shfaqShtoKategorine = {openShtoKategorine}
            refreshTeDhenat = {()=>setRefreshKey(Date.now())}
       //     refreshKey = {refreshKey}
        />
        )
       }
      
      {kategoriaToEditID && shfaqEdito && (
        <EditoKategorine
          id={kategoriaToEditID}
          // shfaqFormenEdit={shfaqEdito}
          mbyllEditKategorine={closeFormenEdit}
          refreshTeDhenat={()=>setRefreshKey(Date.now())}
      //   refreshKey= {refreshKey}
      />
      )}

      {
        kategoriaToDeleteID && (

          <FshijKategorine 
            id = {kategoriaToDeleteID}
            shfaqFshij = {shfaqFshij}
            mbyllFshij = {closeShfaqFshij}
            refreshTeDhenat = {()=>setRefreshKey(Date.now())}
          />
        )
      }

    </Box>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import "./TableStyles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import VendosNeZbritje from '../CRUD/ProduktiZbritjaCRUD/VendosNeZbritje';
import LargoNgaZbritja from '../CRUD/ProduktiZbritjaCRUD/LargoNgaZbritja';
import EditZbritjenProduktit from '../CRUD/ProduktiZbritjaCRUD/EditZbritjenProduktit';

export default function TabelaZbritjeve() {
  const [produktetNeZbritje,setProduktetNeZbritje] = useState([]);
  const [shfaqShto,setShfaqShto] = useState(false);
  const [shfaqLargo,setShfaqLargo] = useState(false);
  const [shfaqEdit,setShfaqEdit] = useState(false);
  const [refreshKey,setRefreshKey] = useState('');
  const [produktiToEditId,setProduktiToEditId] = useState(false);
  const [produktiPerTuLarguarId,setProduktiPerTuLarguarId] = useState(null);
  const [loading,setLoading] = useState(true);

  
  useEffect(() => {
    try {
      // setLoading(true);
      axios
        .get("https://localhost:7061/api/ProduktiZbritja/shfaqZbritjetProdukteve")
        .then((response) => {
          setProduktetNeZbritje(response.data);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [refreshKey]);

  const handleEditClick = (id) => {
    setProduktiToEditId(id);
    setShfaqEdit(true);
  }
  
  const handleDeleteClick = (id) => {
    setShfaqLargo(true)
    setProduktiPerTuLarguarId(id);
  };
  
  const columns = [
  
    { field: 'produktiID', headerName: 'Produkti ID', width: 100,
      headerClassName: 'super-app-theme--header', 
      cellClassName: 'super-app-theme--cell' 
    },
    {
      field: 'zbritjaID',
      headerName: 'Zbritja ID',
      width: 100,
      editable: true,
      headerClassName: 'super-app-theme--header', 
      cellClassName: 'super-app-theme--cell' 
    },
    {
      field: 'produktiEmri',
      headerName: 'Emri Produktit',
      width: 150,
      editable: true,
      headerClassName: 'super-app-theme--header', 
      cellClassName: 'super-app-theme--cell' 
    },
    {
      field: 'cmimiParaZbritjes',
      headerName: 'Cmimi Para Zbritjes (€)',
      width: 200,
      editable: true,
      headerClassName: 'super-app-theme--header', 
      cellClassName: 'super-app-theme--cell' 
    },
    {
      field: 'cmimiMeZbritje',
      headerName: 'Cmimi Pas Zbritjes (€)',
      width: 200,
      editable: true,
      headerClassName: 'super-app-theme--header', 
      cellClassName: 'super-app-theme--cell' 
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 250,
      sortable: false,
      filterable : false,
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
          Ndrysho Zbritjen
          <i className="fa-solid fa-pen-to-square" style={{paddingLeft:"4px"}}></i>
        </Button>
      ),
      headerClassName: 'super-app-theme--header', 
      cellClassName: 'super-app-theme--cell' 
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 250,
      sortable: false,
      filterable:false,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'darkred',
            '&:hover': {
              backgroundColor: 'brown',
            },
          }}
          onClick={() => handleDeleteClick(params.id)}
        >
          Largo nga Zbritja 
          <i className="fa-solid fa-trash" style={{paddingLeft:"4px"}}></i>
        </Button>
      ),
      headerClassName: 'super-app-theme--header', 
      cellClassName: 'super-app-theme--cell' 
    },
  ];
  
  // const rows = [
  //     {produktiID: 1,zbritjaID:1,cmimiParaZbritjes:150,cmimiMeZbritje:200,produktiEmri:"Produkti A1",dataVendosjes:"2024-05-05"},
  //     {produktiID: 2,zbritjaID:2,cmimiParaZbritjes:100,cmimiMeZbritje:150,produktiEmri:"Produkti A2",dataVendosjes:"2024-05-05"},
  //     {produktiID: 3,zbritjaID:3,cmimiParaZbritjes:20,cmimiMeZbritje:44.99,produktiEmri:"Produkti A3",dataVendosjes:"2024-05-05"},
  // ];
  const totalWidth = columns.reduce((acc, column) => acc + (column.width || 0), 0);
  return (
    <>
    <div className='shtoButoni'>
     <Button onClick={()=>setShfaqShto(true)}>Vendos ne Zbritje</Button>
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
            rows={produktetNeZbritje}
            columns={columns}
            getRowId={(row) => row.produktiID}
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
    )}

    {
      shfaqShto && (
        <VendosNeZbritje 
        refreshTeDhenat={() => setRefreshKey(Date.now())}
        mbyllVendosNeZbritje = {()=>setShfaqShto(false)}
        />
      )
    }

    {
      shfaqLargo &&  produktiPerTuLarguarId && (
        <LargoNgaZbritja 
          id = {produktiPerTuLarguarId}
          mbyllFshij = {()=> setShfaqLargo(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )
    }

    {
      shfaqEdit && produktiToEditId && (
        <EditZbritjenProduktit 
          id = {produktiToEditId}
          mbyllEdit = {()=> setShfaqEdit(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )
    }
    </>
  );
}
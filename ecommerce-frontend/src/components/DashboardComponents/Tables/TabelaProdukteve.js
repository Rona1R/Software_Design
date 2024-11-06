import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "./TableStyles.css";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import ShtoProduktin from "../CRUD/ProduktiCRUD/ShtoProduktin";
import EditoProduktin from "../CRUD/ProduktiCRUD/EditProduktin";
import FshijProduktin from "../CRUD/ProduktiCRUD/FshijProduktin";
import ShtoAtributinProduktit from "../CRUD/ProduktiAtributetCRUD/ShtoAtributinProduktit";
import ShfaqAtributet from "../CRUD/ProduktiAtributetCRUD/ShfaqAtributet";

export default function TabelaProdukteve() {
  const [produktet, setProduktet] = useState([]);
  const [refreshKey, setRefreshKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [shfaqShto, setShfaqShto] = useState(false);
  const [shfaqEdito, setShfaqEdito] = useState(false);
  const [shfaqFshij, setShfaqFshij] = useState(false);
  const [produktiPerTuEdituarID, setProduktiPerTuEdituarID] = useState(null);
  const [produktiPerTuFshireID, setProduktiPerTuFshireID] = useState(null);
  const [shfaqShtoInformacionet, setShfaqShtoInformacionet] = useState(false);
  const [shfaqInformacionet,setShfaqInformacionet] = useState(false);

  useEffect(() => {
    try {
      // setLoading(true);
      axios
        .get("https://localhost:7061/api/Produkti/shfaqProduktet")
        .then((response) => {
          setProduktet(response.data);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [refreshKey]);

  const handleEditClick = (id) => {
    setProduktiPerTuEdituarID(id);
    setShfaqEdito(true);
  };

  const handleDeleteClick = (id) => {
    setProduktiPerTuFshireID(id);
    setShfaqFshij(true);
  };

  const handleShfaqShtoInfo = (id) => {
    setProduktiPerTuEdituarID(id);
    setShfaqShtoInformacionet(true);
  };

  const handleShfaqInformacionet=(id)=>{
    setProduktiPerTuEdituarID(id);
    setShfaqInformacionet(true);
  }
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
      field: "kompania",
      headerName: "Kompania",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "kategoria",
      headerName: "Kategoria",
      // type: 'number',
      width: 110,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "nenkategoria",
      headerName: "NenKategoria",
      // type: 'number',
      width: 110,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "pershkrimi",
      headerName: "Pershkrimi",
      // type: 'number',
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "foto",
      headerName: "Foto",
      // type: 'number',
      width: 110,
      editable: true,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <img
          src={`/images/${params.value}`}
          alt="Product"
          style={{ height: "50px", width: "60px", marginBottom: "2px" }}
        />
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "cmimi",
      headerName: "Cmimi",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 90,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => {
        return <span> {params.value + " €"} </span>;
      },
    },
    {
      field: "stoku",
      headerName: "Stoku",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 90,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "neShitje",
      headerName: "Ne Shitje",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 90,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => {
        const neShitje = params.value;
        return (
          <>
            {neShitje ? (
              <span style={{ color: "green" }}>Po</span>
            ) : (
              <span style={{ color: "red" }}>Jo</span>
            )}
          </>
        );
      },
    },
    {
      field: "atributet",
      headerName: "Shfaq Atributet",
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleShfaqInformacionet(params.id)}
        >
          <i className="fa-solid fa-folder-open" style={{fontSize:"20px"}}></i>
        </Button>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "shtoInformacionet",
      headerName: "Shto Atributet",
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleShfaqShtoInfo(params.id)}
        >
          <i className="fa-solid fa-plus" style={{fontSize:"20px"}}></i>
        </Button>
      ),
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
              backgroundColor: "red",
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

  const totalWidth = columns.reduce(
    (acc, column) => acc + (column.width || 0),
    0
  );
  return (
    <>
      <div className="shtoButoni">
        <Button onClick={() => setShfaqShto(true)}>Shto Produktin</Button>
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
              rows={produktet}
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
      )}

      {shfaqShto && (
        <ShtoProduktin
          mbyllShtoProduktin={() => setShfaqShto(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}

      {shfaqEdito && produktiPerTuEdituarID && (
        <EditoProduktin
          id={produktiPerTuEdituarID}
          mbyllEditoProduktin={() => setShfaqEdito(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}

      {shfaqFshij && produktiPerTuFshireID && (
        <FshijProduktin
          id={produktiPerTuFshireID}
          mbyllFshij={() => setShfaqFshij(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}
 
      {
        shfaqInformacionet && 
        <ShfaqAtributet 
          id = {produktiPerTuEdituarID}
          mbyllShfaq={()=>setShfaqInformacionet(false)}
        />
      }

      {
        shfaqShtoInformacionet && 
        <ShtoAtributinProduktit 
          id = {produktiPerTuEdituarID}
          mbyllShto = {()=>setShfaqShtoInformacionet(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      }
    </>
  );
}

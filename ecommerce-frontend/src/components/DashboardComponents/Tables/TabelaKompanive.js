import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "./TableStyles.css";
import ShtoKompanine from "../CRUD/KompaniaCRUD/ShtoKompanine";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import EditKompanine from "../CRUD/KompaniaCRUD/EditKompanine";
import FshijKompanine from "../CRUD/KompaniaCRUD/FshijKompanine";

export default function TabelaKompanive() {
  const [kompanite, setKompanite] = useState([]);
  const [shfaqShto, setShfaqShto] = useState(false);
  const [refreshKey, setRefreshKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [shfaqEdito, setShfaqEdito] = useState(false);
  const [shfaqFshij, setShfaqFshij] = useState(false);
  const [kompaniaToEditID, setKompaniaToEditID] = useState(null);
  const [kompaniaToDeleteID, setKompaniaToDeleteID] = useState(null);

  const handleEditClick = (id) => {
    setKompaniaToEditID(id);
    console.log(`Edit button clicked for row with id: ${id}`);
    setShfaqEdito(true);
  };

  const handleDeleteClick = (id) => {
    console.log(`Delete button clicked for row with id: ${id}`);
    setKompaniaToDeleteID(id);
    setShfaqFshij(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 140,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "emri",
      headerName: "Emri",
      width: 300,
      editable: true,
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

  const openShtoKompanite = () => {
    setShfaqShto(true);
  };

  const closeShtoKompanine = () => {
    setShfaqShto(false);
  };

  const closeFormenEdit = () => {
    setShfaqEdito(false);
  };

  const closeShfaqFshij = () => {
    setShfaqFshij(false);
  };

  // katgorite read :
  useEffect(() => {
    try {
      // setLoading(true);
      axios
        .get("https://localhost:7061/api/Kompania/shfaqKompanine")
        .then((response) => {
          setKompanite(response.data);
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
        <Button onClick={openShtoKompanite}>Shto Kompanine</Button>
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
              rows={kompanite}
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

      {shfaqShto && (
        <ShtoKompanine
          //  shfaqFormen = {shfaqShto}
          mbyllShtoKompanine={closeShtoKompanine}
          //  shfaqShtoKompanine = {openShtoKompanine}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
          //     refreshKey = {refreshKey}
        />
      )}

      {kompaniaToEditID && shfaqEdito && (
        <EditKompanine
          id={kompaniaToEditID}
          // shfaqFormenEdit={shfaqEdito}
          mbyllEditKompanine={closeFormenEdit}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
          //   refreshKey= {refreshKey}
        />
      )}

      {kompaniaToDeleteID && (
        <FshijKompanine
          id={kompaniaToDeleteID}
          shfaqFshij={shfaqFshij}
          mbyllFshij={closeShfaqFshij}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}
    </>
  );
}

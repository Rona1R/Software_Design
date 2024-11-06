import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "./TableStyles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import ShtoRolinUserit from "../CRUD/UseriRoletCRUD/ShtoRolinUserit";
import FshijRolinUserit from "../CRUD/UseriRoletCRUD/FshijRolinUserit";
import EditUserBadge from "../CRUD/AchievmentBadgeCRUD/EditUserBadge";

export default function TabelaPerdoruesve() {
  const [perdoruesit, setPerdoruesit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shfaqShto, setShfaqShto] = useState(false);
  const [userToEditId, setUserToEditId] = useState(null);
  const [userToDeleteId, setUserToDeleteId] = useState(null);
  const [shfaqFshij, setShfaqFshij] = useState(false);
  const [shfaqEditBadge, setShfaqEditBadge] = useState(false);
  const [refreshKey, setRefreshKey] = useState("");
  const useri = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7061/api/UseriRolet/GetAllUsers")
        .then((response) => {
          setPerdoruesit(response.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [refreshKey]);

  const handleEditClick = (id) => {
    setUserToEditId(id);
    setShfaqShto(true);
    // console.log(`Edit button clicked for row with id: ${id}`);
  };

  const handleDeleteClick = (id) => {
    setUserToDeleteId(id);
    setShfaqFshij(true);
  };

  const handleEditBadge = (id) => {
    setUserToEditId(id);
    setShfaqEditBadge(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 110,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250, // Define a suitable width
      editable: true, // Set to true if you want it to be editable
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "roli",
      headerName: "Roli",
      // type: 'number',
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => {
        return Array.isArray(params.value)
          ? params.value.join(", ")
          : params.value;
      },
    },
    {
      field: "achievementBadge",
      headerName: "Achievement Badge",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    ...(useri && useri.roles.includes("Admin")
      ? [
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
                onClick={() => handleEditClick(params.row.aspNetUserId)}
              >
                Shto Rolin
                <i className="fa-solid fa-plus" style={{ paddingLeft: "4px" }}></i>
              </Button>
            ),
            headerClassName: "super-app-theme--header",
            cellClassName: "super-app-theme--cell",
          },
        ]
      : []),
    ...(useri && useri.roles.includes("Admin")
      ? [
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
                onClick={() => handleDeleteClick(params.row.aspNetUserId)}
              >
                Largo Rolin
                <i className="fa-solid fa-trash" style={{ paddingLeft: "4px" }}></i>
              </Button>
            ),
            headerClassName: "super-app-theme--header",
            cellClassName: "super-app-theme--cell",
          },
        ]
      : []),
    {
      field: "editBdge",
      headerName: "Edit Badge",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleEditBadge(params.id)}
          >
            Change Badge
            <i
              className="fa-solid fa-pen-to-square"
              style={{ paddingLeft: "4px" }}
            ></i>
          </Button>
        );
      },
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
      {shfaqShto && (
        <ShtoRolinUserit
          aspNetUserId={userToEditId}
          mbyllShto={() => setShfaqShto(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}

      {shfaqFshij && (
        <FshijRolinUserit
          aspNetUserId={userToDeleteId}
          mbyllFshij={() => setShfaqFshij(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}

      {shfaqEditBadge && (
        <EditUserBadge
          id={userToEditId}
          mbyllEdit={() => setShfaqEditBadge(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}
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
              rows={perdoruesit}
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
    </>
  );
}

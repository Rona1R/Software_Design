import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import "./TableStyles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import FshijReview from "../CRUD/ReviewAdmin/FshijReview";
import { TailSpin } from "react-loader-spinner";

export default function TabelaReviews() {
  const [reviews, setReviews] = useState([]);
  const [reviewToDeleteId, setReviewToDeleteId] = useState(null);
  const [shfaqFshij, setShfaqFshij] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState("");

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7061/api/Review/shfaqReviews")
        .then((response) => {
          setReviews(response.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [refreshKey]);

  const handleDeleteClick = (id) => {
    setReviewToDeleteId(id);
    setShfaqFshij(true);
    console.log(`Delete button clicked for row with id: ${id}`);
  };

  const columns = [
    {
      field: "reviewID",
      headerName: "Review ID",
      width: 90,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "klientiID",
      headerName: "Klienti ID",
      width: 90,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "klientiUsername",
      headerName: "Klienti",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "klientiEmail",
      headerName: "Email e Klientit",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "produktiID",
      headerName: "Produkti ID",
      width: 100,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "produktiEmri",
      headerName: "Emri Produktit",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "komenti",
      headerName: "Komenti",
      width: 500,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Rating
          value={params.value}
          readOnly
          sx={{
            "& .MuiRating-iconFilled": {
              color: "#665DDB",
            },
          }}
        />
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
          Delete Review
          <i className="fa-solid fa-trash" style={{paddingLeft:"4px"}}></i>
        </Button>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
  ];

  // const rows = [
  //   { reviewID: 1, klientiID:1,klientiEmri:"Rona",klientiMbiemri:"Rushiti",produktiID:1,produktiEmri:"Produkti A1",komenti:"Ky produkt kishte defekte dhe nuk dukej si ne foto!",rating:3,},
  //   { reviewID: 2, klientiID:2,klientiEmri:"Rina",klientiMbiemri:"Rushiti",produktiID:2,produktiEmri:"Produkti A2",komenti:"Ky Produkt ishte shume i mire.Mire do ishte nese do kushtonte me pak.",rating:4},
  //   { reviewID: 3, klientiID:3,klientiEmri:"Art",klientiMbiemri:"Rushiti",produktiID:3,produktiEmri:"Produkti A3",komenti:"Nuk do ta bleja prap",rating:1},
  // ];
  const totalWidth = columns.reduce((acc, column) => acc + (column.width || 0), 0);
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
        <Box  sx={{ width: "100%", overflowX: "auto" }}>
          <Box  sx={{ width: totalWidth + 50,margin:"0 auto" }}>
            <DataGrid
              rows={reviews}
              columns={columns}
              getRowId={(row) => row.reviewID}
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

      {shfaqFshij &&
        reviewToDeleteId && (
          <FshijReview
            id={reviewToDeleteId}
            refreshTeDhenat={() => setRefreshKey(Date.now())}
            mbyllFshij={() => setShfaqFshij(false)}
          />
        )}
    </>
  );
}

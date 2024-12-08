import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "./TableStyles.css";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { Card, Typography } from "@mui/material";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import EditPorosine from "../CRUD/PorosiaCRUD/EditPorosine";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CreateReport from "../Report/CreateReport";

export default function TabelaPorosive() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showReset, setShowReset] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [porosite, setPorosite] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shfaqEdit, setShfaqEdit] = useState(false);
  const [porosiaToEditId, setPorosiaToEditId] = useState(null);
  const [refreshKey, setRefreshKey] = useState("");
  const [showCreateReport, setShowCreateReport] = useState(false);

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

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7061/api/Porosia/shfaqPorosite")
        .then((response) => {
          setPorosite(response.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [refreshKey]);

  const handleEditClick = (id) => {
    setPorosiaToEditId(id);
    setShfaqEdit(true);
  };

  const handleShfaqDetajet = (row) => {
    console.log("Order Details:", row.detajetPorosise);
    setSelectedOrder(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatDate = (data) => {
    const date = new Date(data + "Z");
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDate;
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
      field: "klientiId",
      headerName: "Klienti ID",
      width: 90,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "klienti",
      headerName: "Klienti",
      width: 150,
      editable: true,
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
        return <>{formatDate(params.value)}</>;
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
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "detajetPorosise",
      headerName: "Detajet e Porosise",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleShfaqDetajet(params.row)}
          sx={{
            backgroundColor: "purple",
            "&:hover": {
              backgroundColor: "#4b0082",
            },
          }}
        >
          Shiko Detajet
          <i className="fa-regular fa-eye" style={{ paddingLeft: "4px" }}></i>
        </Button>
      ),
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
          Perditeso Statusin
          <i
            className="fa-solid fa-pen-to-square"
            style={{ paddingLeft: "4px" }}
          ></i>
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
      {showCreateReport && (
        <CreateReport
          headers={[
            "Id",
            "Klienti",
            "DataPorosise",
            "Totali",
            "Statusi",
            "Adresa",
            "Shteti",
            "Qyteti",
            "ZipKodi",
          ]}
          rows={porosite.map((p) => [
            String(p.porosiaID),
            p.klienti,
            formatDate(p.dataPorosise),
            String(p.totali),
            p.statusi,
            p.adresaDerguese.adresa,
            p.adresaDerguese.shteti,
            p.adresaDerguese.qyteti,
            p.adresaDerguese.zipKodi,
          ])}
          mbyllShto={() => setShowCreateReport(false)}
        />
      )}

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        // className="order-details"
      >
        <Modal.Header closeButton className="cart-header">
          {/* <Modal.Title className="crudFormLabel">Detajet E Porosise</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="text-center">
          <h3 style={{ fontWeight: "bold", color: "#00004", fontSize: "2em" }}>
            Detajet e porosise:
          </h3>
          {selectedOrder ? (
            <div>
              {selectedOrder.detajetPorosise.map((detajet, index) => (
                <Card
                  variant="outlined"
                  sx={{
                    p: 1,
                    width: "80%",
                    margin: "auto",
                    textAlign: "center",
                  }}
                  className="cart-item-wrapper"
                  key={index}
                >
                  <Box sx={{ mb: 2 }}>
                    <img
                      src={`/images/${detajet.foto}`}
                      alt={detajet.produktiEmri}
                      style={{
                        height: "50px",
                        width: "60px",
                        marginBottom: "2px",
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight="regular"
                      className="item-title"
                    >
                      Produkti ID: {detajet.produktiID}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight="bold"
                      className="item-title"
                    >
                      Produkti Emri: {detajet.produktiEmri}
                    </Typography>
                    <Typography
                      fontWeight="regular"
                      noWrap
                      gutterBottom
                      className="item-price"
                      style={{ textAlign: "center" }}
                    >
                      Cmimi per cope: {detajet.cmimi} €
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="item-description"
                    >
                      Sasia: {detajet.sasia}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
          {porosite.length !== 0 && (
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
                <div></div>
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
            </>
          )}
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Button
              className="createReport"
              onClick={() => setShowCreateReport(true)}
            >
              {" "}
              Generate Report{" "}
            </Button>
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
                pageSizeOptions={[5, 10, 20]}
                autoHeight
                // checkboxSelection
                disableRowSelectionOnClick
                getRowClassName={(params) => `super-app-theme--row`}
              />
            </Box>
          </Box>
        </>
      )}

      {shfaqEdit && porosiaToEditId && (
        <EditPorosine
          id={porosiaToEditId}
          mbyllEdit={() => setShfaqEdit(false)}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}
    </>
  );
}

import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import ShtoOpsionin from "./ShtoOpsionin";
import FshijOpsionin from "./FshijOpsionin";
import EditOpsionin from "./EditOpsionin";

export default function OpsionetSipasAtributit(props) {
  const [opsionet, setOpsionet] = useState([]);
  const [atributi, setAtributi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState("");
  const [shfaqShto, setShfaqShto] = useState(false);
  const [shfaqFshij, setShfaqFshij] = useState(false);
  const [shfaqEdito, setShfaqEdito] = useState(false);
  const [opsioniId, setOpsioniId] = useState(null);

  const handleEditClick = (id) => {
    setOpsioniId(id);
    setShfaqEdito(true);
  };

  const handleDeleteClick = (id) => {
    setOpsioniId(id);
    setShfaqFshij(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "optionValue",
      headerName: "Vlera",
      width: 140,
      editable: true,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button onClick={() => handleEditClick(params.id)}>
          <i class="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i>
        </Button>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDeleteClick(params.id)}>
          <i class="fa-solid fa-trash" style={{ color: "red" }}></i>
        </Button>
      ),
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const opsionetRes = await axios.get(
          `https://localhost:7061/api/AtributiOption/get-options-sipas-atributit/${props.id}`
        );
        setOpsionet(opsionetRes.data);

        const atributiRes = await axios.get(
          `https://localhost:7061/api/Atributi/get-attribute/${props.id}`
        );
        setAtributi(atributiRes.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey, props.id]);

  const totalWidth = columns.reduce(
    (acc, column) => acc + (column.width || 0),
    0
  );

  return (
    <>
      <Modal show={true} onHide={props.mbyllShfaq} centered>
        <Modal.Header closeButton>
          <Modal.Title className="crudFormLabel">
            {atributi && atributi.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="shtoButoni">
            <Button onClick={() => setShfaqShto(true)}>
              Shto Opsionin e ri
            </Button>
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
                  rows={opsionet}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                    columns: {
                      columnVisibilityModel: {
                        id:false
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  autoHeight
                  disableRowSelectionOnClick
                  getRowClassName={(params) => `super-app-theme--row`}
                />
              </Box>
            </Box>
          )}
        </Modal.Body>
      </Modal>

      {shfaqShto && (
        <ShtoOpsionin
          atributiId={props.id}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
          mbyllShto={() => setShfaqShto(false)}
        />
      )}

      {shfaqEdito && (
        <EditOpsionin
          id={opsioniId}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
          mbyllEdit={() => setShfaqEdito(false)}
        />
      )}
      {shfaqFshij && (
        <FshijOpsionin
          id={opsioniId}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
          mbyllFshij={() => setShfaqFshij(false)}
        />
      )}
    </>
  );
}

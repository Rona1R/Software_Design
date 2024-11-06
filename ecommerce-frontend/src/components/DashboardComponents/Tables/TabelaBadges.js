import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import "./TableStyles.css";
import axios from "axios";
import { TailSpin } from 'react-loader-spinner';
import ShtoBadge from '../CRUD/AchievmentBadgeCRUD/ShtoBadge';
import FshijBadge from '../CRUD/AchievmentBadgeCRUD/FshijBadge';
import EditBadge from '../CRUD/AchievmentBadgeCRUD/EditBadge';

export default function TabelaBadges() {
  const [badges, setBadges] = useState([]);
  const [shfaqShto, setShfaqShto] = useState(false);
  const [refreshKey, setRefreshKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [shfaqEdito, setShfaqEdito] = useState(false);
  const [shfaqFshij, setShfaqFshij] = useState(false);
  const [badgeToEditID, setBadgeToEditID] = useState(null);
  const [badgeToDeleteID, setBadgeToDeleteID] = useState(null);

  const handleEditClick = (id) => {
    console.log("Editing badge with id "+id);
    setBadgeToEditID(id);
    setShfaqEdito(true);
  };
  
  const handleDeleteClick = (id) => {
    setBadgeToDeleteID(id);
    setShfaqFshij(true);
  };

  const columns = [
    { field: 'badge_Id', headerName: 'ID', width: 140,
      headerClassName: 'super-app-theme--header', 
      cellClassName: 'super-app-theme--cell' 
    },
    {
      field: 'badge_Name',
      headerName: 'Badge Name',
      width: 300,
      editable: true,
      headerClassName: 'super-app-theme--header', 
      cellClassName: 'super-app-theme--cell' 
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 160,
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
          disabled={params.row.badge_Name === 'New User'}
        >
          Edit
          <i className="fa-solid fa-pen-to-square" style={{paddingLeft:"4px"}}></i>
        </Button>
      ),
      headerClassName: 'super-app-theme--header', 
      cellClassName: 'super-app-theme--cell' 
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 160,
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
          disabled={params.row.badge_Name === 'New User'}
        >
          Delete
          <i className="fa-solid fa-trash" style={{paddingLeft:"4px"}}></i>
        </Button>
      ),
      headerClassName: 'super-app-theme--header', 
      cellClassName: 'super-app-theme--cell' 
    },
  ];
  
  const openShtoBadge = () => {
    setShfaqShto(true);
  }

  const closeShtoBadge = () => {
    setShfaqShto(false);
  }

  const closeFormenEdit = () => {
    setShfaqEdito(false);
  }

  const closeShfaqFshij = () => {
    setShfaqFshij(false);
  }

  useEffect(() => {
    try {
      axios
      .get('https://localhost:7061/api/AchievementBadge/shfaqBadges')
      .then((response) => {
        setBadges(response.data);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [refreshKey]);
  
  const totalWidth = columns.reduce((acc, column) => acc + (column.width || 0), 0);
  return (
    <Box>
      <div className='shtoButoni'>
        <Button onClick={openShtoBadge}>Shto Badge</Button>
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
          <Box sx={{ width: totalWidth + 50,margin:"0 auto" }}>
            <DataGrid
              rows={badges}
              columns={columns}
              getRowId={(row) => row.badge_Id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5,10,20]}
              autoHeight
              disableRowSelectionOnClick
              getRowClassName={(params) => `super-app-theme--row`}
            />
          </Box>
        </Box>
      )}
       
      {shfaqShto && (
        <ShtoBadge
          mbyllShtoBadge={closeShtoBadge}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}

      {badgeToEditID && shfaqEdito && (
        <EditBadge
          id={badgeToEditID}
          mbyllEditBadge={closeFormenEdit}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}

      {badgeToDeleteID && shfaqFshij && (
        <FshijBadge
          id={badgeToDeleteID}
          shfaqFshij={shfaqFshij}
          mbyllFshij={closeShfaqFshij}
          refreshTeDhenat={() => setRefreshKey(Date.now())}
        />
      )}
    </Box>
  );
}

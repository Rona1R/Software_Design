import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FshijBadge({ id, shfaqFshij, mbyllFshij, refreshTeDhenat }) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://localhost:7061/api/AchievementBadge/fshijBadge/${id}`);
      if (response.status === 200) {
        refreshTeDhenat();
        mbyllFshij();
      }
    } catch (err) {
      console.error("Error deleting badge:", err.response.data);
    }
  };

  return (
    <Dialog open={shfaqFshij} onClose={mbyllFshij}>
      <DialogTitle>Delete Achievement Badge</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this badge?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={mbyllFshij} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';

export default function EditBadge(props) {
  const [badgeName, setBadgeName] = useState('');
  const [error, setError] = useState('');

  const handleBadgeChange=(badge)=>{
    setError("");
    setBadgeName(badge);
  }

  const validoFormen =()=>{
    let validated=true;
    if (!badgeName || badgeName.trim() === "") {
        setError("Emri i badge nuk duhet te jete i zbrazet!");
        validated = false;
    }

    return validated;
  }

  useEffect(() => {
    const fetchBadge = async () => {
      try {
        const response = await axios.get(`https://localhost:7061/api/AchievementBadge/shfaqBadgeSipasId/${props.id}`);
        setBadgeName(response.data.badge_Name);
      } catch (err) {
        setError('Failed to load badge data');
      }
    };
    fetchBadge();
  }, [props.id]);

  const handleSubmit = async () => {
    const isValid = validoFormen();

    if(isValid){
      try {
        const response = await axios.put(`https://localhost:7061/api/AchievementBadge/perditesoBadge/${props.id}/${badgeName}`);
        if (response.status === 200) {
          toast.success("Badge eshte perditesuar me sukses!");
          props.refreshTeDhenat();
          props.mbyllEditBadge();
        }
      } catch (err) {
        setError(err.response.data);
      }
    }
  };

  return (
    <Dialog open={true} onClose={props.mbyllEditBadge}>
      <DialogTitle>Edit Achievement Badge</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Badge Name"
          type="text"
          fullWidth
          variant="standard"
          value={badgeName}
          onChange={(e) => handleBadgeChange(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.mbyllEditBadge} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

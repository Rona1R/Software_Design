import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from "react-toastify";

export default function ShtoBadge(props) {
  const [badgeName, setBadgeName] = useState('');
  const [error, setError] = useState('');

  const handleBadgeChange=(newBadge)=>{
    setError("");
    setBadgeName(newBadge);

  }

  const validoFormen =()=>{
    let validated=true;
    if (!badgeName || badgeName.trim() === "") {
        setError("Emri i badge nuk duhet te jete i zbrazet!");
        validated = false;
    }

    return validated;
  }

  const handleSubmit = async () => {
    const isValid = validoFormen();

    if(isValid){
      try {
        const response = await axios.post(`https://localhost:7061/api/AchievementBadge/shtoBadge/${badgeName}`);
        if (response.status === 200) {
          toast.success("Badge eshte shtuar me sukses");
          props.refreshTeDhenat();
          props.mbyllShtoBadge();
        }
      } catch (err) {
        setError(err.response.data);
      }
    }
  };

  return (
    <Dialog open={true} onClose={props.mbyllShtoBadge}>
      <DialogTitle>Shto Achievement Badge</DialogTitle>
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
        <Button onClick={props.mbyllShtoBadge} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Shto
        </Button>
      </DialogActions>
    </Dialog>
  );
}

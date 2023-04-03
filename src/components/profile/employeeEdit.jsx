import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
//import './dialog.css'
import { useState } from 'react'
const defaultFormFields = {
  name: '',
  contact: ''
};
export default function EditFormDialog({ children }) {
  const [open, setOpen] = React.useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, contact, organization } = formFields
  const handleSubmit = async (e) => {
    e.preventDefault()
    //    props.handleClose()
    try {
      const dataBody = {
        "name": name,
        "contact": contact,
        "email": sessionStorage.getItem("email")
      }
      console.log("data ", dataBody)
      const res = await axios.post("https://ems-backend-k8b6.onrender.com/api/employee/editDetails", dataBody, {
        headers: {
          "accept": 'application/json',
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
        }
      })
      console.log('edit res ', res)
    }
    catch (e) {
      console.log(e)

    }
    setOpen(false);
  }
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='editForm'>
      <Button variant="outlined" onClick={handleClickOpen} className="buttonAdd">
        <h4>Edit your Details</h4>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><div className='editEmployee'>Edit Details</div></DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <form className='employeeEditForm'>
            <div className='inputBox'>
              <input type='text' label='name' name='name' value={name} onChange={handleChange} placeholder='Name'/>
            </div>
            <div className="inputBox">
              <input type='tel' label='contact' name='contact' value={contact} onChange={handleChange} placeholder='Contact' />
            </div>
          </form>

        </DialogContent>
        <div className='actionButton'>
          <Button onClick={handleClose} className="cancelbtn"><span className='action-txt'>Cancel</span></Button>
          <Button onClick={handleSubmit} className="addbtn"><span className='action-txt'>Edit</span></Button>
        </div>
      </Dialog>
    </div>
  );
}

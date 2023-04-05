import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import './dialog.css'
import { useState } from 'react'
const defaultFormFields = {
  name: '',
  email: '',
  password: '',
  contact: '',
  doj: '',
  role: '',
  Department: ''
};
export default function FormDialog({ children }) {
  const [open, setOpen] = React.useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, contact, doj, role, Department } = formFields
  const handleSubmit = async (e) => {
    e.preventDefault()
    //    props.handleClose()
    try {
      const dataBody = {

        "name": name,
        "password": password,
        "contact": contact,
        "role": role,
        "Department": Department,
        "doj": doj,
        "email": email,
        "adminEmail": sessionStorage.getItem("email")
      }
      console.log("data ", dataBody)
      const res = await axios.post("http://localhost:5000/api/admin/addEmployee", dataBody, {
        headers: {
          "accept": 'application/json',
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
        }
      })
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
    <div className='addForm'>
      <button variant="outlined" onClick={handleClickOpen} className="buttonAdd">
        <h4>Add Employee</h4>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><div className='AddEmployee'>Add Employee</div></DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <form className='form'>
            <div className='input-box'>
              <input type='text' label='name' required name='name' value={name} onChange={handleChange} placeholder='Name'/>
            </div>
            <div className="input-box">
              <input type='email' label='email' required name='email' value={email} onChange={handleChange} placeholder='Email' />
            </div>
            <div className="input-box">
              <input type='password' label='password' required name='password' value={password} onChange={handleChange} placeholder='Password' />
            </div>
            <div className="input-box">
              <input type='tel' label='contact' required name='contact' value={contact} onChange={handleChange} placeholder='Contact' />
            </div>
            <div className="input-box">
              <input type='date' label='doj' required name='doj' value={doj} onChange={handleChange} placeholder='Date Of Join' />
            </div>
            <div className="input-box">
              <input type='text' label='role' required name='role' value={role} onChange={handleChange} placeholder='Role' />
            </div>
            <div className="input-box">
              <input type='text' label='department' required name='Department' value={Department} onChange={handleChange} placeholder='Department' />
            </div>
            
          </form>

        </DialogContent>
        <div className='action-btn'>
          <Button onClick={handleClose} className="cancelButton"><span className='action-txt'>Cancel</span></Button>
          <Button onClick={handleSubmit} className="addButton"><span className='action-txt'>Add</span></Button>
        </div>
      </Dialog>
    </div>
  );
}

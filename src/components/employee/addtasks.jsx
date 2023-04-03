import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import './addT.css'


import { MdCancel, MdLabelOff } from "react-icons/md";
//import './dialog.css'
import { useState } from 'react'
const defaultFormFields = {
  type: 'Work',
  description: '',
  duration: 0,
  startTime: new Date()

};
export default function AddDialog({ children }) {
  const [open, setOpen] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { type, description, duration, startTime } = formFields
  const handleSubmit = async (e) => {
    e.preventDefault()
    //    props.handleClose()
    try {
      const dataBody = {
        'taskCategory': type,
        'description': description,
        'startTime': startTime,
        'minutes': duration,
        'email': sessionStorage.getItem('email')
      }
      console.log("data ", dataBody)
      const res = await axios.post("https://ems-backend-k8b6.onrender.com/api/employee/addTask", dataBody, {
        headers: {
          "accept": 'application/json',
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
        }
      })
      console.log(res)

    }
    
    
    catch (e) {
      console.log(e)

    setOpen(false);
  }
  setOpen(false)

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
      <Button variant="outlined" onClick={handleClickOpen} className="buttonAdd">
        <h4>Add Task</h4>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h3 className='AddTask'>Add Task</h3></DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <form className="fromContainer">
              <label htmlFor="type" className="s2">Task Type</label>
              <select id="type" name='type' value={type} onChange={handleChange}>
                <option value="Work">Work</option>
                <option value="Meeting">Meeting</option>
                <option value="Break">Break</option>
              </select>
              <br></br>
          

              <label>Description : </label>
              <input type="text" id="description"
                value={description} name='description'
                onChange={handleChange}  required/>
                <br/>

              <label htmlFor="datatime-local" className="s2">Start Time : </label>
              <input id="datatime-local" name='startTime' type="datetime-local" value={startTime} required
                onChange={handleChange} />
              <br/>
              <label htmlFor="number" className="s2">Duration (minutes) : </label>
              <input id="number" name='duration' type="number" value={duration} required
                onChange={handleChange} />
          </form>
        </DialogContent>
        <div className='action-btn'>
          <Button onClick={handleClose} className="cancelButton"><span className='action-txt'>Cancel</span></Button>
          <Button onClick={handleSubmit} className="addButton"><span className='action-txt'>Add Task</span></Button>
        </div>
      </Dialog>
    </div>
  );
}

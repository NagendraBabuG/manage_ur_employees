import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import './deleteDialog.css'
import { MdDelete } from 'react-icons/md';

import { useState } from 'react'
export default function DeleteDialog({adminEmail, eemail}) {
  //  const data = props
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const token = sessionStorage.getItem("accessToken")

    const deleteClicked = async (e) => {
        e.preventDefault();


        const dataBody = {
            "email": adminEmail,
            "eemail": eemail
        }
        console.log(dataBody)
        const res = await axios.post("http://localhost:5000/api/admin/deleteEmployee", dataBody, {
            headers: {
                "accept": 'application/json',
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        });

        if (res.status === 200) {
            alert("Employee Deleted Succesfully");
            setOpen(false)
            //data.setDelete(false);
        }
        else {
            //data.setDelete(false);
            setOpen(false)
        }
    }


    return (
        <div className='deleteDialog'>
            <Button variant="outlined" onClick={handleClickOpen} className="buttonDelete">
            <MdDelete size={25} color="#F21B3F" />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle><div className='deleteEmployee'>Delete Employee</div></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <h3>Are you sure?</h3>
                    </DialogContentText>
                    <div className="data">
                        <p className="b1">
                            This action cannot be undone. This will permanently delete the
                            Employee.
                        </p>
                    </div>

                </DialogContent>
                <div className='dialog-action'>
                    <Button onClick={handleClose} className="buttonCancel"><span
                    className='action-btn'>Cancel</span></Button>
                    <Button onClick={deleteClicked} className="Deletebutton"><span className='action-btn'>Delete</span></Button>
                </div>
            </Dialog>
        </div>
    );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useState } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import './dialogFollowup.css'

export default function FollowupDialog({ props }) {
  console.log('props ',props)
  const [open, setOpen] = React.useState(false);
  const [serviceList, setServiceList] = useState([{ service: "" }]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    //    props.handleClose()
    let followupArray = []
    
    for(var ind = 0; ind < serviceList.length; ind++)
    {
      followupArray.push(serviceList[ind].service)
    }
    const databody= {
      "eemail": `${sessionStorage.getItem("selectedEmployee")}`,
      "email": sessionStorage.getItem("email"),
      "text": followupArray,
      "date": props.date
    }
    console.log(databody)
    console.log(followupArray)
    const token = sessionStorage.getItem("accessToken")
        const response = await axios.post("https://ems-backend-k8b6.onrender.com/api/admin/addFollowups", databody, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response)
    setOpen(false);

  }
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='followUpForm'>
      <button variant="outlined" onClick={handleClickOpen} className="buttonFollowup">
        <h4>Write your Followup</h4>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className='titleHeading'><div className='followUpTitle'><h2>Write Follow up's here</h2></div></DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <form className="component" autoComplete="off">
      <div className="form-field">
        {serviceList.map((singleService, index) => (
          <div key={index} className="services">
            <div className="first-division">
              <br></br>
              <h3 className="title1">{`Follow Up ${index + 1} : `}</h3>
              <input
                name="service"
                type="textarea"
                id="service"
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
              {serviceList.length !== 0 && (
                
                <span className="removeIcon" onClick={() => handleServiceRemove(index)}><FontAwesomeIcon icon={faSquareMinus} size="2xl"></FontAwesomeIcon></span>
                )}
                
              
            </div>
            
            
          </div>
        ))}
                <div onClick={handleServiceAdd} className="addbuttonFollow">
                <FontAwesomeIcon icon={faPlusSquare} size="2xl"></FontAwesomeIcon>
                  </div>
      </div>
    </form>
        </DialogContent>
        <div className='actionbutton'>
          <button onClick={handleClose} className="cButton"><span className='action-txt'>Cancel</span></button>
          <button onClick={handleSubmit} className="aButton"><span className='action-txt'>Add</span></button>
        </div>
      </Dialog>
    </div>
  );
}

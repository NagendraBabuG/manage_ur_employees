import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import Logo from './images.png'
import axios from "axios"
import EditFormDialog from "./employeeEdit"
import './profile.css'
import FormDialog from "./dialog"
import {useState, useEffect} from 'react'
const Profile = ({ props }) => {
    const [userData, setUserData] = useState({})
    const isRole = (sessionStorage.getItem("userData"));
    const getData = async ()=> {
        console.log('in function')
        const isAdmin = (sessionStorage.getItem("userData") == 'admin') ? true : false;

        if(isAdmin)
        {
            try {
                const token = sessionStorage.getItem("accessToken")
                const response = await axios.get("https://ems-backend-k8b6.onrender.com/api/admin/myDetails", {
                  method: 'GET',
                  params: {
                    "email": `${sessionStorage.getItem("email")}`
                  },
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': `Bearer ${token}`
                  }
                });
                console.log('response')
                console.log(response)
                console.log(response.data.data)
                setUserData(response.data.data);
                console.log('userData ', userData)
          
              }
              catch (error) {
                console.log('error', error)
              }
        }
        else{
          try {
            const token = sessionStorage.getItem("accessToken")
            const response = await axios.get("http://localhost:5000/api/employee/myDetails", {
              method: 'GET',
              params: {
                "email": `${sessionStorage.getItem("email")}`
              },
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${token}`
              }
            });
            console.log('response')
            console.log(response)
            console.log(response.data.data)
            setUserData(response.data.data);
            console.log('userData ', userData)
      
          }
          catch (error) {
            console.log('error', error)
          }
        }
    }
    useEffect(()=>{
        getData()
    }, [])
    return <div className="profile">
        <img src={Logo}/>
        <br></br>
        <div>
            <div className="userrow">
            Username : {userData.name}
            </div>
            <br/>
            <div className="userrow">
            Email : {sessionStorage.getItem("email")}
            </div>
                
            <br/>
            <div className="userrow">
            Contact: {userData.contact  != null ? userData.contact : 'NULL'}
            </div>
            <br/>
            {
            (isRole == 'admin') && <div className="userrow">

            Organization : {userData.Organization != null ? userData.Organization: 'NULL'}
            </div>

            }
            <div>
               {
                (isRole == 'admin') && <FormDialog></FormDialog>
               }
               {
                (isRole != 'admin') && <EditFormDialog></EditFormDialog>
               }
               </div>
        </div>
        </div>
}
export default Profile
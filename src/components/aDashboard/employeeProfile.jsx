import { useState, useEffect } from "react"
import axios from "axios"
import ProfileLogo from './user-profile-icon.png'
import { Navigate, useNavigate } from "react-router-dom"
import './profile.css'
import DayTasks from "./selectedDayTasks"
import Statistics from "./statsProfile"
import { convertToObject } from "typescript"
const EmployeeProfile = ({props})=> {
  
    const today = new Date()
    console.log(today)
    const [dateRequired, setDateRequired] = useState(today)
    console.log(props)
    const navigate =useNavigate()
    const selectedEmployee = props.email
    const setSelectedEmployee = props.setSelectedEmployee
    const email = props.email
    const defaultDetails={
        'name': '',
        'email': email
    }
    const [details, setDetails]= useState(defaultDetails)
    const getUserDetails = async () => {

        try {
      
            const token = sessionStorage.getItem("accessToken")
            const response = await axios.get("https://ems-backend-k8b6.onrender.com/api/admin/getDetails", {
              method: 'GET',
              params: {
                "email": `${sessionStorage.getItem("email")}`,
                "employeeEmail": email
              },
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${token}`
              }
            });
            console.log(response.data)
            setDetails(response.data.data)
            console.log('userDetails , ', details)
          }
          catch (error) {
            console.log('error', error)
          }
        }
        useEffect(() => {getUserDetails()}, [])

        useEffect(() => {
          sessionStorage.setItem("selectedEmployee", props.email);
         }, [props.email]);
         useEffect(() => {
          props.setSelectEmployee(sessionStorage.getItem("selectedEmployee"));
        }, []);

    const handleSubmit = ()=>{
      sessionStorage.setItem("selectedEmployee", "");
      props.setSelectEmployee('')
      navigate('/dashboard')
      
    }
        
    return (
    <div>
      <div className="employeeProfile">
            <div className="col1">
                <h2>Profile</h2>
                <br/>
            <img src={ProfileLogo}/>
            <br/>
            <div className="eName">{details.name ? details.name : 'Null'}</div>
            <br/>
            <div className="eEmail">
                {
                    details.email ? details.email : 'Null'
                }
            </div>
            </div>
            <div className="col2">
                <DayTasks setDateRequired={setDateRequired} dateRequired={dateRequired}/>  
            </div>
            <div className="col3">
                <Statistics user={selectedEmployee} dateRequired={dateRequired}></Statistics>
            </div>
        
    </div>
    <div className="goBack">
                <button onClick={handleSubmit}>Back</button>
    </div>
    </div>
    )
}
export default EmployeeProfile
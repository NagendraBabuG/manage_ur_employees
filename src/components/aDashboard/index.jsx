import React from "react";
import "./index.scss";
import axios from "axios";
import { useState, useEffect } from "react"
import { Navigate, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Employees from "./employees/employees";
import FormDialog from "./employees/dialog";
import EmployeeProfile from "./employeeProfile";
const AdminDashBoard = () => {

  const [cookies, setCookie, removeCookie] = useCookies(["nbk"]);
  const [employeesData, setEmployees] = useState([])
  const [isDataset, setDataset] = useState(false)
  const defaultSemail = sessionStorage.getItem("selectedEmployee")
  console.log(defaultSemail, 'email')

 const[selectedEmployee, setSelectEmployee] = useState(defaultSemail)
 
 useEffect(() => {
  sessionStorage.setItem("selectedEmployee", selectedEmployee);
 }, [selectedEmployee]);
 useEffect(() => {
  setSelectEmployee(sessionStorage.getItem("selectedEmployee"));
}, []);



  
  const navigate = useNavigate()
  useEffect(() => {
    if (cookies["nbk"]) navigate("/dashboard")
    else navigate("/signin")
  }, [cookies])
  console.log('admin')

  const getAllEmployees = async () => {
    try {
      
      const token = sessionStorage.getItem("accessToken")
      const response = await axios.get("https://ems-backend-k8b6.onrender.com/api/admin/myemployees", {
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
      console.log(response.data)
      setEmployees(response.data.data)
      setDataset(true)

    }
    catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    getAllEmployees()
  }, [])
  
  const profileProps = {
    'email': selectedEmployee,
    setSelectEmployee
  }
  console.log(sessionStorage.getItem("selectedEmployee"), ' storage')
  
  return (
    <>{
      (selectedEmployee != '' && selectedEmployee != null && selectedEmployee != 'null') ? <EmployeeProfile props={profileProps}></EmployeeProfile>
      : 
    <div className="admin">
      <div className="top-part">
        <h3>Your Employees</h3>
        <FormDialog>
        </FormDialog>
      </div>
        {
          isDataset && <Employees users={employeesData} setEmployeeId={setSelectEmployee}/>
        }
      
      

    </div>}
    </>
  );
};

export default AdminDashBoard;


import React from "react";
//import ADashboard from '../aDashboard/aDashboard'
import AdminDashBoard from "../aDashboard/index";
//import EDashboard from '../eDashboard/Edashboard'
import EmployeeDashboard from "../employee/index.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { getUserDoc } from "../../utils/firebase";
import EmployeeBoard from "../employee/newindex";
import { useCookies } from "react-cookie";
const Dashboard = ()=> {
	const [role, setRole] = useState()
	const [cookies, setCookie] = useCookies(["nbk"]);
	const userRole = sessionStorage.getItem("userData")
	console.log(userRole)
	// useEffect(async () => {
	// 	const user = await getUserDoc();
	// 	if(user) setRole(user.role)
	// }, []);
	return (
		<div>
			{(userRole == 'employee') && <EmployeeBoard/>}
			{ (userRole == 'admin') && <AdminDashBoard/>}
		</div>
	)
}
export default Dashboard;
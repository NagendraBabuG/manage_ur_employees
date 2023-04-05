import './newind.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AllTasks from "./allTasks.jsx";
import EditProfile from "./editProfile";
import WeeklyEmployeeBar from "./weeklyebar.jsx";
import TodayEmployee from './todaye.jsx';
import AddDialog from './addtasks';
import ShowTask from './TaskShow';
import AssignTask from './followup';

const EmployeeBoard = () => {
    var rightNow = new Date();
    var [addTaskShow, setAddTask] = useState(false);
    var [editProfileShow, setEditProfile] = useState(false);

    var email = sessionStorage.getItem('email');
    var [allTasks, setAllTasks] = useState([]);

    var [dateRequired, setDateRequired] = useState(rightNow);

    let today = dateRequired;
    const tdate = new Date()
    let stoday = tdate.getFullYear() + "-" + String(tdate.getMonth() + 1).padStart(2, "0") + "-" + String(tdate.getDate()).padStart(2, "0");
    if (typeof today != "string") {
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + "-" + mm + "-" + dd;
        console.log(today)
    }
    const getAllTasks = async () => {
        var data = { 'email': sessionStorage.getItem('email') };
        const token = sessionStorage.getItem("accessToken")
        const response = await axios.get("https://ems-backend-k8b6.onrender.com/api/employee/allTasks", {
            method: 'GET',
            params: {
                "email": `${sessionStorage.getItem("email")}`
            },
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${token}`
            }
        });
        const tasksList = response.data.data
        setAllTasks(tasksList);
    };
    useEffect(() => {
        getAllTasks();
    }, []);

    function handleEdit() {
        setEditProfile(false);
        setAddTask(!addTaskShow);
    }

    function handlePress() {
        setAddTask(false);
        setEditProfile(true);
    }

    useEffect(() => {
        getAllTasks()
    }, [dateRequired]);

    const handleChange = (e) => {
        setDateRequired(e.target.value)
        console.log(dateRequired)
        getAllTasks()
    }

    return (
        <div className='edashboard'>
            <div className='tasksBar'>
                <div className='sDate'>
                    Select Date :  <input type='date' value={dateRequired} onChange={handleChange} placeholder='Select Date' />
                </div>
                <ShowTask props={allTasks} dateFor={dateRequired}></ShowTask>
                {(today == stoday) && <div className='addtask'><AddDialog>Add Task</AddDialog></div>}
            </div>
            <div className='secondDiv'>
                <div className='pieChar'>
                    <h3>PieChart for {today}</h3>
                <TodayEmployee props={allTasks} forDate={dateRequired} />
                </div>

            <div className='followups'>
                <AssignTask></AssignTask>
            </div>
            </div>
        </div>
    )
}
export default EmployeeBoard
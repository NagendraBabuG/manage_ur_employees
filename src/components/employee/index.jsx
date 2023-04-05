import { useState, useEffect } from 'react'
//import "./index.scss";
//import './main.scss'
//import './chatcss.css'
import './newindex.css'
import AddTaskButton from "./addTask";
import AddDialog from './addtasks';
import axios from "axios";
import AllTasks from "./allTasks.jsx";
import EditProfile from "./editProfile";
import WeeklyEmployeeBar from "./weeklyebar.jsx";

import TodayEmployee from './todaye.jsx';


function EmployeeDashboard() {
  var rightNow = new Date();
  var [addTaskShow, setAddTask] = useState(false);
  var [editProfileShow, setEditProfile] = useState(false);

  var email = sessionStorage.getItem('email');
  var [allTasks, setAllTasks] = useState([]);

  var [dateRequired, setDateRequired] = useState(rightNow);


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
    //   console.log('data ', tasksList)
    //   tasksList.forEach(element => {
    //     console.log(element)
    //   });
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



  return (
    <div className="employeedashboard">
      <div className="today-task">
        
      <div className='title-heading'>
        <div className="heading">
          <h3>Today’s Tasks</h3>

        </div>
        <div className='addtask'>

          <AddDialog>Add Task</AddDialog>

        </div>

        </div>
        <br />

        <div className="alltask">
          <AllTasks props={allTasks} dateFor={rightNow} />
        </div>
      </div>
      <br />
      <div className="today-graph">
        <div className="h3"><h3>Today’s Stats</h3></div>
        <div className="border">
          <div>
            <TodayEmployee props={allTasks} forDate={rightNow} />
          </div>
        </div>
      </div>
      <br />
      <div className="weekly-graph">
        <div className="h3"><h3>Weekly Stats</h3></div>
        <div className="border">
          <WeeklyEmployeeBar props={allTasks} />
        </div>
      </div>
      <br />
      <div className="select-graph">
        <div className="h3"><h3>Day-wise Stats</h3></div>
        <div className="border">
          <form>
            <input type="date" value={dateRequired} className="button"
              onChange={(e) => setDateRequired(e.target.value)} />
          </form>
          <div>
            <TodayEmployee forDate={dateRequired} props={allTasks} />
          </div>
        </div>
      </div>
      {editProfileShow && <EditProfile props={setEditProfile} />}
    </div>

  );
}

export default EmployeeDashboard;
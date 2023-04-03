import { useState, useEffect} from "react"
import axios from "axios"
import './selectedDayTasks.css'
import FollowupDialog from "./dialogFollowup"
const DayTasks = ({setDateRequired, dateRequired})=> {
    // const today = new Date()
    // console.log(today)
    // const [dateRequired, setDateRequired] = useState(today)
    console.log(dateRequired, 'date')
    const [tasks, setTasks] = useState([])
    const [allTasks, setAllTasks] = useState([])
    const handleSubmit = async (event)=> {
        event.preventDefault()
        console.log('required date ' ,dateRequired)
        await getAllTasks()

    }
    const handleChange = (event) => {
        const value = event.target.value;
        //console.log("input date, ", value)
        
    };
    const getAllTasks = async () => {
    var data = { 'email': sessionStorage.getItem('selectedEmployee') };
        const token = sessionStorage.getItem("accessToken")
        const response = await axios.get("https://ems-backend-k8b6.onrender.com/api/employee/allTasks", {
          method: 'GET',
          params: {
            "email": `${sessionStorage.getItem("selectedEmployee")}`
          },
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Bearer ${token}`
          }
        });
        const tasksList = response.data.data
        const todayTasks = []
        setAllTasks(tasksList);
        //console.log('all tasks ',allTasks)
        let dateFormat= dateRequired
        if(typeof dateFormat != 'string'){
            var dd = String(dateFormat.getDate()).padStart(2, "0");
            var mm = String(dateFormat.getMonth() + 1).padStart(2, "0"); //January is 0!
            var yyyy = dateFormat.getFullYear();
            dateFormat = yyyy + "-" + mm + "-" + dd;
        }
        //console.log('required date real ', dateFormat)
        //console.log(allTasks.length)
        for(let ind = 0; ind < allTasks.length; ind++){
                //console.log('starttime ',allTasks[ind].starttime.slice(0, 10))
                if(dateFormat == allTasks[ind].starttime.slice(0, 10))
                {
                    //console.log('task ',allTasks[ind])
                    todayTasks.push(allTasks[ind])
                }
            
        }
        setTasks(todayTasks)
      };
      useEffect(() => {
        getAllTasks();
      }, []);
    
      const propsRequired={
        'date': dateRequired
      }
    return <div className="taskContainer">
        <h2>Tasks</h2>
        <form onSubmit={handleSubmit}>
            Select Date :
            <input type="date" value={dateRequired} onChange={(e)=> {
                setDateRequired(e.target.value)
                console.log(dateRequired)
            }}/>
            <button type="submit" className="tasksbutton"> Get Tasks </button>
        </form>
        <table className="alltasks">
            <thead className="tablehead">
            <tr>
                        <th>Task Type</th>
                        <th>Task Description</th>
                        <th>Start Time</th>
                        <th>Time Taken</th>
                    </tr>
            </thead>
            <tbody className="tablebody">
             {tasks.map((task) => (
                        <tr key={task._id}>
                            <td>{task.task_category}</td>
                            <td>{task.Description}</td>
                            <td>{task.starttime == null ? " 00:00:00" : task.starttime.slice(11,19)}</td>
                            <td>{task.totalminutes}</td>
                        </tr>
                    )) 
             }      
            </tbody>
        </table>
        {
            tasks.length == 0 && <p className="notasks">You haven't added any Tasks Yet !!!</p>
        }

        <div className="followupDialog">
                <h2 className="followheading">Write your Follow up here...</h2>
                <FollowupDialog props={propsRequired}></FollowupDialog>
        </div>
    </div>
}
export default DayTasks
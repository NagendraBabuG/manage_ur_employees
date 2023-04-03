import BarChart from "../employee/stackedbarchar"
import { useState, useEffect} from "react"
import axios from "axios"
import TodayEmployee from "../employee/todaye"
import PieChart from "../employee/piechar"
const Statistics = ({selectedEmployee, dateRequired})=> {
    console.log(selectedEmployee, dateRequired)
    const [tasks, setTasks] = useState([])
    const getAllTasks = async () => {
        var data = { 'email': sessionStorage.getItem('selectedEmployee') };
            const token = sessionStorage.getItem("accessToken")
            const response = await axios.get("https://ems-backend-k8b6.onrender.com/api/employee/allTasks", {
              method: 'GET',
              params: {
                "email": sessionStorage.getItem('selectedEmployee')
              },
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${token}`
              }
            });
            const tasksList = response.data.data
            const todayTasks = []
            //console.log('all tasks ',allTasks)
            let dateFormat= dateRequired
            if(typeof dateFormat != 'string'){
                var dd = String(dateFormat.getDate()).padStart(2, "0");
                var mm = String(dateFormat.getMonth() + 1).padStart(2, "0"); //January is 0!
                var yyyy = dateFormat.getFullYear();
                dateFormat = yyyy + "-" + mm + "-" + dd;
            }
            for(let ind = 0; ind < tasksList.length; ind++){
                    //console.log('starttime ',allTasks[ind].starttime.slice(0, 10))
                    if(dateFormat == tasksList[ind].starttime.slice(0, 10))
                    {
                        //console.log('task ',allTasks[ind])
                        todayTasks.push(tasksList[ind])
                    }
                
            }
            setTasks(todayTasks)
            console.log('in graphs, ', tasks)
          };
          useEffect(()=>{
            getAllTasks()
          }, [dateRequired])
    return <div>
        <h2>Bar Graph for Today</h2>
          <TodayEmployee forDate={dateRequired} props={tasks}></TodayEmployee>
    </div>
}
export default Statistics
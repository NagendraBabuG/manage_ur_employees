import { useState, useEffect } from "react"
import axios from "axios"
import './followup.css'
const AssignTask = ()=> {
    const semail = sessionStorage.getItem("email")
    const [assignedTasks, setAssignedTasks] = useState([])
    const getAssignedTasks = async ()=>{
        const token = sessionStorage.getItem("accessToken")
        const response = await axios.get("https://ems-backend-k8b6.onrender.com/api/employee/getfollowups", {
            method: 'GET',
            params: {
                "email": `${sessionStorage.getItem("email")}`
            },
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response)
        const tasksList = response.data.data
        console.log('tasklist ', tasksList)
        const newArr = []
        for(let ind = 0; ind < tasksList.length; ind++)
        {
            for(let j = 0; j < tasksList[ind].text.length; j++)
            {
                console.log('task ',tasksList[ind].text[j])
                newArr.push(tasksList[ind].text[j])
            }
        }
        setAssignedTasks(newArr)
        assignedTasks.map((task)=>{
            console.log(task)
        })
        console.log(assignedTasks, ' assigned tasks')
    }
    useEffect(()=>{
        getAssignedTasks()
    }, [])
    return (<div className="assignedTasks">
            <h2 className="Heading">Tasks Assigned By Manager or Team Lead Recently</h2>
            {
                assignedTasks.map((task, index)=>(
                    <h2 className="atask">{`${index + 1}        ${task}`}</h2>
                ))
            }


    </div>)
}
export default AssignTask
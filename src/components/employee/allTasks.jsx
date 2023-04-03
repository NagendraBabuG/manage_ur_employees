import React from "react";
//import { useState } from "react";
import "./TasksTable.scss";
//import "./index.scss";

function AllTasks(props){

    var data = props.props;
   // var today = props.dateFor;
    console.log('all tasks', data)
    // console.log(data);
    // const [tasks, setTasks] = useState(data);
    const newArr = []
    let today = new Date();
    console.log(today)
    // var today = new Date();
    if(typeof today != "string"){
         var dd = String(today.getDate()).padStart(2, "0");
         var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
         var yyyy = today.getFullYear();
         today = yyyy + "-" + mm + "-" + dd;
         console.log(today)
    }

   
    // console.log("in table")
    // console.log(today)
    // console.log(data.length)
    for(var i=0;i<data.length;i++){
        console.log(data[i].starttime.slice(0, 10))
        if(today == data[i].starttime.slice(0, 10)){
            newArr.push(data[i])
        }
    }
    console.log(newArr)
    return (
        <div className="tasklist">
            <table className="task-data">
                <thead className="s2h">
                    <tr>
                        <th>Task Type</th>
                        <th>Task Description</th>
                        <th>Start Time</th>
                        <th>Time Taken</th>
                    </tr>
                </thead>
                <tbody>
                    {newArr.map((task) => (
                        <tr key={task._id}>
                            <td>{task.task_category}</td>
                            <td>{task.Description}</td>
                            <td>{task.starttime == null ? " 00:00:00" : task.starttime.slice(11,19)}</td>
                            <td>{task.totalminutes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllTasks;

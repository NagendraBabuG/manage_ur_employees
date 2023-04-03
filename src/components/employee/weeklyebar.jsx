import React from "react";
import PieChart from "./piechar";
import BarChart from "./stackedbarchar";

function WeeklyEmployeeBar(props){
    var data = props.props;
    var totalWork = 0
    var totalMeet = 0
    var totalBreak = 0
    var pastDates = 0
    for(var j=6;j>=0;j--){
        var work = 0;
        var meet = 0;
        var recess = 0;
        var today = new Date();
        today.setDate(today.getDate() - j);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;

        for (var i = 0; i < data.length; i++) {
            var current = data[i];
            var dateloc = current.starttime.toString();
            dateloc = dateloc.slice(0, 10);
            if (dateloc === today) {
                if (current.task_category === "Meeting") {
                meet += current.totalminutes;
                } else if (current.task_category === "Work") {
                work += current.totalminutes;
                } else {
                recess += current.totalminutes;
                }
            }
        }
        totalBreak += recess;
        totalMeet += meet;
        totalWork += work;
        pastDates += today;
    }
    console.log(totalWork, totalMeet, totalBreak)
    var toPass= [totalWork, totalMeet, totalBreak]
    return (
        <PieChart props = {toPass}/>
    )
}

export default WeeklyEmployeeBar;
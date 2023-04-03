import React from "react";

import PieChart from "./piechar.jsx";

function TodayEmployee(props) {
  var data = props.props;
  var today = props.forDate;

  var work = 0;
  var meet = 0;
  var recess = 0;
  if(typeof (today) != "string"){
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
  }
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

  if(work == 0 && meet == 0 && recess == 0)
  {
    return <div>
        To show Pie chart, you have no Tasks added...
    </div>
  }
  var toPass = [work, meet, recess];
  console.log(toPass)
  return <PieChart props={toPass} />;
}

export default TodayEmployee;

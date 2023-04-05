import 'bootstrap/dist/css/bootstrap.min.css';

import './taskshow.css'

const ShowTask = (props)=> {
    const Tasks = props.props, date = props.dateFor
    
    const newArr = []
    let today = date;
    const tdate = new Date()
    let stoday = tdate.getFullYear() + "-" + String(tdate.getMonth() + 1).padStart(2, "0")+"-"+String(tdate.getDate()).padStart(2, "0");
    if(typeof today != "string"){
         var dd = String(today.getDate()).padStart(2, "0");
         var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
         var yyyy = today.getFullYear();
         today = yyyy + "-" + mm + "-" + dd;
         console.log(today)
    }
    for(var i=0;i<Tasks.length;i++){
        console.log(Tasks[i].starttime.slice(0, 10))
        if(today == Tasks[i].starttime.slice(0, 10)){
            newArr.push(Tasks[i])
        }
    }
    console.log(stoday, today)
    console.log(newArr)
    return (
        <div className="gradient-custom-2">
        
            <div className="col-md-12 col-xl-10">
      
              <div className="card mask-custom">
                <div className="card-body p-4 text-white">
      
                  <div className="text-center pt-3 pb-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                      alt="Check" width="60px" />
                    <h2 className="my-4">{(today == stoday) ? `Today's` : `${today}`} Task List</h2>
                  </div>
      
                  <table className="table text-white mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Task Type</th>
                        <th scope="col">Task</th>
                        <th scope="col">Start-Time</th>
                        <th scope="col">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            newArr.map((task, index)=> (
                                <tr className="fw-normal" key={index}>
                        <th>
                          {task.task_category}
                        </th>
                        <td className="align-middle">
                          {task.Description}
                        </td>
                        <td className="align-middle">
                          <h6 className="mb-0"><span className="badge bg-danger">{task.starttime == null ? " 00:00:00" : task.starttime.slice(11,19)}</span></h6>
                        </td>
                        <td className="align-middle">
                        {task.totalminutes}
                        </td>
                      </tr>
                     
                            ))
                        }
                     
                        {
                          (newArr.length == 0)&&<div className='notasks'>
                            {
                              (newArr.length == 0)&& <h2>You haven't Added no Tasks...</h2>
                            }
                          </div>
                          
                        }
                    </tbody>
                  </table>
      
      
                </div>
              </div>
        </div>
        </div>
    )
}
export default ShowTask
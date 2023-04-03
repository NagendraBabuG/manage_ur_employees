import { Types } from 'mongoose'
import { ReactNode } from 'react';
import "./allEmployees.scss";
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import DeleteDialog from './deleteEmployeeDialog';
import { Link } from 'react-router-dom';

interface userData {
    name: string,
    email: string,
    role: string,
    contact: string,
    department: string,
    dateOfJoin: string,
    adminId: string,
    _id: string,
    createdAt?:string,
    updatedAt?: string,
    __v?:string | number;

}
interface userList {
    users: userData[];
}
interface datatopass{
    adminEmail : string | null;
    eemail : string | null;
    setDelete : any;
}
interface ButtonProps{
    setEmployeeId: (params : string) => void;
    users: userData[];
}
const Employees = ({ users, setEmployeeId}: ButtonProps) => {
    console.log('in all employees', users)
    const [isDelete, setDelete] = useState<boolean>(false);
    const [employee, setEmployee] = useState<string>("")
    const Edata: userData[] = users;
    const adminEmail = sessionStorage.getItem("email")
    const eemail : string | null= employee
    const data : datatopass= {
          adminEmail, eemail, setDelete
    }
    users.map((user: userData)=>{
        console.log(user)
    })
    const handleEmployee = ()=>{

    }

    return (
        <div className='employees'>
            <table className='table-content'>
                <thead className="s1">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Department</th>
                        <th>Joining Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
          
                    {
                        users.map((user: userData):ReactNode => (
                            
                            <tr className='b2' key={JSON.stringify(user._id)}>
                                <td>
                                    <button className="BtnName b2" onClick={()=> {
                                        sessionStorage.setItem("selectedEmployee", user.email)
                                        setEmployeeId(user.email)
                                    }}><u>{user.name}</u></button>
                                    
                                </td>
                                <td>{user.email}</td>
                                <td>{user.contact}</td>
                                <td>{user.department}</td>
                                <td>{user.dateOfJoin.slice(0, 10)}</td>
                                <td>
        
                                    {
                                        

                                        <DeleteDialog adminEmail={sessionStorage.getItem("email")} eemail={user.email}/>
                                    }
                                </td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>
          
           

        </div>
    )
}

export default Employees;
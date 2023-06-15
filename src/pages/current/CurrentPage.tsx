import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { IEmployee } from "../employees/types";
import { ITask } from "../tasks/types";
import axios from "axios";
import "./current.css"


export const CurrentPage = () => {
    const [item, setItem] = useState<IEmployee>()
    const [task, setTask] = useState<ITask[]>()
    const { pathname } = useLocation()
    const id = pathname.split("/")[2];

    useEffect(() => {
        const getEmployees = async () => {
            const response = await axios.get(`https://rocky-temple-83495.herokuapp.com/employees/${Number(id)}`)
            setItem(response.data)
            const resT = await axios.get("https://rocky-temple-83495.herokuapp.com/tasks")
            setTask(resT.data.filter((obj: { employeeId: number }) => obj.employeeId === Number(id)))
        }
        getEmployees()
    }, [id])


    return (
        <div className="current">
            <div className="item">
                <img src="https://cdn-icons-png.flaticon.com/512/3789/3789820.png" alt="logo" />
                <h3>{item?.name} {item?.surname}</h3>
                <h4>{item?.position}</h4>
                <p>{item?.email}</p>
            </div>
            <div className="tasks">
                {task?.map(t => {
                    return <div key={t.id} className="task">
                        <img src="https://cdn-icons-png.flaticon.com/512/2098/2098402.png" alt="logo" />
                        <h3>{t.name}</h3>
                        <p>{t.description}</p>
                        <p>Start: {t.startDate}</p>
                        <p>End: {t.endDate}</p>
                        <p>Employee ID: {t.employeeId}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

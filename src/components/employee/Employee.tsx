import { useNavigate } from "react-router-dom"
import { IEmployee } from "../../pages/employees/types"
import "./employee.css"

export const Employee = ({ e, deleteEmployee, updateEmployee }: { e: IEmployee, deleteEmployee: (id: number) => void, updateEmployee: (id: number) => Promise<void> }) => {
    const navigate = useNavigate()
    return (
        <div className="employee">
            <img src="https://cdn-icons-png.flaticon.com/512/3789/3789820.png" alt="logo"
                onClick={() => navigate(`/employees/${e.id}`)}
            />
            <h3>{e.name} {e.surname}</h3>
            <p>{e.position}</p>
            <p>{e.email}</p>
            <button onClick={() => { deleteEmployee(e.id) }}>X</button>
            <button
                className="update"
                onClick={() => { updateEmployee(e?.id) }}
            >Click to Update</button>
        </div>
    )
}

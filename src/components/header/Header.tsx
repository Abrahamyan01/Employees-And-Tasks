import { useNavigate } from "react-router-dom"
import "./header.css"

export const Header = () => {
    const navigate = useNavigate()
    return (
        <div className="header">
            <ul>
                <li onClick={() => navigate("/")}>Home</li>
                <li onClick={() => navigate("/employees")}>Employees</li>
                <li onClick={() => navigate("/tasks")}>Tasks</li>
            </ul>
        </div>
    )
}


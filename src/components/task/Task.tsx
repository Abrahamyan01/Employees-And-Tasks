import { ITask } from "../../pages/tasks/types"
import "./task.css"

export const Task = ({ task, deleteTask, updateTask }: { task: ITask, deleteTask: (id: number) => Promise<void>, updateTask: (id: number) => Promise<void> }) => {
    return (
        <div className="task">
            <img src="https://cdn-icons-png.flaticon.com/512/2098/2098402.png" alt="logo" />
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Start: {task.startDate}</p>
            <p>End: {task.endDate}</p>
            <p>Employee ID: {task.employeeId}</p>
            <button
                className="delete"
                onClick={() => { deleteTask(task.id) }}>X</button>
            <button
                className="update"
                onClick={() => { updateTask(task.id) }}
            >Click to Update</button>
        </div>
    )
}

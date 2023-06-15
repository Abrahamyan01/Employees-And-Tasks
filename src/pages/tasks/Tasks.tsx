import { useEffect, useState } from "react"
import { Pagination } from "../../components/pagination/Pagination"
import { Task } from "../../components/task/Task"
import { ISearch, ITask } from "./types"
import axios from "axios"
import "./tasks.css"

export const Tasks = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [search, setSearch] = useState<ISearch>({})
    const [tasks, setTasks] = useState<ITask[]>()
    const [newTask, setNewTask] = useState<ITask>({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        id: Math.random(),
        employeeId: 0
    })

    useEffect(() => {
        if (Object.values(search).length) {
            const getTasks = async () => {
                setLoading(true)
                const response = await axios.get('https://rocky-temple-83495.herokuapp.com/tasks?', {
                    params: { ...search }
                })
                setTasks(response.data)
                setLoading(false)
            }
            getTasks()
        } else {
            const getTasks = async () => {
                setLoading(true)
                const response = await axios.get(`https://rocky-temple-83495.herokuapp.com/tasks?_page=${currentPage}&_limit=6`)
                setTasks(response.data)
                setLoading(false)
            }
            getTasks()
        }
    }, [tasks, search, currentPage])

    const postTask = async (newTask: ITask) => {
        const response = await axios.post("https://rocky-temple-83495.herokuapp.com/tasks", { ...newTask })
        setNewTask({
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            id: Math.random(),
            employeeId: 0
        })
    }
    const deleteTask = async (id: number) => {
        const response = await fetch(`https://rocky-temple-83495.herokuapp.com/tasks/${id}`, {
            method: "DELETE"
        })
    }
    const updateTask = async (id: number) => {
        const response = await axios.put(`https://rocky-temple-83495.herokuapp.com/tasks/${id}`, { ...newTask })
    }
    const convertDigitIn = (str: string) => {
        return str.split('-').reverse().join('/');
    }
    const paginate = (n: number) => {
        setCurrentPage(n)
    }
    const forTo = "tasks"
    return (
        <div className="tasks_page">
            <div className="search_part">
                <h4>For Search</h4>
                <label>Enter Name:
                    <input
                        type="text"
                        onChange={(e) => { setSearch({ ...search, name_like: e.target.value }) }}
                    />
                </label>
                <label>Enter Description:
                    <input
                        type="text"
                        onChange={(e) => { setSearch({ ...search, description_like: e.target.value }) }}
                    />
                </label>
                <label>Enter Start Date:
                    <input
                        type="date"
                        onChange={(e) => { setSearch({ ...search, startDate: convertDigitIn(e.target.value) }) }}
                    />
                </label>
                <label>Enter Start Date:
                    <input
                        type="date"
                        onChange={(e) => { setSearch({ ...search, endDate: convertDigitIn(e.target.value) }) }}
                    />
                </label>
            </div>
            <form className="form">
                <label>Enter Name:
                    <input
                        type="text"
                        value={newTask.name}
                        onChange={(e) => { setNewTask({ ...newTask, name: e.target.value }) }}
                    />
                </label>
                <label>Enter Description:
                    <input
                        type="text"
                        value={newTask.description}
                        onChange={(e) => { setNewTask({ ...newTask, description: e.target.value }) }}
                    />
                </label>
                <label>Enter Start Date:
                    <input
                        type="date"
                        value={newTask.startDate}
                        onChange={(e) => { setNewTask({ ...newTask, startDate: e.target.value }) }}
                    />
                </label>
                <label>Enter End Date:
                    <input
                        type="date"
                        value={newTask.endDate}
                        onChange={(e) => { setNewTask({ ...newTask, endDate: e.target.value }) }}
                    />
                </label>
                <label>Enter Employee Id:
                    <input
                        type="number"
                        value={newTask.employeeId}
                        onChange={(e) => { setNewTask({ ...newTask, employeeId: Number(e.target.value) }) }}
                    />
                </label>
                <button onClick={(e) => {
                    e.preventDefault()
                    if (newTask.name && newTask.employeeId) {
                        postTask(newTask)
                    } else {
                        alert("Enter Name and Id...")
                    }
                }}>Sumbit to Add</button>
            </form>
            <div className="tasks">
                {loading ? tasks?.map(task => {
                    return <Task key={Math.random()} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                }) : "Loading..."}
            </div>
            <Pagination forTo={forTo} paginate={paginate} />
        </div>
    )
}

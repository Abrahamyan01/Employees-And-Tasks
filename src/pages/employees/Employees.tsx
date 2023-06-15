import { useEffect, useState } from "react"
import { IEmployee } from "./types"
import { Employee } from "../../components/employee/Employee"
import axios from "axios"
import "./employees.css"
import { useActionData } from "react-router-dom"
import { Pagination } from "../../components/pagination/Pagination"

export const Employees = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [employees, setEmployees] = useState<IEmployee[]>([])
    const [newEmployee, setNewEmployee] = useState<any>({
        name: "",
        surname: "",
        email: "",
        position: ""
    });

    useEffect(() => {
        const getEmployees = async () => {
            setLoading(true)
            const response = await fetch(`https://rocky-temple-83495.herokuapp.com/employees?_page=${currentPage}&_limit=6`)
            const data = await response.json()
            setEmployees(data)
            setLoading(false)
        }
        getEmployees()
    }, [employees, currentPage])

    const postEmployee = async (newEmployee: IEmployee) => {
        const response = await axios.post("https://rocky-temple-83495.herokuapp.com/employees", { ...newEmployee })
        const data = await response
        console.log(data)
        setNewEmployee({
            name: "",
            surname: "",
            email: "",
            position: ""
        })
    }

    const deleteEmployee = async (id: number) => {
        const response = await fetch(`https://rocky-temple-83495.herokuapp.com/employees/${id}`, {
            method: "DELETE"
        })
    }
    const updateEmployee = async (id: number) => {
        const response = await axios.put(`https://rocky-temple-83495.herokuapp.com/employees/${id}`, { ...newEmployee })
    }
    const paginate = (n: number) => {
        setCurrentPage(n)
    }
    const forTo = "employees"
    
    return (
        <div className="employees_page">
            <form className="form">
                <label>Enter Name:
                    <input
                        type="text"
                        value={newEmployee.name}
                        onChange={(e) => { setNewEmployee({ ...newEmployee, name: e.target.value }) }}
                    />
                </label>
                <label>Enter Surname:
                    <input
                        type="text"
                        value={newEmployee.surname}
                        onChange={(e) => { setNewEmployee({ ...newEmployee, surname: e.target.value }) }}
                    />
                </label>
                <label>Enter Position:
                    <input
                        type="text"
                        value={newEmployee.position}
                        onChange={(e) => { setNewEmployee({ ...newEmployee, position: e.target.value }) }}
                    />
                </label>
                <label>Enter Email:
                    <input
                        type="text"
                        value={newEmployee.email}
                        onChange={(e) => { setNewEmployee({ ...newEmployee, email: e.target.value }) }}
                    />
                </label>
                <button onClick={(e) => {
                    e.preventDefault()
                    if (newEmployee.name) {
                        postEmployee(newEmployee)
                    } else {
                        alert("Please Enter Name...")
                    }
                }}>Sumbit to Add</button>
            </form>
            <div className="employees">
                {loading ? employees?.map((e: IEmployee) => {
                    return <Employee e={e} key={e.id} deleteEmployee={deleteEmployee} updateEmployee={updateEmployee} />
                }) : "Loading..."}
            </div>
            <Pagination forTo={forTo} paginate={paginate} />
        </div>
    )
}



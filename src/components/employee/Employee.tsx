import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IEmployee } from "../../pages/employees/types";
import "./employee.css";


export const Employee = ({
  e,
  deleteEmployee,
  updateEmployee,
}: {
  e: IEmployee;
  deleteEmployee: (id: number) => void;
  updateEmployee: (data: IEmployee) => Promise<void>;
}) => {

  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState({
    email: "",
    id: Infinity,
    name: "",
    position: "",
    surname: "",
  });
  const [edit, setEdit] = useState(false);

  return (
    <div className="employee">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3789/3789820.png"
        alt="logo"
        onClick={() => navigate(`/employees/${e.id}`)}
      />
      <h3>
        {e.name} {e.surname}
      </h3>
      <p>{e.position}</p>
      <p>{e.email}</p>
      <button
        className="x"
        onClick={() => {
          deleteEmployee(e.id);
        }}
      >
        X
      </button>
      <button
        className="update"
        onClick={() => {
          setEdit(!edit);
          setShowEdit({
            email: e.email,
            id: e.id,
            name: e.name,
            position: e.position,
            surname: e.surname,
          });
        }}
      >
        Click to Update
      </button>
      <div
        className="update_part"
        style={{ display: edit ? "block" : "none" }}>
        <input
          type="text"
          value={showEdit.name}
          onChange={(e) => setShowEdit({ ...showEdit, name: e.target.value })}
        />
        <input
          type="text"
          value={showEdit.surname}
          onChange={(e) =>
            setShowEdit({ ...showEdit, surname: e.target.value })
          }
        />
        <input
          type="text"
          value={showEdit.position}
          onChange={(e) =>
            setShowEdit({ ...showEdit, position: e.target.value })
          }
        />
        <input
          type="email"
          value={showEdit.email}
          onChange={(e) => setShowEdit({ ...showEdit, email: e.target.value })}
        />
        <button
          className="save"
          onClick={() => {
            updateEmployee(showEdit);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

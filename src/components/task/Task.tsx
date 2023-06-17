import { useState } from "react";
import { ITask } from "../../pages/tasks/types";
import "./task.css";

export const Task = ({
  task,
  deleteTask,
  updateTask,
}: {
  task: ITask;
  deleteTask: (id: number) => Promise<void>;
  updateTask: ({
    id,
    name,
    description,
    startDate,
    endDate,
    employeeId,
  }: ITask) => Promise<void>;
}) => {
  const [makeUpdate, setMakeAbdate] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    employeeId: 0,
  });
  const [update, setUpdate] = useState(false);

  return (
    <div className="task">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2098/2098402.png"
        alt="logo"
      />
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Start: {task.startDate}</p>
      <p>End: {task.endDate}</p>
      <p>Employee ID: {task.employeeId}</p>
      <button
        className="delete"
        onClick={() => {
          deleteTask(task.id);
        }}
      >
        X
      </button>
      <button
        className="update"
        onClick={() => {
          setUpdate(!update);
          setMakeAbdate({
            description: `${task.description}`,
            employeeId: task.employeeId,
            endDate: `${task.endDate}`,
            name: task.name,
            startDate: `${task.startDate}`,
          });
        }}
      >
        Click to Update
      </button>
      <div
        className="task_update"
        style={{ display: update ? "block" : "none" }}>
        <input
          type="text"
          value={makeUpdate.name}
          onChange={(e) =>
            setMakeAbdate({ ...makeUpdate, name: e.target.value })
          }
        />
        <input
          type="text"
          value={makeUpdate.description}
          onChange={(e) =>
            setMakeAbdate({ ...makeUpdate, description: e.target.value })
          }
        />
        <input
          type="date"
          value={makeUpdate.startDate}
          onChange={(e) =>
            setMakeAbdate({ ...makeUpdate, startDate: e.target.value })
          }
        />
        <input
          type="date"
          value={makeUpdate.endDate}
          onChange={(e) =>
            setMakeAbdate({ ...makeUpdate, endDate: e.target.value })
          }
        />
        <input
          type="number"
          value={makeUpdate.employeeId}
          onChange={(e) =>
            setMakeAbdate({ ...makeUpdate, employeeId: Number(e.target.value) })
          }
        />
        <button
          className="save_task"
          onClick={() =>
            updateTask({
              id: task.id,
              name: makeUpdate.name,
              description: makeUpdate.description,
              startDate: makeUpdate.startDate,
              endDate: makeUpdate.endDate,
              employeeId: makeUpdate.employeeId,
            })
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

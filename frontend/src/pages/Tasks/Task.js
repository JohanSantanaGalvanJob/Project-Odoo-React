import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TaskService from "../../services/TaskService";

const Task = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialTaskState = {
    id: null,
    name: "",
    project_id: ""
  };
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const [message, setMessage] = useState("");

  const getTask = id => {
    TaskService.get(id)
      .then(response => {
        setCurrentTask(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTask(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const updateTask = () => {
    TaskService.update(currentTask.id, currentTask)
      .then(response => {
        setMessage("De puta madre");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTask ? (
        <div className="edit-form">
          <h4>Task</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTask.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="project">Proyecto</label>
              <input
                type="text"
                className="form-control"
                id="project"
                name="project"
                value={currentTask.project_id}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTask}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Y la tarea??</p>
        </div>
      )}
    </div>
  );
};

export default Task;

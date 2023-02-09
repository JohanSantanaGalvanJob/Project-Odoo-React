import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TaskService from "../../services/TaskService";

const Task = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTaskState = {
    id: null,
    name: "",
    description: ""
  };
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const [message, setMessage] = useState("");

  const getTask = id => {
    TaskService.get(id)
      .then(response => {
        setCurrentTask({
          id: response.data.result.response.id,
          name: response.data.result.response.name,
          description: (response.data.result.response.description ? response.data.result.response.description.split('>')[1].split('<')[0] : "")
        });
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
          <h4 className="text-center">Task</h4>
          <form className="forms">
            <div className="form-group">
              <label htmlFor="name">Título</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentTask.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={currentTask.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-warning"
                onClick={updateTask}
              >
                Update
              </button>
            </div>
          </form>

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

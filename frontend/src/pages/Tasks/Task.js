import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, } from 'react-router-dom';
import TaskService from "../../services/TaskService";

const Task = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTaskState = {
    id: null,
    name: "",
    user_id: "",
    user: "",
    project_id: "",
    project: "",
    stage_id: "",
    stage: "",
    kanban_state: "",
    kanban_state_label: "",
    description: ""
  };

  const timeOut = useRef(null);
  const [users, setUsers] = useState([]);
  const [stages, setStages] = useState([]);
  const [project, setProject] = useState([]);
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const [message, setMessage] = useState("");

  const getTask = id => {
    TaskService.get(id)
      .then(response => {
        (response.data.result.response.description ? response.data.result.response.description
          = response.data.result.response.description.split('>')[1].split('<')[0] : response.data.result.response.description = "")
        setCurrentTask(response.data.result.response)
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getUsers = () => {
    TaskService.getAllUsers().then(response => {
      setUsers(response.data.result.response)
    })
  }

  const getProjects = () => {
    TaskService.getAllProject().then(response => {
      setProject(response.data.result.response)
    })
  }

  const getStages = () => {
    TaskService.getAllProjectStage().then(response => {
      setStages(response.data.result.response)
    })
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  useEffect(() => {
    getProjects();
    getUsers();
    getStages();
    if (id)
      getTask(id);
  }, [id]);

  const updateTask = () => {
    TaskService.update(currentTask.id, currentTask)
      .then(response => {
        setMessage("The Task was updated successfully!");
        clearTimeout(timeOut.current);
        timeOut.current = setTimeout(() => {
          navigate("/tasks")
        }, 1000);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTask = () => {
    TaskService.remove(currentTask.id)
      .then(response => {
        navigate("/tasks");
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
                required
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
                required
              />
            </div>

            <div>
              <h4><small>Usuarios</small></h4>
              <select className="form-control" name="user_id" type="text" onChange={handleInputChange} required>
                <option value="2" selected>{currentTask.user}</option>
                {users &&
                  users.map((user, index) => (
                    <option value={user.id} key={index}>{user.email}</option>
                  ))
                }
              </select>
            </div>

            <div>
              <h4><small>Proyecto</small></h4>
              <select className="form-control" name="project_id" type="text" onChange={handleInputChange} required>
                <option value={currentTask.project_id} selected>{currentTask.project}</option>
                {project &&
                  project.map((project, index) => (
                    <option value={project.id} key={index}>{project.name}</option>
                  ))
                }
              </select>
            </div>

            <div>
              <h4><small>Estado del proyecto</small></h4>
              <select className="form-control" name="stage_id" type="text" placeholder="descripción" onChange={handleInputChange} required>
                <option value={currentTask.stage_id} selected>{currentTask.stage}</option>
                {stages &&
                  stages.map((stages, index) => (
                    <option value={stages.id} key={index}>{stages.name}</option>
                  ))
                }


              </select>

            </div>
            <div>
              <h4><small>Estado de la tarea</small></h4>
              <select className="form-control" name="kanban_state" type="text" onChange={handleInputChange} required>
                <option value={currentTask.kanban_state} selected>{currentTask.kanban_state_label}</option>
                <option value="unassigned">Unassigned</option>
                <option value="normal">In Progress</option>
                <option value="done">Ready</option>
                <option value="delayed">Delayed</option>
                <option value="blocked" >Blocked</option>
              </select>
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

import React, { useEffect, useState, UseState } from "react";
import TaskService from "../../services/TaskService";
import './AddTask.css';

export default function AddTask() {


    const initialTaskState = {
        id: null,
        name: "",
        user_id: "",
        project_id: "",
        stage_id: "",
        kanban_state: "",
        description: ""
    }

    const [project, setProject] = useState([]);
    const [task, setTask] = useState(initialTaskState);
    const [submitted, setSubmitted] = useState(false);
    const [users, setUsers] = useState([]);
    const [stages, setStages] = useState([]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
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

    const saveTask = () => {
        var data = {
            name: task.name,
            user_id: task.user_id,
            project_id: task.project_id,
            stage_id: task.stage_id,
            kanban_state: task.kanban_state,
            description: task.description
        };
        console.log(data);
        TaskService.create(data)
            .then(response => {
                setTask({
                    name: response.data.name,
                    description: response.data.description,
                    user_id: response.data.user_id,
                    project_id: response.data.project_id,
                    stage_id: response.data.stage_id,
                    kanban_state: response.data.kanban_state,
                    
                });
                setSubmitted(true);
                // console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newTask = () => {
        setTask(initialTaskState);
        setSubmitted(false);
    };

    useEffect(() => {
        getProjects();
        getUsers();
        getStages();
    }, []);


    return (
        <>
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newTask}>
                        Add
                    </button>
                </div>
            ) : (
                <form className="forms">

                    <div>
                        <h4><small>Título</small></h4>
                        <input className="form-control" name="name" type="text" placeholder="Nombre de tarea" onChange={handleInputChange} required value={task.name} />
                    </div>
                    <div>
                        <h4><small>Descripción</small></h4>
                        <textarea value={task.description} className="form-control" name="description" type="text" placeholder="Descripción de la tarea" onChange={handleInputChange} required />
                    </div>

                    <div>
                        <h4><small>Usuarios</small></h4>
                        <select className="form-control" name="user_id" type="text" onChange={handleInputChange} required>
                           <option value="2" selected>...</option> 
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
                        <option value="3" selected>...</option> 
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
                        <option value="11" selected>...</option>
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
                            <option value="normal" selected>...</option>
                            <option value="unassigned">Unassigned</option>
                            <option value="normal">In Progress</option>
                            <option value="done">Ready</option>
                            <option value="delayed">Delayed</option>
                            <option value="blocked" >Blocked</option>
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-success" onClick={saveTask}>Submit</button>
                    </div>
                </form>
            )}

        </>

    );
};
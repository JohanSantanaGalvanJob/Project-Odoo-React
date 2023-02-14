import React, { useEffect, useState, UseState } from "react";
import TaskService from "../../services/TaskService";
import './AddTask.css';

export default function AddTask() {


    const initialTaskState = {
        id: null,
        name: "",
        kanban_state: "",
        stage: null,
        // user:""
    }

    useEffect(() => {
        retrieveTasks();
    }, []);

    const [projectStage,setProjectStage] = useState([]);
    const [Task, setTask] = useState(initialTaskState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTask({ ...Task, [name]: value });
    };

    const retrieveTasks = () => {
        TaskService.getAllProjectStage().then(response => {
            setProjectStage(response.data.result.response);
        }).catch(e => {
            console.log(e);
        })
    };


    const saveTask = () => {
        var data = {
            name: Task.name,
            description: Task.description,
            kanban_state: Task.kanban_state,
            stage: Task.stage,
            // user: Task.user

        };

        if(data.name && data.description) {
            TaskService.create(data).then(response => {
                setTask({
                    title: response.data.title,
                    description: response.data.description,
                    kanban_state: response.data.kanban_state,
                    stage: response.data.stage
                });
                setSubmitted(true);
            }).catch(e => {
                console.log(e);
            });
        }
        
    };

    const newTask = () => {
        setTask(initialTaskState);
        setSubmitted(false);
    };


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
                        <h4><small> Título</small></h4>
                        <input className="form-control" name="name" type="text" placeholder="Nombre de tarea" onChange={handleInputChange} required autoFocus />
                    </div>
                    <div>
                        <h4><small>Descripción</small></h4>
                        <textarea className="form-control" name="description" type="text" placeholder="Descripción de la tarea" onChange={handleInputChange} required />
                    </div>
                    <div>
                        <h4><small>Estado del proyecto</small></h4>
                        <select className="form-control" name="stage" type="text" placeholder="descripción" onChange={handleInputChange} required>
                        {projectStage &&
                            projectStage.map((projectStage, index) => (
                                <option value="Sos">{projectStage.id}</option>
                            ))
                        }
                            

                        </select>

                    </div>
                    <div>
                        <h4><small>Estado de la tarea</small></h4>
                        <select className="form-control" name="kanban_state_label" type="text" onChange={handleInputChange} required>

                            <option value="In Progress">In Progress</option>
                            <option value="Ready">Ready</option>
                            <option value="Blocked">Blocked</option>
                            <option value="Not Assigned" selected>Not Assigned</option>
                            <option value="Delayed">Delayed</option>
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-success" type="submit" onClick={saveTask}>Submit</button>
                    </div>
                </form>
            )}

        </>

    );
};
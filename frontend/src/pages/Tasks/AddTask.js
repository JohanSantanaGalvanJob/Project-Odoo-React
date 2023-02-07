import React, { useState, UseState } from "react";
import TaskService from "../../services/TaskService";
import './AddTask.css';

export default function AddTask() {


    const initialTaskState = {
        id: null,
        name: "",
        project_id: ""
    }
    const [Task, setTask] = useState(initialTaskState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTask({ ...Task, [name]: value });
        console.log(Task);
    };

    const saveTask = () => {
        var data = {
            name: Task.name,
            description: Task.description
        };

        TaskService.create(data).then(response => {
            setTask({
                title: response.data.title,
                description: response.data.description
            });
            setSubmitted(true);
        }).catch(e => {
            console.log(e);
        });
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
                        <label htmlFor="name">Título</label>
                        <input name="name" type="text" placeholder="Nombre de tarea" onChange={handleInputChange} required autoFocus />
                    </div>
                    <div>
                        <label htmlFor="description">Descripción</label>
                        <input name="description" type="text" placeholder="descripción" onChange={handleInputChange} required />
                    </div>
                    <div>
                        <button type="submit" onClick={saveTask}>Submit</button>
                    </div>
                </form>
            )}

        </>

    );
};
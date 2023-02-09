import { useEffect, useState } from "react";
import TaskService from "../../services/TaskService";
import './Tasks.css';

export default function Task() {

    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchProject, setSearchProject] = useState("");

    useEffect(() => {
        retrieveTasks();
    }, []);

    const onChangeSearchProject = e => {
        const searchProject = e.target.value;
        setSearchProject(searchProject);
    }

    const retrieveTasks = () => {
        TaskService.getAll().then(response => {
            setTasks(response.data.result.response);
        }).catch(e => {
            console.log(e);
        })
    };

    const refreshList = () => {
        retrieveTasks();
        setCurrentTask(null);
        setCurrentIndex(-1);
    };

    const setActiveTask = (task, index) => {
        setCurrentTask(task);
        setCurrentIndex(index);
    };

    const findByProject = () => {

        if (searchProject === '') {
            refreshList();
            return;
        }

        TaskService.findByProject(searchProject)
            .then(response => {
                console.log(response)
                setTasks(response.data.result.response);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <>
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by project"
                            value={searchProject}
                            onChange={onChangeSearchProject}
                        />
                        <div className="input-group-append">
                            <button
                                className= {"btn btn-primary" + (searchProject ? "" : " disabled" )} 
                                type="button"
                                onClick={findByProject}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4 className="text-center">Lista de tareas</h4>

                    <ul className="list-group">
                        {tasks &&
                            tasks.map((task, index) => (
                                <li
                                    className={
                                        "list-group-item" + (index === currentIndex ? " active" : "")
                                    }
                                    onClick={() => setActiveTask(task, index)}
                                    key={index}
                                >
                                    {task.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-md-6 ">
                    {currentTask ? (
                        <div>
                            <h4 className="text-center">Task</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentTask.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Proyecto:</strong>
                                </label>{" "}
                                {currentTask.project_id}
                            </div>
                            <div>
                                <label>
                                    <strong>Descripción:</strong>
                                </label>{" "}
                                {currentTask.description ? currentTask.description.split('>')[1].split('<')[0] : "Indeed, you have fallen right into my trap!!"}
                            </div>

                            <div>
                                <label>
                                    <strong>Estado de la tarea:</strong>
                                </label>{" "}
                                {currentTask.kanban_state}
                            </div>

                            <div>
                                <label>
                                    <strong>Usuario:</strong>
                                </label>{" "}
                                {currentTask.user ? currentTask.user : "Que coño?"}
                            </div>

                            <div>
                                <label>
                                    <strong>Estado en el proyecto:</strong>
                                </label>{" "}
                                {currentTask.stage}
                            </div>

                            <a href={"/tasks/" + currentTask.id}
                                className="btn btn-warning"
                            >
                                Edit
                            </a>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Pulsa una tarea anda</p>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
};
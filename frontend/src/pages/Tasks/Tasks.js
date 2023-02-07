import { useEffect, useState } from "react";
import TaskService from "../../services/TaskService";

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
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={findByProject}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Lista de tareas</h4>

                    <ul className="list-group">
                        {tasks &&
                            tasks.map((task, index) => (
                                <li
                                    className={
                                        "list-group-item" + (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => setActiveTask(task, index)}
                                    key={index}
                                >
                                    {task.title}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentTask ? (
                        <div>
                            <h4>Task</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentTask}
                            </div>
                            <div>
                                <label>
                                    <strong>Project:</strong>
                                </label>{" "}
                                {currentTask}
                            </div>

                            <a href={"/app/tasks/" + currentTask.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </a>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a task</p>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
};
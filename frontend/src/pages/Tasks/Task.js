import { useEffect, useState } from "react";
import TaskService from "../../services/TaskService";

export default function Task() {

    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrieveTasks();
    }, []);

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

    return (
        <>
            <ul className="list-group">
                {tasks &&
                    tasks.map((task, index) => {
                        <li
                            className={
                                "list-group-item" + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveTask(task, index)}
                            key={index}
                        >
                            {task.title}
                        </li>
                    })
                }
            </ul>
        </>
    );
};
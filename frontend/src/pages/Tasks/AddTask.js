import React, { useState, UseState } from "react";
import TaskService from "../../services/TaskService";
import './AddTask.css';

export default function AddTask() {


    const initialTaskState = {
        id: null,
        title: "",
        project: "",
        stage: ""
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
            title: Task.title,
            project: Task.project,
            stage: Task.stage
        };

        TaskService.create(data).then(response => {
            setTask({
                title: response.data.title,
                project: response.data.project,
                stage: response.data.stage
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
                        <label htmlFor="title">Título</label>
                        <input name="title" type="text" placeholder="Nombre de tarea" onChange={handleInputChange} required autoFocus />
                    </div>
                    <div>
                        <label htmlFor="project">Proyecto</label>
                        <input name="project" type="text" placeholder="Nombre de proyecto" onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label htmlFor="stage">Estado</label>
                        <input name="stage" type="text" placeholder="Sin iniciar" onChange={handleInputChange} required />
                    </div>
                </form>
            )}

        </>

    );
};

// const AddCompany = () => {

//   return (

//         <div>
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               required
//               value={Company.name}
//               onChange={handleInputChange}
//               name="name"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="description">Description</label>
//             <input
//               type="text"
//               className="form-control"
//               id="description"
//               required
//               value={Company.description}
//               onChange={handleInputChange}
//               name="description"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               required
//               value={Company.email}
//               onChange={handleInputChange}
//               name="email"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="phone">Phone</label>
//             <input
//               type="number"
//               className="form-control"
//               id="phone"
//               required
//               value={Company.phone}
//               onChange={handleInputChange}
//               name="phone"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="address">Address</label>
//             <input
//               type="text"
//               className="form-control"
//               id="address"
//               required
//               value={Company.address}
//               onChange={handleInputChange}
//               name="address"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="income">Income</label>
//             <input
//               type="number"
//               className="form-control"
//               id="income"
//               required
//               value={Company.income}
//               onChange={handleInputChange}
//               name="income"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="bill">Bill</label>
//             <input
//               type="number"
//               className="form-control"
//               id="bill"
//               required
//               value={Company.bill}
//               onChange={handleInputChange}
//               name="bill"
//             />
//           </div>

//           <button onClick={saveCompany} className="btn btn-success">
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddCompany;

import React from "react";
import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle, fetchData, func }) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} fetchData={fetchData} func={func} />
            ))}
        </>
    );
};

export default Tasks;

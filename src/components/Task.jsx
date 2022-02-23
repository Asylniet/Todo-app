import React, { useState, useEffect, useRef } from "react";
import { FcCheckmark } from "react-icons/fc";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoNotificationsOffOutline } from "react-icons/io5";

const Task = ({ task, onDelete, onToggle, fetchData, func }) => {
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    useEffect(() => {
        setText(task.text);
        setDate(task.date);
    }, []);

    const updateTask = async id => {
        const taskToUpdate = await fetchData(id);
        const updatedTask = {
            ...taskToUpdate,
            text: text,
            date: date
        };

        const res = await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        });

        const data = await res.json();

        if (data) {
            return true;
        } else {
            return false;
        }
    };
    return (
        <div className={`task ${task.reminder ? "reminder" : ""} `}>
            <h3>
                <div className="icon" onClick={() => onDelete(task.id)}>
                    <FcCheckmark />
                </div>
                <input
                    type="text"
                    value={text}
                    onBlur={e => {
                        if (e.target.value !== task.text)
                            if (updateTask(task.id)) {
                                func();
                            }
                    }}
                    onChange={e => setText(e.target.value)}
                    className="task-name"
                />
            </h3>
            <div className="flex">
                <div
                    className="icon"
                    onClick={() => {
                        onToggle(task.id) && func();
                    }}
                >
                    {task.reminder ? (
                        <IoNotificationsOffOutline />
                    ) : (
                        <IoNotificationsOutline />
                    )}
                </div>
                <input
                    type="text"
                    value={date}
                    className="task-date"
                    onChange={e => setDate(e.target.value)}
                    onBlur={e => {
                        if (e.target.value !== task.date)
                            if (updateTask(task.id)) {
                                func();
                            }
                    }}
                />
            </div>
        </div>
    );
};

export default Task;

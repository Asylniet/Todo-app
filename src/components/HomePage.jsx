import React, { useEffect, useState, useRef } from "react";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import Notification from "./Notification";

const HomePage = ({ showAddTask }) => {
    const notificationRef = useRef(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };
        getTasks();
    }, []);

    //Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch("http://localhost:8000/tasks");
        const data = await res.json();

        return data;
    };

    //Fetch Task
    const fetchTask = async id => {
        const res = await fetch(`http://localhost:8000/tasks/${id}`);
        const data = await res.json();

        return data;
    };

    //Delete task function
    const deleteTask = async id => {
        await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "DELETE"
        });
        setTasks(tasks.filter(task => task.id !== id));
    };

    //Toggle Reminder
    const toggleReminder = async id => {
        const taskToToggle = await fetchTask(id);
        const updatedTask = {
            ...taskToToggle,
            reminder: !taskToToggle.reminder
        };

        const res = await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        });

        const data = await res.json();
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, reminder: data.reminder } : task
            )
        );
        if(data) {
            return true
        } else {
            return false
        }
    };

    //Add new task
    const addTask = async task => {
        const res = await fetch("http://localhost:8000/tasks", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(task)
        });

        const data = await res.json();
        setTasks([...tasks, data]);

        // const id = Math.floor(Math.random() * 1000) + 1;
        // const newTask = { id, ...task };
        // setTasks([...tasks, newTask]);
    };

    const showNotificationFunc = () => {
        notificationRef.current.show();
    }
    return (
        <>
            <AddTask onAdd={addTask} showAddTask={showAddTask} />
            {tasks.length > 0 ? (
                <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                    fetchData={fetchTask}
                    func={showNotificationFunc}
                />
            ) : (
                <h3>No Tasks</h3>
            )}
            <Notification ref={notificationRef} text="Changes are saved" />
        </>
    );
};

export default HomePage;

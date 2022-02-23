import React, { useState } from "react";
const AddTask = ({ onAdd, showAddTask }) => {
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [reminder, setReminder] = useState(false);

    const onSubmit = e => {
        e.preventDefault();

        if (!text) {
            alert("Pease add task");
            return;
        }

        onAdd({ text, date, reminder });

        setText("");
        setDate("");
        setReminder(false);
    };

    return (
        <form className={`add-form ${showAddTask && "open"}`} onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input
                    type="text"
                    placeholder="Add Task"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Date</label>
                <input
                    type="text"
                    placeholder="Add Date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input
                    type="checkbox"
                    checked={reminder}
                    onChange={e => setReminder(e.currentTarget.checked)}
                />
            </div>
            <input type="submit" value="Save" className="btn btn-block" />
        </form>
    );
};

export default AddTask;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import HomePage from "./components/HomePage";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    document.addEventListener("keydown", function(e) {
        if(e.key === 'q') {
            setShowAddTask(true);
        }
    });
    return (
        <Router>
            <div className="container">
                <Header
                    onAdd={() => setShowAddTask(!showAddTask)}
                    showAddTask={showAddTask}
                />
                <Routes>
                    <Route
                        index
                        element={<HomePage showAddTask={showAddTask} />}
                    />
                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

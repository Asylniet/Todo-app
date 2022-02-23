import React from "react";
import { Link } from "react-router-dom";
const About = () => {
    return (
        <div className="flex column">
            <h4>Version 1.0.0</h4>
            <Link className="link" to="/">Go back</Link>
        </div>
    );
};

export default About;

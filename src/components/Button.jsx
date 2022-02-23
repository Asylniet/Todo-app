import React from "react";
import PropTypes from "prop-types";

const Button = ({ color, text, onClickFunc }) => {
    return (
        <button
            onClick={onClickFunc}
            style={{ backgroundColor: color }}
            className="btn"
        >
            {text}
        </button>
    );
};

Button.defaultProps = {
    text: "Button",
};

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;

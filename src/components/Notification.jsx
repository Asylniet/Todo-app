import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { FcCheckmark } from "react-icons/fc";
const Notification = forwardRef(({ text }, ref) => {
    const [showNotification, setShowNotifcation] = useState(false);

    useImperativeHandle(ref, () => ({
        show() {
            setShowNotifcation(true);
            setTimeout(() => {
                setShowNotifcation(false);
            }, 2000);
        }
    }));
    return (
        <div
            className="notification-wrapper flex"
            id={showNotification ? "show" : "hide"}
        >
            <FcCheckmark className="white-icon" />
            {text}
        </div>
    );
});

Notification.defaultProps = {
    text: "Notification"
};

Notification.propTypes = {
    text: PropTypes.string.isRequired
};

export default Notification;

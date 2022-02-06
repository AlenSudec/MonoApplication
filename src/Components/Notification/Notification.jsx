import "./Notification.css";
import React from "react";

class Notification extends React.Component{
    render(){
        const msg = this.props.msg;
        return(
            <div className="notification">
                <div className="notification__text">
                    <p>{msg}</p>
                </div>
            </div>
        )
    }
}
export default Notification;
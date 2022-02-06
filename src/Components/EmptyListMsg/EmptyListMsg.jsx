import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import React from "react";

class EmptyListMsg extends React.Component {
    render(){
        const msg = this.props.msg;
        return(
            <div className="no-makes">
                <h2>{msg}</h2>
                <FontAwesomeIcon 
                    icon={faCarSide} 
                    className="no-makes__icon"
                />
            </div>
        )
    }
}
export default EmptyListMsg;
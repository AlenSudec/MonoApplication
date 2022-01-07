import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";

const EmptyListMsg = (props) => {
    return (
        <div className="no-makes">
            <h2>{props.msg}</h2>
            <FontAwesomeIcon 
                icon={faCarSide} 
                className="no-makes__icon"
            />
        </div>
    )
}
export default EmptyListMsg;
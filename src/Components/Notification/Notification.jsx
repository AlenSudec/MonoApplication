import "./Notification.css";
const Notification = (props) => {
    return (
    <div className="notification">
        <div className="notification__text">
            <p>{props.msg}</p>
        </div>
    </div>
    )
}
export default Notification;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import ListStore from "../../Stores/ListStore";
import { Link } from "react-router-dom";

const Item = (props) => {
    return (
        <Link
            to={"/editMake/" + props.item.docId}
            className="edit-make"
            onClick={ListStore.hideCreate}
            key={props.item.docId}
        >
            <div className="list__make">
                <div className="make__info">
                    <div className="list__child list__child--firstMake">{props.item.Name}</div>
                    <div className="list__child">{props.item.Abrv}</div>
                    <div className="list__child">{props.item.Country}</div>
                    <div className="list__child">{props.item.Revenue}</div>
                </div>
                
                <div className="list__child list__child--last">
                    <FontAwesomeIcon icon={faAngleDoubleRight}/>
                </div>
            </div>
        </Link>
    )
}
export default Item;
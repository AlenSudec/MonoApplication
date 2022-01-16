import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const ListHeader = (props) => {
    return(
        <div className="list__make list__make--header">
            <div onClick={()=>{ props.store.setSortFilter(props.headers[0])}} className="list__child list__child--first">
                {props.headers[0]}
                <FontAwesomeIcon
                    icon={faArrowDown}
                    className="sort-arrow"
                />
            </div>
            <div onClick={()=>props.store.setSortFilter(props.headers[1])} className="list__child">
                {props.headers[1]}
                <FontAwesomeIcon
                    icon={faArrowDown}
                    className="sort-arrow"
                />
            </div>
            <div onClick={()=>props.store.setSortFilter(props.headers[2])} className="list__child">
                {props.headers[2]}
                <FontAwesomeIcon
                    icon={faArrowDown}
                    className="sort-arrow"
                />
            </div>
            {props.headers[3] ? (
                <div onClick={()=>props.store.setSortFilter(props.headers[3])} className="list__child">
                {props.headers[3] === "Revenue" ? (props.headers[3]+"(.bil)") : (props.headers[3])}
                <FontAwesomeIcon
                    icon={faArrowDown}
                    className="sort-arrow"
                />
            </div>
            ) : ("")}
            
        </div>
    )
}
export default ListHeader;
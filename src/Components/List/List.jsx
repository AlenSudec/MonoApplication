import { observer } from "mobx-react";
import EmptyListMsg from "../EmptyListMsg";
import "./List.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ListHeader from "../ListHeader";
import Notification from "../Notification";

const List = observer((props) => {
    const ItemComponent = props.itemComponent;
    return(
        <>
            {props.store.showNotification ? (<Notification msg={props.notificationMsg}/>) : ("")}
            {props.data.length !== 0 ? (
                <div className="list">
                    <ListHeader 
                        headers={props.headers} 
                        store={props.store}
                    />
                    <div className="list list--fixed-size">
                        {props.data.map(item =>
                            <ItemComponent 
                                item = {item} 
                                key = {item.docId}
                            />
                        )}
                    </div>
                    <div className="list__pagination">
                        <button 
                            disabled={props.store.backButtonState} 
                            className={"list__back " + props.store.backButtonState} 
                            onClick={() => props.store.getMakeAsync(false, true)}
                        >
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                className="back__icon1"
                            />
                            Back
                        </button>
                        <button 
                            disabled={props.store.nextButtonState} 
                            className={"list__forward " + props.store.nextButtonState} 
                            onClick={()=> props.store.getMakeAsync(true,false)}
                        >
                            Forward
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="forward__icon"
                            />
                        </button>
                    </div>
                </div>
            ) : (
                <EmptyListMsg msg={props.msg}/>
            )}
        </>
    )
})
export default List;
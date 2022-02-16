import EmptyListMsg from "../EmptyListMsg";
import React from "react";
import "./List.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ListHeader from "../ListHeader";
import Notification from "../Notification";
import { Observer} from "mobx-react";

class List extends React.Component{
    render(){
        const store = this.props.listStore;
        const ItemComponent = this.props.itemComponent;
        const data = this.props.data;
        const notification = this.props.notificationMsg;
        const msg = this.props.msg;
        const headers = this.props.headers;
        return(
            <>
                <Observer>
                    {() => 
                        store.showNotification ? (<Notification msg={notification}/>) : ("")
                    }
                </Observer>
                <Observer>
                    {() => 
                        data.length !== 0 ? (
                            <div className="list">
                                <ListHeader
                                    headerStore = {store.listHeaderStore} 
                                    headers={headers} 
                                />
                                <div className="list list--fixed-size">
                                    {data.map(item =>
                                        <ItemComponent
                                            itemStore={store.itemStore}
                                            item = {item}
                                            key = {item.docId} 
                                        />
                                    )}
                                </div>
                                <div className="list__pagination">
                                    <button 
                                        disabled={store.backButtonState} 
                                        className={"list__back " + store.backButtonState} 
                                        onClick={() => store.getMakeAsync(false, true)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faArrowLeft}
                                            className="back__icon1"
                                        />
                                        Back
                                    </button>
                                    <button 
                                        disabled={store.nextButtonState} 
                                        className={"list__forward " + store.nextButtonState} 
                                        onClick={()=> store.getMakeAsync(true,false)}
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
                            <EmptyListMsg msg={msg}/>
                        )
                    }
                </Observer>
            </>
        )
    }
}
    
export default List;
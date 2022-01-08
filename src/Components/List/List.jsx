import { observer } from "mobx-react";
import Item from "../../Pages/Make/Components/Item";
import EmptyListMsg from "../EmptyListMsg";
import "./List.css";
import ListStore from "../../Pages/Make/Stores/ListStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const List = observer((props) => {
    return(
        <>
            
            {props.data.length !== 0 ? (
                <div className="list">
                    <div className="list__make list__make--header">
                        {/* posebna komponenta */}
                        <div onClick={()=>{ListStore.setSortFilter("Name");}} className="list__child list__child--first">
                            Ime 
                            <FontAwesomeIcon
                                icon={faArrowDown}
                                className="sort-arrow"
                            />
                        </div>
                        {/* posebna komponenta */}
                        <div onClick={()=>ListStore.setSortFilter("Abrv")} className="list__child">
                            Skraćenica
                            <FontAwesomeIcon
                                icon={faArrowDown}
                                className="sort-arrow"
                            />
                            {/* resi strelice css */}
                        </div>
                    </div>
                    <div className="list list--fixed-size">
                        {props.data.map(item =>
                            <Item item = {item} key={item.docId}/>
                        )}
                    </div>
                    <div className="list__pagination">
                        {/* posebna komponenta */}
                        <button className="list__back" onClick={() => ListStore.getMakeAsync(false, true)}>
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                className="back__icon"
                            />
                            Nazad
                        </button>
                        <button className="list__forward" onClick={()=> ListStore.getMakeAsync(true,false)}>
                            Napred
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
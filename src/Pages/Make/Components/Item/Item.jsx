import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import React from "react";
class Item extends React.Component{
    render(){
        const itemStore = this.props.itemStore;
        const item = this.props.item;
        
        return (
            <Link
            to={"/editMake/" + item.docId}
            className="edit-make"
            onClick={itemStore.hideCreate}
            key={item.docId}
            >
                <div className="list__make">
                    <div className="make__info">
                        <div className="list__child list__child--firstMake">{item.Name}</div>
                        <div className="list__child">{item.Abrv}</div>
                        <div className="list__child">{item.Country}</div>
                        <div className="list__child">{item.Revenue}</div>
                    </div>
                    
                    <div className="list__child list__child--last">
                        <FontAwesomeIcon icon={faAngleDoubleRight}/>
                    </div>
                </div>
            </Link>
        )
    }
}

export default Item;
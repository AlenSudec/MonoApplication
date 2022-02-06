import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import React from "react";
import { inject } from "mobx-react";

class Item extends React.Component{
    render(){
        const ListStore = this.props.listStore;
        const item = this.props.item;
        return(
            <Link
                to={"/models/" + item.docId}
                className="edit-make"
                onClick={ListStore.hideCreate}
                key={item.docId}
            >
                <div className="list__make">
                    <div className="make__info">
                        <div className="list__child list__child--first">{item.Name}</div>
                        <div className="list__child">{item.Abrv}</div>
                        <div className="list__child">{item.MakeName}</div>
                        <div className="list__child">{item.Year}</div>
                    </div>
                    <div className="list__child list__child--last">
                        <FontAwesomeIcon icon={faAngleDoubleRight}/>
                    </div>
                </div>
            </Link>
        )
    }
}

export default inject("listStore")(Item);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { inject } from "mobx-react";

class ListHeader extends React.Component {
    render(){
        const store = this.props.listStore;
        const headers = this.props.headers;
        return(
            <div className="list__make list__make--header">
                <div onClick={()=> store.setSortFilter(headers[0])} className="list__child list__child--first">
                    {headers[0]}
                    <FontAwesomeIcon
                        icon={faArrowDown}
                        className="sort-arrow"
                    />
                </div>
                <div onClick={()=> store.setSortFilter(headers[1])} className="list__child">
                    {headers[1]}
                    <FontAwesomeIcon
                        icon={faArrowDown}
                        className="sort-arrow"
                    />
                </div>
                <div onClick={()=> store.setSortFilter(headers[2])} className="list__child">
                    {headers[2]}
                    <FontAwesomeIcon
                        icon={faArrowDown}
                        className="sort-arrow"
                    />
                </div>
                {headers[3] ? (
                    <div onClick={()=> store.setSortFilter(headers[3])} className="list__child">
                    {headers[3] === "Revenue" ? (headers[3]+"(.bil)") : (headers[3])}
                    <FontAwesomeIcon
                        icon={faArrowDown}
                        className="sort-arrow"
                    />
                </div>
                ) : ("")}
                
            </div>
        )
    }
}

export default inject("listStore")(ListHeader);
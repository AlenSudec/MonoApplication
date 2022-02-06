import ListStore from "../../Stores/ListStore"
import Create from "../Create";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { inject, observer, Provider } from "mobx-react";
import List from "../../../../Components/List";
import Filter from "../Filter/Filter";
import Item from "../Item";


class MakeHome extends React.Component{
    render(){
        const listStore = this.props.listStore;
        return(
            <div className="container">
            <div className="header">
                <h1 className="header__title">Make List</h1>
                <div className="header__create">
                    <button 
                        onClick={listStore.handleClick} 
                        className="create__btn" 
                    >
                        <FontAwesomeIcon 
                            icon={faPlusCircle} 
                            className="create__plus"
                        />
                        Add make         
                    </button>
                    {listStore.getMakeStoreShowCreate() ? (
                        <Provider listStore = {listStore}>
                            <Create/>
                        </Provider>
                    ) : ("")}
                </div>
            </div>
            <Provider listStore={listStore}>
                <Filter/>
            </Provider>
            <Provider listStore={listStore}>
                <List 
                    data={listStore.getMakeStoreData()}
                    msg="No car makes found, add them by using top-right button 'Add make'"
                    headers={["Name","Abrv","Country","Revenue"]}
                    itemComponent = {Item}
                    notificationMsg="New vehicle make has been added"
                />
            </Provider>
            
        </div>
        );
    }
}
export default inject((provider) => ({
    listStore: new ListStore(provider),
}))(observer(MakeHome));

    
       
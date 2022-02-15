import {inject, observer} from "mobx-react";
import ListStore from "../../Stores/ListStore";
import List from "../../../../Components/List";
import Item from "../Item";
import Filter from "../Filter";
import React from "react";

class ModelHome extends React.Component{
    render(){
        const listStore = this.props.listStore;
        return(
            <div className="container">
                <div className="header">
                    <h1 className="header__title">Model list</h1>
                </div>
                    <Filter
                        listStore = {listStore}
                    />
                    <List
                        data={listStore.getModelStoreData()}
                        msg="No car models found, add them inside 'Make list'"
                        headers={["Name", "Abrv","MakeName", "Year"]}
                        listStore = {listStore}
                        itemComponent = {Item}
                    />
            </div>
        )
    }
}

export default inject((provider) => ({
    listStore: new ListStore(provider),
}))(observer(ModelHome));
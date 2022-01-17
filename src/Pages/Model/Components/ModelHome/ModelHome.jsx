import {observer } from "mobx-react";
import ListStore from "../../Stores/ListStore";
import List from "../../../../Components/List";
import ModelStore from "../../Stores/ModelStore";
import Item from "../Item";
import Filter from "../Filter";
const ModelHome = observer(() => {
    return (
        <div className="container">
            <div className="header">
                <h1 className="header__title">Model list</h1>
            </div>
            <Filter/>
            <List
                data={ModelStore.data}
                msg="No car models found, add them inside 'Make list'"
                headers={["Name", "Abrv","MakeName", "Year"]}
                store = {ListStore}
                itemComponent = {Item}
            />
        </div>
    )
})
export default ModelHome;
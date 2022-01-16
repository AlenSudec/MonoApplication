import ListStore from "../../Stores/ListStore"
import Create from "../Create";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import MakeStore from "../../Stores/MakeStore";
import { observer } from "mobx-react";
import List from "../../../../Components/List";
import Filter from "../Filter/Filter";
import Item from "../Item";


const MakeHome = observer(() => {
    return(
        <div className="container">
            <div className="header">
                <h1 className="header__title">Make List</h1>
                <div className="header__create">
                    <button 
                        onClick={ListStore.handleClick} 
                        className="create__btn" 
                    >
                        <FontAwesomeIcon 
                            icon={faPlusCircle} 
                            className="create__plus"
                        />
                        Add make         
                    </button>
                    {MakeStore.showCreate ? (<Create />) : ("")}
                </div>
            </div>
            <Filter/>
            <List 
                data={MakeStore.data} 
                msg="No car makes found, add them by using top-right button 'Add make'"
                headers={["Name","Abrv","Country","Revenue"]}
                store = {ListStore}
                itemComponent = {Item}
            />
        </div>
        )
    })
export default MakeHome;

       
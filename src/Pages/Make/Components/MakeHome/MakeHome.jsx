import ListStore from "../../Stores/ListStore"
import Store from "../../../../Common/Stores/Store";
import Create from "../Create";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import MakeStore from "../../Stores/MakeStore";
import { observer } from "mobx-react";
import List from "../../../../Components/List";

const MakeHome = observer(() => {
    return(
        <div className="container">
            <div className="header">
                <h1 className="header__title">Lista proizvođača</h1>
                    <div className="header__create">
                        <button 
                            onClick={ListStore.handleClick} 
                            className="create__btn" 
                        >
                            <FontAwesomeIcon 
                                icon={faPlusCircle} 
                                className="create__plus"
                            />
                            Dodaj proizvođača         
                        </button>
                        {Store.showCreate ? (<Create />) : ("")}
                    </div>
            </div>
            <List data={MakeStore.data} msg="Nemate unesenih proizvođača vozila, dodajte ih pritiskom na gumb Dodaj proizvođača"/>
        </div>
        )
    })
export default MakeHome;

       
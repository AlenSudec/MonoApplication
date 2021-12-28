import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import Create from "../Create";
import Store from "../../Common/Stores/Store";
import MakeStore from "../../Common/Stores/MakeStore";
import "./List.css";

const List = observer(() => {
    const handleClick = () => {
        Store.setShowCreate();
    }

    const hideCreate = () => {
        if(Store.showCreate){
            Store.setShowCreate();
        }
    }

    return(
        <>
            <div className="container">
                <div className="header">
                    <h1 className="header__title">Lista proizvođača</h1>
                    <div className="header__create">
                        <button 
                            onClick={handleClick} 
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
                {Store.emptyList === false ? (

                    <div className="list">
                    <div className="list__make list__make--header">
                        <div className="list__child list__child--first">Ime</div>
                        <div className="list__child">Skraćenica</div>
                    </div>
                    {MakeStore.data.map(make =>
                        <Link 
                            to="/editMake" 
                            className="edit-make" 
                            onClick={hideCreate} 
                            state = {{
                                docId: make.docId,
                                Name: make.Name,
                                Abrv: make.Abrv
                            }}
                            key={make.docId}
                        >
                            <div className="list__make">
                                <div className="list__child list__child--first">{make.Name}</div>
                                <div className="list__child">{make.Abrv}</div>
                                <div className="list__child list__child--last">
                                    <FontAwesomeIcon icon={faAngleDoubleRight}/>
                                </div>
                            </div>
                        </Link> 
                    )}
                </div>

                ) : (
                    <div className="no-makes">
                        <h2>Nemate unesenih proizvođača vozila, dodajte ih pritiskom na gumb "Dodaj proizvođača"</h2>
                        <FontAwesomeIcon 
                                icon={faCarSide} 
                                className="no-makes__icon"
                            />
                    </div>
                    
                )}
                
            </div>
        </>
    )
})
export default List;
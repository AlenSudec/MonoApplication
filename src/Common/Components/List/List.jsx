import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./List.css";
import Create from "../Create";
import Store from "../../Stores/Store";
import MakeStore from "../../Stores/MakeStore";





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
                        <button onClick={handleClick} className="create__btn" >
                            <FontAwesomeIcon icon={faPlusCircle} className="create__plus"/>
                            Dodaj proizvođača
                            </button>
                        {Store.showCreate ? (<Create/>) : ("")}
                    </div>
                    
                </div>
                
                
                        <div className="list">
                        <div className="list__make list__make--header">
                            {/* <div>ID</div> */}
                            <div className="list__child list__child--first">Ime</div>
                            <div className="list__child">Skraćenica</div>
                        </div>
                        
                        {MakeStore.data.map(make =>
                            <Link to="/editMake" className="editMake" onClick={hideCreate} state={{
                                docId: make.docId,
                                Name: make.Name,
                                Abrv: make.Abrv
                            }}>
                                <div className="list__make">
                                    {console.log(MakeStore.data.length)}
                                    {/* <div>{make.docId}</div> */}
                                    <div className="list__child list__child--first">{make.Name}</div>
                                    <div className="list__child">{make.Abrv}</div>
                                    <div className="list__child list__child--last">
                                        <FontAwesomeIcon icon={faAngleDoubleRight}/>
                                    </div>
                                
                                    {/* Uredi
                                    Obriši */}
                                </div>
                            </Link>
                            
                        )}
                        </div>
                        {/* {setTimeout(() => (
                            MakeStore.data.length === 0 ? ( <h1>Unesite proizvođače pritiskom na gumb u kutu</h1>) : (<></>)
                            ), 500)} */}
            </div>
        </>
    )
})
export default List;
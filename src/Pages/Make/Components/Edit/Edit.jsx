import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import EditStore from "../../Stores/EditStore";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import "./Edit.css";
import Store from "../../../../Common/Stores/Store";


const Edit = observer(() => {
    //find a way to use inside store
    const navigate = useNavigate();
    let { id } = useParams();
    if(Store.runOnce === false){
        EditStore.getMakeByIdAsync(id);
        Store.setRunOnce();
    }  
    return (
        <div className="edit-container">
            <div className="edit__header">
                <div className="header__title">
                    <button 
                        className="header__back" 
                        onClick={()=>{EditStore.handleBack(); navigate("/")}}
                    >
                        <FontAwesomeIcon 
                            icon={faAngleDoubleLeft} 
                            className="back__icon" 
                        />
                    </button>
                    <h1>Uredi</h1>
                </div>
                
                <div className="header__id">
                    <div>ID proizvođača: {EditStore.currData.docId}</div>
                    <button 
                        className="delete-btn" 
                        onClick={() => { EditStore.deleteMake(); navigate("/"); }}
                    >
                        <FontAwesomeIcon 
                            icon={faTrash} 
                            className="delete-btn__trash" 
                        />
                    </button>
                </div>
            </div>
                <form 
                    className="edit__form" 
                    onSubmit={(e) => { EditStore.handleUpdate(e); navigate("/");}}
                >
                    <div className="form__child">
                        <label className="form__label">Ime:</label>
                        <input
                            required
                            key={EditStore.currData.Name}
                            name="Name"
                            className="form__input"
                            defaultValue={EditStore.currData.Name}
                        />
                    </div>
                    <div className="form__child">
                        <label className="form__label">Skraćenica:</label>
                        <input
                            required
                            key={EditStore.currData.Abrv}
                            name="Abrv"
                            className="form__input"
                            defaultValue={EditStore.currData.Abrv}
                            
                        />
                    </div>
                    <button 
                        className="form__btn" 
                        type="submit"
                    >
                        Spremi promjene
                    </button>
                </form>
        </div>
    )
})

export default Edit;
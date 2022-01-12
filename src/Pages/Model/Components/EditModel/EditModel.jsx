import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import EditStore from "../../Stores/EditStore";
import ModelStore from "../../Stores/ModelStore";

const EditModel = observer(() => {
    const navigate = useNavigate();
    let { id } = useParams();
    if(ModelStore.runOnce === false){
        EditStore.getByIdAsync(id);
        ModelStore.setRunOnce();
    }
    return(
        <div className="edit-container">
        <div className="edit__header">
            <div className="header__title">
                <button 
                    className="header__back" 
                    onClick={()=>{EditStore.handleBack(); navigate("/models")}}
                >
                    <FontAwesomeIcon 
                        icon={faAngleDoubleLeft} 
                        className="back__icon" 
                    />
                </button>
                <h1>Edit</h1>
            </div>
            
            <div className="header__id">
                <div>Model ID: {EditStore.currData.docId}</div>
                <button 
                    className="delete-btn" 
                    onClick={() => { EditStore.deleteMake(); navigate("/models"); }}
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
                onSubmit={(e) => { EditStore.handleUpdate(e); navigate("/models");}}
            >
                <div className="form__child">
                    <label className="form__label">Name:</label>
                    <input
                        required
                        key={EditStore.currData.Name}
                        name="Name"
                        className="form__input"
                        defaultValue={EditStore.currData.Name}
                    />
                </div>
                <div className="form__child">
                    <label className="form__label">Year:</label>
                    <input
                        required
                        key={EditStore.currData.Year}
                        name="Year"
                        className="form__input"
                        defaultValue={EditStore.currData.Year}
                    />
                </div>
                <div className="form__child">
                    <label className="form__label">Make Abrv:</label>
                    <input
                        required
                        key={EditStore.currData.Abrv}
                        name="Abrv"
                        className="form__input"
                        defaultValue={EditStore.currData.Abrv}
                        
                    />
                </div>
                <div className="form__child">
                    <label className="form__label">Make Id:</label>
                    <input
                        required
                        key={EditStore.currData.MakeId}
                        name="MakeId"
                        className="form__input"
                        defaultValue={EditStore.currData.MakeId}
                        
                    />
                </div>
                <button 
                    className="form__btn" 
                    type="submit"
                >
                    Save changes
                </button>
            </form>
    </div>        
    )
})

export default EditModel;
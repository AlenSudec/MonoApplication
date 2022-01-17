import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import EditStore from "../../Stores/EditStore";
import ModelStore from "../../Stores/ModelStore";
import Confirmation from "../Confirmation";

const EditModel = observer(() => {
    const navigate = useNavigate();
    let { id } = useParams();
    if(ModelStore.runOnce === false){
        EditStore.getByIdAsync(id);
        EditStore.getAllMakesAsync();
        ModelStore.setRunOnce();
    }
    return(
        <div className="edit-container">
            {EditStore.showConf ? (<Confirmation/>) : ("")}
            
        <div className="edit__header">
            <div className="header__title">
                <button 
                    className="header__back" 
                    onClick={()=>{ 
                        EditStore.handleBack(); 
                        navigate("/models")
                    }}
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
                    onClick={() => { EditStore.setShowConf() }}
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
                onSubmit={(e) => { 
                    EditStore.handleUpdate(e); 
                    navigate("/models");
                }}
            >
                <div className="form__child">
                    <label className="form__label">Name:</label>
                    <input
                        type="text"
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
                        type="number"
                        className="form__input"
                        defaultValue={EditStore.currData.Year}
                    />
                </div>
                <div className="form__child">
                    <label className="form__label form__label--select1">Make: </label>
                    <select 
                        value={EditStore.selectValue} 
                        onChange={EditStore.handleOnChange} 
                        name="MakeId"
                    >
                        {EditStore.allMakes.map(make => 
                            <option value={[
                                    make.docId,
                                    make.Abrv,
                                    make.Name
                                ]} 
                                key={make.docId}
                            >
                                {make.Name}
                            </option>
                        )}
                    </select>
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
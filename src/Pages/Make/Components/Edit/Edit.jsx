import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import EditStore from "../../Stores/EditStore";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash, faAngleDoubleLeft  } from "@fortawesome/free-solid-svg-icons";
import "./Edit.css";
import CreateModel from "../../../Model/Components/CreateModel";
import Confirmation from "../Confirmation/Confirmation";
import Notification from "../../../../Components/Notification";


const Edit = observer(() => {
    const navigate = useNavigate();
    let { id } = useParams();
    if(EditStore.getRunOnce() === false){
        EditStore.getMakeByIdAsync(id);
        EditStore.setRunOnce();
        EditStore.checkModels(id);
    }
    const countries = ["Germany","France","Italy","England"];

    return (
        <div className="edit-container">
            {EditStore.showConf ? (<Confirmation/>) : ("")}
            {EditStore.showNotification ? (<Notification msg="New vehicle model has been added"/>) : ("")}
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
                    <h1>Edit</h1>
                    <button
                        onClick={EditStore.handleClick}
                        className="create__btn btn--left"
                    >
                        <FontAwesomeIcon
                            icon={faPlusCircle}
                            className="create__plus"
                        />
                        Add model

                    </button>
                    {EditStore.showCreate ? (
                        <CreateModel 
                            store = {EditStore} 
                            data = {{
                                id : EditStore.currData.docId, 
                                Abrv : EditStore.currData.Abrv, 
                                Name : EditStore.currData.Name
                            }}
                        />
                    ) : ("")}
                    
                </div>
                
                <div className="header__id">
                    <div>Make Id: {EditStore.currData.docId}</div>
                    <button 
                        className="delete-btn" 
                        onClick = {() => { EditStore.setShowConf();}}
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
                        navigate("/");
                    }}
                >
                    <div className="form__child">
                        <label className="form__label">Name:</label>
                        <input
                            required
                            key={EditStore.currData.Name}
                            name="Name"
                            type="text"
                            className="form__input"
                            defaultValue={EditStore.currData.Name}
                        />
                    </div>
                    <div className="form__child">
                        <label className="form__label">Abrv:</label>
                        <input
                            required
                            key={EditStore.currData.Abrv}
                            name="Abrv"
                            type="text"
                            className="form__input"
                            defaultValue={EditStore.currData.Abrv}
                            
                        />
                    </div>
                    <div className="form__child">
                        <label className="form__label form__label--select">Country:</label>
                        <select 
                            value={EditStore.country} 
                            required 
                            name="Country"
                            className="form__input--select"
                            onChange={EditStore.handleSelectChange}
                        >
                            {countries.map(country => 
                                <option key={country} value={country}>{country}</option>
                            )}
                        </select>  
                    </div>
                    <div className="form__child">
                        <label className="form__label">Revenue(.bil):</label>
                        <input
                            required
                            key={EditStore.currData.Revenue}
                            type="number"
                            name="Revenue"
                            className="form__input"
                            defaultValue={EditStore.currData.Revenue}
                            
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

export default Edit;
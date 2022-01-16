import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import EditStore from "../../Stores/EditStore";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import "./Edit.css";
import CreateModel from "../../../Model/Components/CreateModel";
import MakeStore from "../../Stores/MakeStore";
import Confirmation from "../Confirmation/Confirmation";


const Edit = observer(() => {
    const navigate = useNavigate();
    let { id } = useParams();
    if(MakeStore.runOnce === false){
        EditStore.getMakeByIdAsync(id);
        MakeStore.setRunOnce();
        EditStore.checkModels(id);
    }
    const countries = ["None","Germany","France","Italy","England"];

    return (
        <div className="edit-container">
            {EditStore.showConf ? (<Confirmation/>) : ("")}
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
                    onSubmit={(e) => { EditStore.handleUpdate(e); navigate("/");}}
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
                    {/* <div className="form__child">
                        <label className="form__label">Country:</label>
                        <input
                            required
                            key={EditStore.currData.Country}
                            name="Country"
                            type="text"
                            className="form__input"
                            defaultValue={EditStore.currData.Country}
                            
                        />
                    </div> */}
                    <div className="form__child">
                        <label className="form__label form__label--select">Country:</label>  
                        <select 
                            defaultValue={EditStore.currData.Country} 
                            required 
                            name="Country"
                            className="form__input--select"
                        >
                            {countries.map(country => 
                                <option key={country} value={country}>{country}</option>
                            )}
                        </select>  
                    </div>
                    <div className="form__child">
                        <label className="form__label">Revenue:</label>
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
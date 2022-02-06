import React from "react";
import { inject, observer } from "mobx-react";
import EditStore from "../../Stores/EditStore";
import { withRouter } from "../../../../Common/hooks/withRouter";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash, faAngleDoubleLeft  } from "@fortawesome/free-solid-svg-icons";
import "./Edit.css";
import CreateModel from "../../../Model/Components/CreateModel";
import Confirmation from "../Confirmation/Confirmation";
import Notification from "../../../../Components/Notification";
import { Provider } from "mobx-react";

class Edit extends React.Component{
    render(){
        const editStore = this.props.editStore;
        const countries = ["Germany","France","Italy","England"];
        return(
            <div className="edit-container">
                {editStore.showConf ? (
                    <Provider editStore={editStore}>
                        <Confirmation/>
                    </Provider>
                ) : ("")}
                {editStore.showNotification ? (<Notification msg="New vehicle model has been added"/>) : ("")}
                <div className="edit__header">
                    <div className="header__title">

                            <button 
                                className="header__back" 
                                onClick={() => {
                                    this.props.navigate("/");
                                }}
                            >
                                <FontAwesomeIcon 
                                    icon={faAngleDoubleLeft} 
                                    className="back__icon" 
                                />
                            </button>

                        
                        <h1>Edit</h1>
                        <button
                            onClick={editStore.handleClick}
                            className="create__btn btn--left"
                        >
                            <FontAwesomeIcon
                                icon={faPlusCircle}
                                className="create__plus"
                            />
                            Add model

                        </button>
                        {editStore.showCreate ? (
                            <Provider editStore={editStore}>
                                <CreateModel 
                                    data = {{
                                        id : editStore.currData.docId, 
                                        Abrv : editStore.currData.Abrv, 
                                        Name : editStore.currData.Name
                                    }}
                                />
                            </Provider>
                            
                        ) : ("")}
                        
                    </div>
                    
                    <div className="header__id">
                        <div>Make Id: {editStore.currData.docId}</div>
                        <button 
                            className="delete-btn" 
                            onClick = {() => { editStore.setShowConf(true);}}
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
                            editStore.handleUpdate(e);
                            this.props.navigate("/");
                        }}
                    >
                        <div className="form__child">
                            <label className="form__label">Name:</label>
                            <input
                                required
                                key={editStore.currData.Name}
                                name="Name"
                                type="text"
                                className="form__input"
                                defaultValue={editStore.currData.Name}
                            />
                        </div>
                        <div className="form__child">
                            <label className="form__label">Abrv:</label>
                            <input
                                required
                                key={editStore.currData.Abrv}
                                name="Abrv"
                                type="text"
                                className="form__input"
                                defaultValue={editStore.currData.Abrv}
                                
                            />
                        </div>
                        <div className="form__child">
                            <label className="form__label form__label--select">Country:</label>
                            <select 
                                value={editStore.country} 
                                required 
                                name="Country"
                                className="form__input--select"
                                onChange={editStore.handleSelectChange}
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
                                key={editStore.currData.Revenue}
                                type="number"
                                name="Revenue"
                                className="form__input"
                                defaultValue={editStore.currData.Revenue}
                                
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
    //
    }
}

export default inject((provider) => ({
    editStore: new EditStore(provider),
}))(withRouter(observer(Edit)));

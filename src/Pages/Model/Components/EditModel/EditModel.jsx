import { inject, observer} from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import EditStore from "../../Stores/EditStore";
import Confirmation from "../Confirmation";
import { withRouter } from "../../../../Common/hooks/withRouter";
import React from "react";


class EditModel extends React.Component {
    render(){
        const editStore = this.props.editStore
        return(
            <div className="edit-container">
                {editStore.showConf ? (
                    <Confirmation
                        editStore = {editStore}
                        confStore = {editStore.confStore}
                    />
                ) : ("")}
                <div className="edit__header">
                    <div className="header__title">
                        <button 
                            className="header__back" 
                            onClick={()=>{ 
                                editStore.handleBack(); 
                                this.props.navigate("/models")
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
                        <div>Model ID: {editStore.currData.docId}</div>
                        <button 
                            className="delete-btn" 
                            onClick={() => { editStore.setShowConf() }}
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
                            this.props.navigate("/models");
                        }}
                    >
                        <div className="form__child">
                            <label className="form__label">Name:</label>
                            <input
                                type="text"
                                required
                                key={editStore.currData.Name}
                                name="Name"
                                className="form__input"
                                defaultValue={editStore.currData.Name}
                            />
                        </div>
                        <div className="form__child">
                            <label className="form__label">Year:</label>
                            <input
                                required
                                key={editStore.currData.Year}
                                name="Year"
                                type="number"
                                className="form__input"
                                defaultValue={editStore.currData.Year}
                            />
                        </div>
                        <div className="form__child">
                            <label className="form__label form__label--select1">Make: </label>
                            <select 
                                value={editStore.selectValue} 
                                onChange={editStore.handleOnChange} 
                                name="MakeId"
                            >
                                {editStore.allMakes.map(make => 
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
    }
}

export default inject((provider) => ({
    editStore: new EditStore(provider),
}))(withRouter(observer(EditModel)));
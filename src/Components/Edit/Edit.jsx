import { useLocation } from "react-router-dom";
import MakeStore from "../../Common/Stores/MakeStore";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import "./Edit.css";

const Edit = () => {
    const location = useLocation();
    let currentData = location.state;
    const navigate = useNavigate();
    let data = {
        docId : null,
        Name: "",
        Abrv: "",
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        data = {
            docId: currentData.docId,
            Name: e.target.Name.value,
            Abrv: e.target.Abrv.value,
        }
        MakeStore.updateMakeAsync(data);
        navigate("/");
        
    }
    const deleteMake = (id) => {
        MakeStore.deleteMakeAsync(id);
        navigate("/");
    }
    const handleBack = () => {
        navigate("/");
    }
    return (
        <div className="edit-container">
            <div className="edit__header">
                <div className="header__title">
                    <button 
                        className="header__back" 
                        onClick={handleBack}
                    >
                        <FontAwesomeIcon 
                            icon={faAngleDoubleLeft} 
                            className="back__icon" 
                        />
                    </button>
                    <h1>Uredi</h1>
                </div>
                
                <div className="header__id">
                    <div>ID proizvođača: {currentData.docId}</div>
                    <button 
                        className="delete-btn" 
                        onClick={() => { deleteMake(currentData.docId) }}
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
                    onSubmit={handleUpdate}
                >
                    <div className="form__child">
                        <label className="form__label">Ime:</label>
                        <input
                            required
                            name="Name"
                            className="form__input"
                            defaultValue={currentData.Name}
                        />
                    </div>
                    <div className="form__child">
                        <label className="form__label">Skraćenica:</label>
                        <input
                            required
                            name="Abrv"
                            className="form__input"
                            defaultValue={currentData.Abrv}
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
}
export default Edit;
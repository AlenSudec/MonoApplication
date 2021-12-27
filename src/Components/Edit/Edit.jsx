import { useLocation } from "react-router-dom";
import MakeStore from "../../Stores/MakeStore";
import { useNavigate } from "react-router-dom";
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
    return (
        
        <div className="edit-container">
            <div className="edit__header">
                <h1>Uredi</h1>
                <div>ID proizvođača: {currentData.docId}</div>
            </div>
            
                <form className="edit__form" onSubmit={handleUpdate}>
                    <div className="form__child">
                        <label className="form__label">Ime:</label>
                        <input
                            required
                            name="Name"
                            className="form__input"
                            defaultValue={currentData.Name}
                            
                            
                        ></input>
                    </div>
                    <div className="form__child">
                        <label className="form__label">Skraćenica:</label>
                        <input
                            required
                            name="Abrv"
                            className="form__input"
                            defaultValue={currentData.Abrv}
                            
                        ></input>
                    </div>
                    <button className="form__btn"type="submit">Spremi promjene</button>
                    
                </form>
            
            
                <button className="delete-btn" onClick={()=>{deleteMake(currentData.docId)}}>Obriši proizvođača</button>
            
        </div>
        
    )
}
export default Edit;
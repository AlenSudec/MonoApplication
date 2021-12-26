import { useLocation } from "react-router-dom";
import MakeStore from "../../Stores/MakeStore";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./Edit.css";
const Edit = () => {
    const location = useLocation();
    const currentData = location.state;
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
        
    }
    const deleteMake = (id) => {
        MakeStore.deleteMakeAsync(id);
        
    }
    return (
        
        <div className="edit-container">
            <div className="edit__header">
                <h1>Uredi</h1>
                <div>ID trenutnog dokumenta: {currentData.docId}</div>
            </div>
            
                <form className="edit__form" onSubmit={handleUpdate}>
                    <div className="form__child">
                        <label className="form__label">Ime:</label>
                        <input
                            required
                            name="Name"
                            placeholder={currentData.Name}
                            className="form__input"
                        ></input>
                    </div>
                    <div className="form__child">
                        <label className="form__label">Skraćenica:</label>
                        <input
                            required
                            name="Abrv"
                            placeholder={currentData.Abrv}
                            className="form__input"
                        ></input>
                    </div>
                    <button className="form__btn"type="submit">Spremi</button>
                    
                </form>
            
            
                <button className="delete-btn" onClick={()=>{deleteMake(currentData.docId)}}>Obriši proizvođača</button>
            
        </div>
        
    )
}
export default Edit;
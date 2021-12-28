import { observer } from "mobx-react";
import MakeStore from "../../Common/Stores/MakeStore";
import Store from "../../Common/Stores/Store";
import "./Create.css";

const Create = observer(() => {
    let data = {
        Name: "",
        Abrv: "",
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        data = {
            docId: "",
            Name: e.target.makeName.value,
            Abrv: e.target.makeAbrv.value
        }
        Store.setShowCreate();
        MakeStore.createMakeAsync(data);
    }

    const handleClickOutside = () => {
        Store.setShowCreate();
    }

    return (
        <>
        <div 
            className="create-filler" 
            onClick={handleClickOutside}
        ></div>
        <div className="create-container">
            <div className="create-arrow"></div>
            <form 
                className="create-form" 
                onSubmit={handleSubmit}
            >
                <div className="create-info">
                    <label className="create-label">Ime:</label>
                    <input
                        type="text"
                        required
                        name="makeName"
                        className="create-input"
                    />
                </div>
                <div className="create-info">
                    <label className="create-label">Skraćenica:</label>
                    <input
                        type="text"
                        required
                        name="makeAbrv"
                        className="create-input"
                    />
                </div>
                <div>
                    <button className="create-btn" type="submit">Dodaj</button>
                </div>
            </form>
        </div>
        </>
    )
})
export default Create;
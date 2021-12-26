import { observer } from "mobx-react";
import MakeStore from "../../Stores/MakeStore";
import Store from "../../Stores/Store";
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
        console.log("submitted");
        Store.setShowCreate();
        MakeStore.createMakeAsync(data);

    }

    return(
        
        
        <div className="create-container">
            <div className="create-arrow"></div>
            <form className="create-form" onSubmit={handleSubmit}>
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
                    <label className="create-label">Abrv:</label>
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
        
    )
})
export default Create;
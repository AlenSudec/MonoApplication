import { observer } from "mobx-react";
import ListStore from "../../../Make/Stores/ListStore";
import "./Create.css";

const Create = observer(() => {
    return (
        <>
        <div 
            className="create-filler" 
            onClick={ListStore.handleClickOutside}
        ></div>
        <div className="create-container">
            <div className="create-arrow"></div>
            <form 
                className="create-form" 
                onSubmit={ListStore.handleSubmit}
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
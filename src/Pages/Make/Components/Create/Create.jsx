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
                    <label className="create-label">Name:</label>
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
                <div className="create-info">
                    <label className="create-label">Country:</label>
                    <input
                        type="text"
                        required
                        name="makeCountry"
                        className="create-input"
                    />
                </div>
                <div className="create-info">
                    <label className="create-label">Revenue:</label>
                    <input
                        type="number"
                        required
                        name="makeRevenue"
                        className="create-input"
                    />
                </div>
                <div>
                    <button className="create-btn" type="submit">Add</button>
                </div>
            </form>
        </div>
        </>
    )
})
export default Create;
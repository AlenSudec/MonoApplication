import { observer } from "mobx-react";
import ListStore from "../../../Make/Stores/ListStore";
import "./Create.css";

const Create = observer(() => {
    const countries = ["Germany","France","Italy","England"];
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
                    <select
                        required
                        name="makeCountry"
                    >
                        {countries.map((country) => 
                            <option key={country} value={country}>{country}</option>
                        )}
                        
                    </select>
                </div>
                <div className="create-info">
                    <label className="create-label">Revenue(.bil):</label>
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
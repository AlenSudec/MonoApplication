import { observer } from "mobx-react";
import ListStore from "../../Stores/ListStore";

const CreateModel = observer((props) => {
    const years = [
        "None", 
        2010, 
        2011, 
        2012, 
        2013, 
        2014, 
        2015, 
        2016, 
        2017, 
        2018, 
        2019, 
        2020
    ];

    return(
        <>
        <div
            className="create-filler"
            onClick={props.store.handleClickOutside}
        ></div>
        <div className="create-container container--right">
            <div className="create-arrow"></div>
            <form 
                className="create-form" 
                onSubmit={(e) => { 
                    ListStore.handleSubmit(e,props.data); 
                    props.store.handleClickOutside() 
                }}
            >
                <div className="create-info">
                    <label className="create-label">Name:</label>
                    <input
                        type="text"
                        required
                        name="modelName"
                        className="create-input"
                    />
                </div>
                <div className="create-info">
                    <label className="create-label">Year:</label>
                    <select
                        required
                        name="modelYear"
                    >
                        {years.map(year => 
                            <option key={year} value={year}>{year}</option>
                        )}
                    </select>
                </div>
                <div className="create-info">
                    <label className="create-label">Make Id: </label>
                    <label className="create-label create-label--info">{props.data.id}</label>
                    
                </div>
                <div className="create-info">
                    <label className="create-label">Make: </label>
                    <label className="create-label create-label--info">{props.data.Abrv}</label>
                </div>
                <div>
                    <button className="create-btn" type="submit">Add</button>
                </div>
            </form>
        </div>
        </>
    )
})
export default CreateModel;
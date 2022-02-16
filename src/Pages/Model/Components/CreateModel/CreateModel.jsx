import React from "react";

class CreateModel extends React.Component{
    render(){
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
        const store = this.props.createModelStore;
        const data = this.props.data;
        return(
            <>
                <div
                    className="create-filler"
                    onClick={store.onCreateHide}
                ></div>
                <div className="create-container container--right">
                    <div className="create-arrow"></div>
                    <form 
                        className="create-form" 
                        onSubmit={(e) => { 
                            store.onSubmit(e,data); 
                            store.onCreateHide() 
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
                            <label className="create-label">Make Name: </label>
                            <label className="create-label create-label--info">{data.Name}</label>
                            
                        </div>
                        <div className="create-info">
                            <label className="create-label">Make Abrv: </label>
                            <label className="create-label create-label--info">{data.Abrv}</label>
                        </div>
                        <div>
                            <button className="create-btn" type="submit">Add</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
    
export default CreateModel;
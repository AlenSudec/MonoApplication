
import {Observer, inject} from "mobx-react";
import React from "react";
import "./Filter.css";

class Filter extends React.Component{
    render(){
        console.log(this);
        const ListStore = this.props.listStore;
        const countries = ["None","Germany","France","Italy","England"]; //etc
        const revenues = [
            {text: "None", data : "None"},
            {text: "More than 5 bil", data : "5"}, 
            {text: "More than 10 bil", data : "10"}, 
            {text: "More than 15 bil", data: "15"},
            {text: "More than 20 bil", data: "20"} //etc
        ];
        return(
            <div className="header__filter filter__container">
            <h3 className="filter__h3">Filter by:</h3>
            <div className="filters">
                <div className="filter">
                    <label className="filter__label label--mg">Country:</label>
                    <Observer>{()=>
                        <select 
                            value={ListStore.countryFilter} 
                            onChange={ListStore.handleChangeCountry}
                        >
                            {countries.map(country => 
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            )}
                        </select>
                        }
                    </Observer>
                    
                </div>
                <div className="filter">
                    <label className="filter__label">Revenue:</label>
                    <Observer>{()=>
                        <select 
                            value={ListStore.revenueFilter} 
                            onChange={ListStore.handleChangeRevenue}
                        >
                            {revenues.map(revenue => 
                                <option key={revenue.data} value={revenue.data}>
                                    {revenue.text}
                                </option>
                            )}
                        </select>
                        }
                    </Observer>
                   
                </div>
            </div>
            <div className="filter__buttons">
                <button 
                    className="filter__btn" 
                    onClick={() => ListStore.getMakeAsync(false,false)}
                >
                    Filter
                </button>
                <button 
                    className="filter__btn" 
                    onClick={() => {
                        ListStore.setCountryFilter("None"); 
                        ListStore.setRevenueFilter("None"); 
                        ListStore.getMakeAsync(false,false); 
                    }}
                >
                    Reset
                </button>
            </div>
            
        </div> 
        )

    }
}
export default inject("listStore")(Filter);
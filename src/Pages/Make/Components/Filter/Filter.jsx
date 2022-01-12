import ListStore from "../../Stores/ListStore";
import "./Filter.css";
const Filter = () => {
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
                    <select defaultValue={countries[0]} onChange={ListStore.handleChangeCountry} name="country" id="country">
                            {countries.map(country => 
                                <option value={country}>
                                    {country}
                                </option>
                            )}
                        </select>
                </div>
                <div className="filter">
                    <label className="filter__label">Revenue:</label>
                    <select defaultValue={revenues[0]} onChange={ListStore.handleChangeRevenue} name="abrv" id="abrv">
                        {revenues.map(revenue => 
                            <option value={revenue.data}>
                                {revenue.text}
                            </option>
                            )}
                    </select>
                </div>
            </div>
            <div className="filter__buttons">
                <button className="filter__btn" onClick={() => ListStore.getMakeAsync(false,false)}>Filter</button>
                <button className="filter__btn" onClick={() => {ListStore.setCountryFilter("None"); ListStore.setRevenueFilter("None"); ListStore.getMakeAsync(false,false); }}>Reset</button>
            </div>
            
        </div> 
    )
}
export default Filter;
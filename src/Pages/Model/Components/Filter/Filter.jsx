import ListStore from "../../Stores/ListStore";

const Filter = () => {
    const years = ["None", 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

    return (
        <div className="header__filter filter__container">
            <h3 className="filter__h3">Filter by:</h3>
            <div className="filters">
                <div className="filter">
                    <label className="filter__label label--gap">Year: </label>
                    <select defaultValue={years[0]} onChange={ListStore.handleChangeYear} name="year" id="year">
                        {years.map(year =>
                            <option value={year}>
                                {year}
                            </option>
                            )}
                    </select>
                </div>
                <div className="filter">
                    <label className="filter__label">Make: </label>
                    {ListStore.allMakes.length !== 0 ? (
                        <select defaultValue={"None"} onChange={ListStore.handleChangeMake}>
                        {ListStore.allMakes.map(make =>
                            <option value={make.docId}>{make.Name}</option>
                        )}
                    </select>
                    ) : ("")}
                    
                </div>
            </div>
            <div className="filter__buttons">
                <button className="filter__btn" onClick={() => ListStore.getMakeAsync(false,false)}>Filter</button>
                <button className="filter__btn" onClick={() => {ListStore.setYearFilter("None"); ListStore.setMakeFilter("None"); ListStore.getMakeAsync(false,false)}}>Reset</button>            
            </div>
            </div>
    )
}
export default Filter;
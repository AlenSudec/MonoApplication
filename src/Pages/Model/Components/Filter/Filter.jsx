import ListStore from "../../Stores/ListStore";
import ModelStore from "../../Stores/ModelStore";
import { Observer } from "mobx-react";

const Filter = () => {
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

    return (
        <div className="header__filter filter__container">
            <h3 className="filter__h3">Filter by:</h3>
            <div className="filters">
                <div className="filter">
                    <label className="filter__label label--gap">Year: </label>
                    <Observer>
                        {()=>
                            <select 
                                value={ListStore.yearFilter} 
                                onChange={ListStore.handleChangeYear}
                            >
                                {years.map(year =>
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                )}
                            </select>
                        }
                    </Observer>
                </div>
                <div className="filter">
                    <label className="filter__label">Make: </label>
                    <Observer>
                        {()=>
                            ModelStore.allMakes.length !== 0 ? (
                                <select 
                                    value={ListStore.makeFilter} 
                                    onChange={ListStore.handleChangeMake}
                                >
                                    {ModelStore.allMakes.map(make =>
                                        <option key={make.docId} value={make.docId}>{make.Name}</option>
                                    )}
                                </select>
                            ) : ("")
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
                        ListStore.setYearFilter("None"); 
                        ListStore.setMakeFilter("None"); 
                        ListStore.getMakeAsync(false,false)
                    }}
                >
                    Reset
                </button>            
            </div>
        </div>
    )
}
export default Filter;
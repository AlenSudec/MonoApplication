import { makeAutoObservable } from "mobx";
class FilterStore {
    countryFilter = "None";
    revenueFilter = "None";
    constructor(getMakeAsync){
        makeAutoObservable(this);
        this.getMakeAsync = getMakeAsync;
    }
    
    runGetMakeAsync = (a, b, c, d) => {
        this.getMakeAsync(a, b, c, d);
    }
    handleChangeCountry = (e) => {
        this.setCountryFilter(e.target.value);

    }
    handleChangeRevenue = (e) => {
        this.setRevenueFilter(e.target.value);
    }
    setCountryFilter(value){
        this.countryFilter = value;

    }
    setRevenueFilter(value){
        this.revenueFilter = value;

    }


}
export default FilterStore;
import { makeAutoObservable } from "mobx";

class FilterModelStore {
    yearFilter = "None";
    makeFilter = "None";
    constructor(getMakeAsync,getAllMakes){
        makeAutoObservable(this);
        this.getMakeAsync = getMakeAsync;
        this.getAllMakes = getAllMakes;
    }
    getAllMakes(){
        return this.getAllMakes;
    }
    runGetMakeAsync = (a, b, c, d) => {
        this.getMakeAsync(a, b, c, d);
    }
    handleChangeYear = (e) => {
        this.setYearFilter(e.target.value);
    }
    handleChangeMake = (e) => {
        this.setMakeFilter(e.target.value);
    }
    setYearFilter(value){
        this.yearFilter = value;
    }
    setMakeFilter(value){
        this.makeFilter = value;
    }
}
export default FilterModelStore;
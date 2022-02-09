import { makeAutoObservable, runInAction} from "mobx";
import modelService from "../../../Common/Service/modelService";
import ModelStore from "./ModelStore";

class ListStore {
    lastVisible = null;
    firstVisible = null;
    sortFilter = "Name";
    ascOrDesc = "asc";
    yearFilter = "None";
    makeFilter = "None";
    nextButtonState = false;
    backButtonState = true;
    constructor(){
        makeAutoObservable(this);
        runInAction(async () => {
            await this.getMakeAsync();
            ModelStore.getListStore(this);
        })
        
    }
    setNextButtonState(state){
        this.nextButtonState = state;
    }
    setBackButtonState(state){
        this.backButtonState = state;
    }
    setYearFilter(year){
        this.yearFilter = year;
    }
    setMakeFilter(make){
        this.makeFilter = make;
    }
    getAllMakes(){
        return ModelStore.allMakes;
    }
    getModelStoreData(){
        return ModelStore.data;
    }
    createAsync = async (data) => { // not using
        await modelService.createAsync(data);
        ModelStore.setShowCreate();
        ModelStore.setShowNotification();
        this.getMakeAsync();
    }
    handleChangeYear = (e) => {
        this.setYearFilter(e.target.value);
    }
    handleChangeMake = (e) => {
        this.setMakeFilter(e.target.value);
    }
    setSortFilter(filter){
        this.sortFilter = filter;
        this.getMakeAsync(false,false);
    }

    handleSubmit = (e,props) => { // not using
        e.preventDefault();
        let data;
        data = {
            docId: "",
            Name: e.target.modelName.value,
            Abrv: props.Abrv,
            MakeId: props.id,
            MakeName : props.Name,
            modelYear : e.target.modelYear.value
        }
        this.createAsync(data);
    }
    handleClick = () => {
        ModelStore.setShowCreate();
    }
    handleClickOutside = () => {
        ModelStore.setShowCreate();
    }
    getMakeAsync = async(frwrd, bcwrd) => {
        if(frwrd){
            const resultMake = await modelService.getNextPageAsync(this.lastVisible, this.sortFilter, this.yearFilter, this.makeFilter);
            this.setBackButtonState(false);
            if(resultMake.docs.length > 0){
                this.lastVisible = resultMake.docs[resultMake.docs.length-1];
                this.firstVisible = resultMake.docs[resultMake.docs.length - (resultMake.docs.length-1)-1];
                this.results = [];
                resultMake.forEach(doc=> {
                    let result = {
                        docId: doc.id,
                        Abrv : doc.data().Abrv,
                        Name : doc.data().Name,
                        MakeId : doc.data().MakeId,
                        MakeName : doc.data().MakeName,
                        Year : doc.data().Year
                    }
                    this.results.push(result);
                })
                ModelStore.setData(this.results);
                //check data for next page
                const resultMakeNext = await modelService.getNextPageAsync(this.lastVisible, this.sortFilter, this.yearFilter, this.makeFilter);
                if(resultMakeNext.docs.length === 0){
                    this.setNextButtonState(true);
                }
            }
        }
        else if(bcwrd){
            const resultMake = await modelService.getBackPageAsync(this.firstVisible, this.sortFilter,this.yearFilter,this.makeFilter);
            if(resultMake.docs.length === 5){
                this.lastVisible = resultMake.docs[resultMake.docs.length-1];
                this.firstVisible = resultMake.docs[resultMake.docs.length - (resultMake.docs.length-1)-1];
                this.results = [];
                resultMake.forEach(doc=> {
                    let result = {
                        docId: doc.id,
                        Abrv : doc.data().Abrv,
                        Name : doc.data().Name,
                        MakeId : doc.data().MakeId,
                        MakeName : doc.data().MakeName,
                        Year : doc.data().Year
                    }
                    this.results.push(result);
                })
                this.setNextButtonState(false);
                ModelStore.setData(this.results);
                //check data on backpage
                const resultMakeBack = await modelService.getBackPageAsync(this.firstVisible, this.sortFilter,this.yearFilter,this.makeFilter);
                if(resultMakeBack.docs.length === 0){
                    this.setBackButtonState(true);
                }
            }
        }
        else {
            const resultMake = await modelService.getAsync(this.sortFilter, this.ascOrDesc,this.yearFilter, this.makeFilter);
            this.lastVisible = resultMake.docs[resultMake.docs.length-1];
            this.results = [];
            resultMake.forEach(doc=> {
                let result = {
                    docId: doc.id,
                    Abrv : doc.data().Abrv,
                    Name : doc.data().Name,
                    MakeId : doc.data().MakeId,
                    MakeName : doc.data().MakeName,
                    Year : doc.data().Year
                }
                this.results.push(result);
            })
            ModelStore.setData(this.results);
            this.setNextButtonState(false);
            //check data for next page
            const resultMakeNext = await modelService.getNextPageAsync(this.lastVisible, this.sortFilter, this.yearFilter, this.makeFilter);
            if(resultMakeNext.docs.length === 0){
                this.setNextButtonState(true);
            }
            else {
                this.setNextButtonState(false);
            }
        }
    }
}
export default ListStore;
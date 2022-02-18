import { makeAutoObservable, runInAction} from "mobx";
import modelService from "../../../Common/Service/modelService";
import FilterModelStore from "./ComponentStores/FilterModelStore";
import ModelStore from "./ModelStore";
import ListHeaderStore from "../../../Common/Store/ListHeaderStore";

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
        this.filterModelStore = new FilterModelStore(this.getMakeAsync,this.getAllMakes);
        this.listHeaderStore = new ListHeaderStore(this.setSortFilter);
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
    getAllMakes(){
        return ModelStore.allMakes;
    }
    getModelStoreData(){
        return ModelStore.data;
    }
    createAsync = async (data) => { 
        await modelService.createAsync(data);
        ModelStore.setShowCreate();
        ModelStore.setShowNotification();
        this.getMakeAsync();
    }
    setSortFilter = (filter) => {
        this.sortFilter = filter;
        this.getMakeAsync(false,false);
    }
    getMakeAsync = async(frwrd, bcwrd, yearFilter = "None", makeFilter = "None") => {
        if(frwrd){
            const resultMake = await modelService.getNextPageAsync(this.lastVisible, this.sortFilter, yearFilter, makeFilter);
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
                const resultMakeNext = await modelService.getNextPageAsync(this.lastVisible, this.sortFilter, yearFilter, makeFilter);
                if(resultMakeNext.docs.length === 0){
                    this.setNextButtonState(true);
                }
            }
        }
        else if(bcwrd){
            const resultMake = await modelService.getBackPageAsync(this.firstVisible, this.sortFilter, yearFilter, makeFilter);
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
                const resultMakeBack = await modelService.getBackPageAsync(this.firstVisible, this.sortFilter, yearFilter, makeFilter);
                if(resultMakeBack.docs.length === 0){
                    this.setBackButtonState(true);
                }
            }
        }
        else {
            const resultMake = await modelService.getAsync(this.sortFilter, this.ascOrDesc, yearFilter, makeFilter);
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
            const resultMakeNext = await modelService.getNextPageAsync(this.lastVisible, this.sortFilter, yearFilter, makeFilter);
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
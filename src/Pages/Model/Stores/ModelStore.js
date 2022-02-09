import { makeAutoObservable } from "mobx";
import modelService from "../../../Common/Service/modelService";
import MainStore from "../../../Common/Store/MainStore";

class ModelStore {
    data = [];
    results = [];
    showCreate = false;
    runOnce = false;
    allMakes = [];
    constructor(){
        makeAutoObservable(this);
        this.getAllMakesAsync();
    }
    setShowNotification = () => {
        MainStore.setShowNotification();
    }
    //get all makes for filter dropdown
    getAllMakesAsync = async () => {
        const getMakes = await modelService.getAllMakesAsync();
        this.results = [{Name: "None", docId: "None", Abrv: "None"}];
        getMakes.forEach(e => {
            let result = {
                docId: e.id,
                Name: e.data().Name,
                Abrv: e.data().Abrv
            }
            this.results.push(result);
        })
        this.setAllMakes(this.results);
        return this.allMakes;
    }
    addToAllMakes(data){
       const getCurrAllMakes = this.allMakes;
       this.results = [];
       getCurrAllMakes.forEach(e => {
           let result = {
               docId: e.id,
               Name: e.Name,
               Abrv: e.Abrv
           }
           this.results.push(result);
       })
       this.results.push(data);
       this.setAllMakes(this.results);
    }
    removeFromAllMakes(id){
        const getCurrAllMakes = this.allMakes;
        this.results = [];
        getCurrAllMakes.forEach(e => {
            if(e.docId !== id){
                let result = {
                    docId: e.id,
                    Name: e.Name,
                    Abrv: e.Abrv
                }
                this.results.push(result);
            }
        })
        this.setAllMakes(this.results);
    }
    updateAllMakes(data) {
        const getCurrAllMakes = this.allMakes;
        this.results = [];
        let result = [];
        getCurrAllMakes.forEach(e => {
            if(e.docId === data.docId){
                result = {
                    docId : data.docId,
                    Name : data.Name,
                    Abrv : data.Abrv
                }
            
            }
            else {
                result = {
                    docId : e.id,
                    Name: e.Name,
                    Abrv : e.Abrv
                }
            }
            this.results.push(result);
        })
        this.setAllMakes(this.results);
    }
    setAllMakes(data){
        this.allMakes = data;
    }
    setData(data){
        this.data = data;
    }
    setRunOnce(){
        this.runOnce = !this.runOnce;
    }
    setShowCreate(){
        this.showCreate = !this.showCreate;
    }
    reRunGetMake(){
        this.listStore.getMakeAsync();
    }
    getListStore(listStore){
        this.setListStore(listStore);
    }
    setListStore(listStore){
        this.listStore = listStore;
    }
    // handleSubmitCreate = (e,data) => {
    //     ListStore.handleSubmit(e,data);
    // }
}
export default new ModelStore();
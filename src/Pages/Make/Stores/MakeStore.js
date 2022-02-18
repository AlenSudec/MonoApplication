import { makeAutoObservable } from "mobx";
import MainStore from "../../../Common/Store/MainStore";

class MakeStore {
    data = [];
    results = [];
    showCreate = false;
    runOnce = false;

    constructor(){
       makeAutoObservable(this);
    }
    setData(data){
        this.data = data;
    }
    setResults(results){
       this.results = results;
    }
    setShowCreate(){
        this.showCreate = !this.showCreate;
    }
    setRunOnce(){
        this.runOnce = !this.runOnce;
    }
    addToAllMakesAsync = (data) => {
        MainStore.addToAllMakesAsync(data);
    }
    removeFromAllMakes = (id) => {
        MainStore.removeFromAllMakes(id);
    }
    updateAllMakes = (data) => {
        MainStore.updateAllMakes(data);
    }
    getListStore = (listStore) => {
        this.setListStore(listStore)
    }
    setListStore = (listStore) => {
        this.listStore = listStore;
    }
    getAllMakes = async() => {
        this.listStore.getMakeAsync();
    }
}

export default new MakeStore();
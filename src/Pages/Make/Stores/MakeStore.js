import { makeAutoObservable } from "mobx";
import ListStore from "./ListStore";
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
    reRunGetMake(){
        ListStore.getMakeAsync();
    }
    reRunGetMakesAsync = () => {
        MainStore.reRunGetMakesAsync();
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
}

export default new MakeStore();
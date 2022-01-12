import { makeAutoObservable } from "mobx";
import ListStore from "./ListStore";

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
}

export default new MakeStore();
import { makeAutoObservable } from "mobx";
import ListStore from "./ListStore";
class ModelStore {
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
    setRunOnce(){
        this.runOnce = !this.runOnce;
    }
    setShowCreate(){
        this.showCreate = !this.showCreate;
    }
    reRunGetMake(){
        ListStore.getMakeAsync();
    }
}
export default new ModelStore();
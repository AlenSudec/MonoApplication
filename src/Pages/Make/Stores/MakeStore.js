import { makeAutoObservable } from "mobx";
import MainStore from "../../../Common/Store/MainStore";
import EditStore from "../Stores/EditStore";


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
    setShowNotification = () => {
        EditStore.setShowNotification();
    }
}

export default new MakeStore();
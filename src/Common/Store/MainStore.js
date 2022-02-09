import { makeAutoObservable } from "mobx";
import MakeStore from "../../Pages/Make/Stores/MakeStore";
import ModelStore from "../../Pages/Model/Stores/ModelStore";

class MainStore {
    constructor(){
        makeAutoObservable(this);
    }

    //communication between make store and model store, 
    //every time a make is added, deleted or edited, 
    //this updates the state, so it doesnt have to pull data from db for every change
    reRunGetMakesAsync = () => {
        ModelStore.getAllMakesAsync();
    }
    addToAllMakesAsync = (data) => {
        ModelStore.addToAllMakes(data);
    }
    removeFromAllMakes = (id) => {
        ModelStore.removeFromAllMakes(id);
    }
    updateAllMakes = (data) => {
        ModelStore.updateAllMakes(data);
    }
    setShowNotification = () => {
        MakeStore.setShowNotification();
    }
    getAllModels = () => {
        ModelStore.reRunGetMake();
    }
    handleSubmitCreate = (e,data) => {
        ModelStore.handleSubmitCreate(e,data);
    }
}
export default new MainStore();
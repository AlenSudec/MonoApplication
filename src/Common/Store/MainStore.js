import { makeAutoObservable } from "mobx";
import ModelStore from "../../Pages/Model/Stores/ModelStore";

class MainStore {
    constructor(){
        makeAutoObservable(this);
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
    handleSubmitCreate = (e,data) => {
        ModelStore.handleSubmitCreate(e,data);
    }
}
export default new MainStore();
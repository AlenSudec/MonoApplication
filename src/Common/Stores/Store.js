import { makeAutoObservable } from "mobx";

class Store {
    showCreate = false;
    runOnce = false;
    
    constructor(){
        makeAutoObservable(this);
    }

    setShowCreate(){
        this.showCreate = !this.showCreate;
    }
    setRunOnce(){
        this.runOnce = !this.runOnce;
    }
}
export default new Store();
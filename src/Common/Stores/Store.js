import { makeAutoObservable } from "mobx";

class Store {
    showCreate = false;
    constructor(){
        makeAutoObservable(this);
        
    }

    setShowCreate(){
        this.showCreate = !this.showCreate;
        console.log(this.showCreate)
    }
}
export default new Store();
import { makeAutoObservable } from "mobx";

class Store {
    showCreate = false;
    emptyList = false;
    constructor(){
        makeAutoObservable(this);
    }

    setShowCreate(){
        this.showCreate = !this.showCreate;
    }
    setEmptyList(e){
        this.emptyList = e;
    }
}
export default new Store();
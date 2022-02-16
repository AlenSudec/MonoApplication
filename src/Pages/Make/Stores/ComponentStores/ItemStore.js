import { makeAutoObservable } from "mobx";

class ItemStore {
    constructor(hideCreate){
        makeAutoObservable(this);
        this.hideCreate = hideCreate;
    }
    hideCreateMake(){
        this.hideCreate();
    }
}
export default ItemStore;
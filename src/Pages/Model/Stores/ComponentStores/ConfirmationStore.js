import { makeAutoObservable } from "mobx";
class ConfirmationStore{
    constructor(onConfExit, deleteMake){
        makeAutoObservable(this);
        this.onConfExit = onConfExit;
        this.deleteMake = deleteMake;
    }
    hideConf(){
        this.onConfExit();
    }
    deleteMake(){
        this.deleteMake();
    }
}
export default ConfirmationStore;
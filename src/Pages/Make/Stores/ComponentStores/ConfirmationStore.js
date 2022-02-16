
class ConfirmationStore {
    constructor(onConfExit, onHasModels, deleteMake){
        this.onConfExit = onConfExit;
        this.onHasModels = onHasModels;
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
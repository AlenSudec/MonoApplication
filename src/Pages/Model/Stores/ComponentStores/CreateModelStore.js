import { makeAutoObservable } from "mobx";

class CreateModelStore {
    constructor(handleClickOutside, handleSubmit){
        makeAutoObservable(this);
        this.handleClick = handleClickOutside;
        this.submit = handleSubmit;
    }
    onCreateHide(){
        this.handleClick();
    }
    onSubmit = (e, data) => {
        this.submit(e,data);
    }
}
export default CreateModelStore;
import { makeAutoObservable} from "mobx";
class CreateStore {
    constructor(handleClickOutside, handleSubmit){
        makeAutoObservable(this);
        this.handleClick = handleClickOutside;
        this.handleSubmit = handleSubmit;
    }
    onClickOutside = () => {
        this.handleClick();
    }
    onHandleSubmit = (e) => {
        this.handleSubmit(e);
    }
}
export default CreateStore;
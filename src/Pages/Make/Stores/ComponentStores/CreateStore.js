class CreateStore {
    constructor(handleClickOutside, handleSubmit){
        this.handleClickOutside = handleClickOutside;
        this.handleSubmit = handleSubmit;
    }
    onClickOutside(){
        this.handleClickOutside();
    }
    onHandleSubmit = (e) => {
        this.handleSubmit(e);
    }
}
export default CreateStore;
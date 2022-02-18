import { makeAutoObservable, runInAction} from "mobx";
import makeService from "../../../Common/Service/makeService";
import MakeStore from "./MakeStore";
import ConfirmationStore from "./ComponentStores/ConfirmationStore";
import CreateModelStore from "../../Model/Stores/ComponentStores/CreateModelStore";

class EditStore {
    currData = [];
    contents = [];
    data = null;
    currDataId = "";
    showConf = false;
    hasModels = false;
    showCreate = false;
    country = "None";
    showNotification = false;
    id = "";
    constructor(){
        makeAutoObservable(this);
        runInAction(async() => {
            await this.getIdFromUrl(window.location.href);
            await this.checkModels(this.id);
            
            await this.getMakeByIdAsync(this.id);
            this.createModelStore = new CreateModelStore(this.handleClickOutside, this.handleSubmitCreate);
        })  
    }
    onConfirmationExit = () => {
       this.setShowConf();
    }
    getIdFromUrl = async(url) => {
        const splitUrl = url.split("/");
        this.setId(splitUrl[4]);
    }
    setId(id){
        this.id = id;
    }
    setShowNotification(){
        this.setNotification();
        setTimeout(()=> {
            this.setNotification();
        }, 2000);
    }
    setNotification(){
        this.showNotification = !this.showNotification;
    }
    setShowCreate(){
        this.showCreate = !this.showCreate;
    }
    setShowConf(){
        if(!this.showConf) this.confirmationStore = new ConfirmationStore(this.onConfirmationExit, this.hasModels, this.deleteMake);
        this.showConf = !this.showConf;

    }
    setHasModels(value){
        this.hasModels = value;
    }
    handleClick = () => {
        this.setShowCreate();
    }
    //check if models have make
    checkModels = async (id) => {
        const resultMake = await makeService.checkModels(id);
        if(resultMake.docs.length > 0){
            this.setHasModels(true);
        }
        else {
            this.setHasModels(false);
        }
    }
    getMakeByIdAsync = async (id) => {
        await this.checkModels(id);
        const resultMake = await makeService.getMakeByIdAsync(id);
        this.currentData = {
            docId : id,
            Name : resultMake.data().Name,
            Abrv: resultMake.data().Abrv,
            Country : resultMake.data().Country,
            Revenue : resultMake.data().Revenue
        }
        this.setCurrData(this.currentData);
        this.setCurrDataId(id);
        this.setCurrDataCountry(this.currentData.Country);
        this.contents = []
        MakeStore.data.forEach(e => {
            let content = {
                docId : e.docId,
                Name: e.Name,
                Abrv: e.Abrv,
                Country:  e.Country,
                Revenue: e.Revenue
            }
            this.contents.push(content);
        })
    }
    updateMakeAsync = async (data) => {
        await makeService.updateMakeAsync(data);
        for(let i = 0; i < this.contents.length; i++){
            if(this.contents[i].docId === data.docId){
                this.contents[i].Name = data.Name;
                this.contents[i].Abrv = data.Abrv;
                this.contents[i].Country = data.Country;
                this.contents[i].Revenue = parseInt(data.Revenue);
            }
        }
        this.contents = [];
        MakeStore.updateAllMakes(data);
    }
    deleteMakeAsync = async (id) => {
        await makeService.deleteMakeASync(id);
        MakeStore.getAllMakes();
        MakeStore.removeFromAllMakes(id);
    }
   
    setCurrData(currentData){
        this.currData = currentData;
    }
    setCurrDataId(id){
        this.currDataId = id;
    }
    setCurrDataCountry(country){
        this.country = country;
    }
    deleteMake = () => {
        this.deleteMakeAsync(this.currDataId);
        this.data = {
            docId : null,
            Name: "",
            Abrv: "",
            Country: "",
            Revenue: "",
        }
        this.setCurrData(this.data);
        MakeStore.setRunOnce();
    }
    handleUpdate = (e) => {
        e.preventDefault();
        this.data = {
            docId : this.currDataId,
            Name : e.target.Name.value,
            Abrv : e.target.Abrv.value,
            Country : e.target.Country.value,
            Revenue: parseInt(e.target.Revenue.value)
        }
        this.updateMakeAsync(this.data);
        this.setCurrData(this.data);
        MakeStore.setRunOnce();
    }
    handleSelectChange = (e) => {
        this.setCurrDataCountry(e.target.value);
    }
    handleClickOutside = () => {
        this.setShowCreate();
    }
    handleSubmitCreate = (e,props) => {
        e.preventDefault();
        let data;
        data = {
            docId: "",
            Name: e.target.modelName.value,
            Abrv: props.Abrv,
            MakeId: props.id,
            MakeName: props.Name,
            modelYear : e.target.modelYear.value
        }
        this.createModelAsync(data);
    }
    createModelAsync = async (data) => {
        await makeService.createModelAsync(data);
        this.setHasModels(true);
        this.setShowNotification();
    }
}
export default EditStore;

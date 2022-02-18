import { makeAutoObservable, runInAction } from "mobx";
import modelService from "../../../Common/Service/modelService";
import ModelStore from "./ModelStore";
import ConfirmationStore from "./ComponentStores/ConfirmationStore";

class EditStore {
    currData = [];
    contents = [];
    data = null;
    currDataId = "";
    allMakes = [];
    selectValue = [];
    showConf = false;
    id = "";
    constructor(){
        makeAutoObservable(this);
        runInAction(async()=> {
            await this.getIdFromUrl(window.location.href);
            this.confStore = new ConfirmationStore(this.onConfirmationExit, this.deleteMake);
            await this.getByIdAsync(this.id);
            await this.getAllMakesAsync();
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
    setShowConf(){
        this.showConf = !this.showConf;
    }
    setSelectValue(value){
        this.selectValue = value;
    }
    handleOnChange = (e) => {
        this.setSelectValue(e.target.value);
    }
    getAllMakesAsync = async () => {
        const getMakes = await modelService.getAllMakesAsync();
        this.results = [];
        getMakes.forEach(e => {
            let result = {
                docId: e.id,
                Name : e.data().Name,
                Abrv : e.data().Abrv
            }
            this.results.push(result);
        })
        this.setAllMakes(this.results);
    }
    setAllMakes(data){
        this.allMakes = data;
    }
    getByIdAsync = async (id) => {
        const resultMake = await modelService.getByIdAsync(id);
        this.currentData = {
            docId : id,
            Name : resultMake.data().Name,
            Abrv : resultMake.data().Abrv,
            MakeId : resultMake.data().MakeId,
            Year : resultMake.data().Year,
            MakeName : resultMake.data().MakeName
        }
        this.setCurrData(this.currentData);
        this.setCurrDataId(id);
        this.setSelectValue([this.currentData.MakeId, this.currentData.Abrv, this.currentData.MakeName]);
        this.contents = [];
        ModelStore.data.forEach(e => {
            let content = {
                docId : e.docId,
                Name : e.Name,
                Abrv : e.Abrv,
                MakeId : e.MakeId,
                Year : e.Year,
                MakeName : e.MakeName
            }
            this.contents.push(content);
        })
    }
    updateAsync = async (data) => {
        await modelService.updateAsync(data);
    }
    handleUpdate = (e) => {
        e.preventDefault();
        let dataGet = e.target.MakeId.value.split(",");
        this.data = {
            docId : this.currDataId,
            Name : e.target.Name.value,
            Year : parseInt(e.target.Year.value),
            MakeId : dataGet[0],
            Abrv : dataGet[1],
            MakeName : dataGet[2]
        }
        this.updateAsync(this.data);
        this.setCurrData(this.data);
    }
    handleBack = async () => {
        this.data = {
            docId : null,
            Name: "",
            Abrv: "",
            MakeId : "",
            Year : null
        }
        this.setCurrData(this.data);
    }
    deleteAsync = async (id) => {
        await modelService.deleteAsync(id);
        ModelStore.getAllModels();
    }
    deleteMake = ()  => {
        this.deleteAsync(this.currDataId);
        this.data = {
            docId : null,
            Name: "",
            Abrv: "",
            MakeId : "",
            Year: null
        }
        this.setCurrData(this.data);
    }
    setCurrData(currentData){
        this.currData = currentData;
    }

    setCurrDataId(id){
        this.currDataId = id;
    }
}
export default EditStore;
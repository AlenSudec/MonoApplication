import { makeAutoObservable } from "mobx";
import modelService from "../../../Common/Service/modelService";
import ModelStore from "./ModelStore";

class EditStore {
    currData = [];
    contents = [];
    data = null;
    currDataId = "";
    constructor(){
        makeAutoObservable(this);
    }
    getByIdAsync = async (id) => {
        const resultMake = await modelService.getByIdAsync(id);
        this.currentData = {
            docId : id,
            Name : resultMake.data().Name,
            Abrv : resultMake.data().Abrv,
            MakeId : resultMake.data().MakeId,
            Year : resultMake.data().Year
        }
        this.setCurrData(this.currentData);
        this.setCurrDataId(id);
        this.contents = [];
        ModelStore.data.forEach(e => {
            let content = {
                docId : e.docId,
                Name : e.Name,
                Abrv : e.Abrv,
                MakeId : e.MakeId,
                Year : e.Year
            }
            this.contents.push(content);
        })
    }
    updateAsync = async (data) => {
        await modelService.updateAsync(data);
        for(let i = 0; i < this.contents.length; i++){
            if(this.contents[i].docId === data.docId){
                this.contents[i].Name = data.Name;
                this.contents[i].Year = data.Year;
            }
        }
        ModelStore.setData(this.contents);
        this.contents = [];
    }
    handleUpdate = (e) => {
        e.preventDefault();
        this.data = {
            docId : this.currDataId,
            Name : e.target.Name.value,
            Year : parseInt(e.target.Year.value)
        }
        this.updateAsync(this.data);
        this.setCurrData(this.data);
        ModelStore.setRunOnce();
    }
    handleBack = async () => {
        ModelStore.setRunOnce();
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
        for(let i = 0; i < this.contents.length; i++) {
            if(this.contents[i].docId === id){
                this.contents.splice(i, 1);
            }
        }
        ModelStore.setData(this.contents);
        this.contents = [];
        ModelStore.reRunGetMake();
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
        ModelStore.setRunOnce();
    }
    setCurrData(currentData){
        this.currData = currentData;
    }

    setCurrDataId(id){
        this.currDataId = id;
    }
}
export default new EditStore();
import { makeAutoObservable} from "mobx";
import makeService from "../../../Common/Service/makeService";
import Store from "../../../Common/Stores/Store";
import MakeStore from "./MakeStore";

class EditStore {
    currData = [];
    contents = [];
    data = null;
    currDataId = "";
    constructor(){
        makeAutoObservable(this);
    }
    
    getMakeByIdAsync = async (id) => {
        const resultMake = await makeService.getMakeByIdAsync(id);
        this.currentData = {
            docId : id,
            Name : resultMake.data().Name,
            Abrv: resultMake.data().Abrv,
        }
        this.setCurrData(this.currentData);
        this.setCurrDataId(id);
        this.contents = []
        MakeStore.data.forEach(e => {
            let content = {
                docId : e.docId,
                Name: e.Name,
                Abrv: e.Abrv
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
            }
        }
        MakeStore.setData(this.contents);
        this.contents = [];
    }
    deleteMakeAsync = async (id) => {
        await makeService.deleteMakeASync(id);
        for(let i = 0; i < this.contents.length; i++){
            if(this.contents[i].docId === id){
                this.contents.splice(i, 1);
            }
        }
        MakeStore.setData(this.contents);
        this.contents = [];
    }
   
    setCurrData(currentData){
        this.currData = currentData;
    }
    setCurrDataId(id){
        this.currDataId = id;
    }
    //edit functions
    handleBack = async () => {
        Store.setRunOnce();
        this.data = {
            docId : null,
            Name : "",
            Abrv: ""
        }
        this.setCurrData(this.data);
    }
    deleteMake = () => {
        this.deleteMakeAsync(this.currDataId);
        this.data = {
            docId : null,
            Name: "",
            Abrv: ""
        }
        this.setCurrData(this.data);
        Store.setRunOnce();
    }
    handleUpdate = (e) => {
        e.preventDefault();
        this.data = {
            docId : this.currDataId,
            Name : e.target.Name.value,
            Abrv : e.target.Abrv.value,
        }
        this.updateMakeAsync(this.data);
        this.setCurrData(this.data);
        Store.setRunOnce();
    }
}
export default new EditStore();
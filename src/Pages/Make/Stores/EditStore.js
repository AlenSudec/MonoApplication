import { makeAutoObservable} from "mobx";
import makeService from "../../../Common/Service/makeService";
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
            Country : resultMake.data().Country,
            Revenue : resultMake.data().Revenue
        }
        this.setCurrData(this.currentData);
        this.setCurrDataId(id);
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
                this.contents[i].Revenue = data.Revenue;
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
        MakeStore.reRunGetMake();
    }
   
    setCurrData(currentData){
        this.currData = currentData;
    }
    setCurrDataId(id){
        this.currDataId = id;
    }
    //edit functions
    handleBack = async () => {
        MakeStore.setRunOnce();
        this.data = {
            docId : null,
            Name : "",
            Abrv: "",
            Country: "",
            Revenue: "",
        }
        this.setCurrData(this.data);
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
            Revenue: e.target.Revenue.value
        }
        this.updateMakeAsync(this.data);
        this.setCurrData(this.data);
        MakeStore.setRunOnce();
    }
}
export default new EditStore();

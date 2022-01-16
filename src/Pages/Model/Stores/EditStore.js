import { makeAutoObservable } from "mobx";
import modelService from "../../../Common/Service/modelService";
import ModelStore from "./ModelStore";

class EditStore {
    currData = [];
    contents = [];
    data = null;
    currDataId = "";
    allMakes = [];
    selectValue = [];
    showConf = false;
    constructor(){
        makeAutoObservable(this);
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
        
        for(let i = 0; i < this.contents.length; i++){
            if(this.contents[i].docId === data.docId){
                this.contents[i].Name = data.Name;
                this.contents[i].Year = data.Year;
                this.contents[i].Abrv = data.Abrv;
                this.contents[i].MakeId = data.MakeId;
                this.contents[i].MakeName = data.MakeName; 
            }
        }
        ModelStore.setData(this.contents);
        this.contents = [];
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
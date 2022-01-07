import { makeAutoObservable } from "mobx";
import makeService from "../../../Common/Service/makeService";
import Store from "../../../Common/Stores/Store";
import MakeStore from "./MakeStore";

class ListStore {
    results = [];
    constructor(){
        makeAutoObservable(this);
        this.getMakeAsync();
    }

    getMakeAsync = async () => {
        const resultMake = await makeService.getMakeAsync();
        this.results = [];
        resultMake.forEach(doc => {
            let result = {
                docId : doc.id,
                Name : doc.data().Name,
                Abrv : doc.data().Abrv,
            }
            this.results.push(result);
        })
        MakeStore.setData(this.results);
    }
    createMakeAsync = async (data) => {
        const resultMake = await makeService.createMakeAsync(data);
        this.results = [];
        MakeStore.data.forEach(e => {
            let result = {
                docId : e.docId,
                Name : e.Name,
                Abrv: e.Abrv
            }
            this.results.push(result);
        })
        this.results.push(resultMake);
        MakeStore.setData(this.results);
    }
    //List functions
    handleClick = () => {
        Store.setShowCreate();
    }
    hideCreate = () => {
        if(Store.showCreate){
            Store.setShowCreate();
        }
    }
    //Create functions
    handleSubmit = (e) => {
        e.preventDefault();
        let data;
        data = {
            docId: "",
            Name: e.target.makeName.value,
            Abrv: e.target.makeAbrv.value
        }
        Store.setShowCreate();
        this.createMakeAsync(data);
    }
    handleClickOutside = () => {
        Store.setShowCreate();
    }
}
export default new ListStore();
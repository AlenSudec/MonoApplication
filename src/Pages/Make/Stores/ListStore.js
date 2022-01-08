import { makeAutoObservable } from "mobx";
import makeService from "../../../Common/Service/makeService";
import Store from "../../../Common/Stores/Store";
import MakeStore from "./MakeStore";

class ListStore {
    results = [];
    lastVisible = null;
    firstVisible = null;
    sortFilter = "Name";
    ascOrDesc = "asc";
    constructor(){
        makeAutoObservable(this);
        this.getMakeAsync();
    }

    getMakeAsync = async (frwrd, bcwrd) => {
        makeService.filterTest();
        if(frwrd){
             //NEXT QUERY
            const resultMake = await makeService.getMakeNextPageAsync(this.lastVisible,this.sortFilter);
            console.log(resultMake);
            if(resultMake.docs.length > 0){
                this.lastVisible = resultMake.docs[resultMake.docs.length-1];
                this.firstVisible = resultMake.docs[resultMake.docs.length - (resultMake.docs.length-1)-1];
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
            else {
                alert("Nema vise proizvodaca"); //RESI ALERT FRONTEND
            }
            
        }
        else if(bcwrd){
            const resultMake = await makeService.getMakeBackPageAsync(this.firstVisible,this.sortFilter);
            if(resultMake.docs.length === 5) {
                this.lastVisible = resultMake.docs[resultMake.docs.length-1];
                this.firstVisible = resultMake.docs[resultMake.docs.length - (resultMake.docs.length-1)-1];
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
            else {
                alert("Nema vise"); //RESI ALERT FRONTEND
            }
        }
        else {
            //INIT QUERY
            const resultMake = await makeService.getMakeAsync(this.sortFilter, this.ascOrDesc);
            this.lastVisible = resultMake.docs[resultMake.docs.length-1];
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
    }
    createMakeAsync = async (data) => {
        await makeService.createMakeAsync(data);
        alert("Dodali ste proizvodaca"); // resi frontend alert
        this.getMakeAsync();
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
    setSortFilter(filter){
        if(this.sortFilter === filter){
            this.setAscOrDesc();
        }
        this.sortFilter = filter;
        
        this.getMakeAsync();
    }
    setAscOrDesc(){
        if(this.ascOrDesc === "asc"){
            this.ascOrDesc = "desc"
        }
        else {
            this.ascOrDesc = "asc"
        }
    }
}
export default new ListStore();
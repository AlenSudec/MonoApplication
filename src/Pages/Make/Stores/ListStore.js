import { makeAutoObservable } from "mobx";
import makeService from "../../../Common/Service/makeService";
import MakeStore from "./MakeStore";

class ListStore {
    results = [];
    lastVisible = null;
    firstVisible = null;
    sortFilter = "Name";
    ascOrDesc = "asc";
    countryFilter = "None";
    revenueFilter = "None";
    constructor(){
        makeAutoObservable(this);
        this.getMakeAsync();
    }
    getMakeAsync = async (frwrd, bcwrd) => {
        if(frwrd){
             //NEXT QUERY
            const resultMake = await makeService.getMakeNextPageAsync(this.lastVisible,this.sortFilter, this.revenueFilter, this.countryFilter);
            if(resultMake.docs.length > 0){
                this.lastVisible = resultMake.docs[resultMake.docs.length-1];
                this.firstVisible = resultMake.docs[resultMake.docs.length - (resultMake.docs.length-1)-1];
                this.results = [];
                resultMake.forEach(doc => {
                    let result = {
                        docId : doc.id,
                        Name : doc.data().Name,
                        Abrv : doc.data().Abrv,
                        Country : doc.data().Country,
                        Revenue: doc.data().Revenue
                    }
                    this.results.push(result);
                })
                MakeStore.setData(this.results);
            }
            else {
                alert("You are on the last page");
            }
            
        }
        else if(bcwrd){
            const resultMake = await makeService.getMakeBackPageAsync(this.firstVisible,this.sortFilter, this.revenueFilter, this.countryFilter);
            if(resultMake.docs.length === 5) {
                this.lastVisible = resultMake.docs[resultMake.docs.length-1];
                this.firstVisible = resultMake.docs[resultMake.docs.length - (resultMake.docs.length-1)-1];
                this.results = [];
                resultMake.forEach(doc => {
                    let result = {
                        docId : doc.id,
                        Name : doc.data().Name,
                        Abrv : doc.data().Abrv,
                        Country : doc.data().Country,
                        Revenue: doc.data().Revenue
                    }
                    this.results.push(result);
                })
                MakeStore.setData(this.results);
            }
            else {
                alert("You are on the first page");
            }
        }
        else {
            //INIT QUERY
            const resultMake = await makeService.getMakeAsync(this.sortFilter, this.ascOrDesc, this.revenueFilter, this.countryFilter);
            this.lastVisible = resultMake.docs[resultMake.docs.length-1];
            this.results = [];
            resultMake.forEach(doc => {
                let result = {
                    docId : doc.id,
                    Name : doc.data().Name,
                    Abrv : doc.data().Abrv,
                    Country : doc.data().Country,
                    Revenue: doc.data().Revenue
                }
                this.results.push(result);
            })
            MakeStore.setData(this.results);
        }
    }
    createMakeAsync = async (data) => {
        await makeService.createMakeAsync(data);
        alert("Make has been added");
        this.getMakeAsync();
    }
    //List functions
    handleClick = () => {
        MakeStore.setShowCreate();
    }
    hideCreate = () => {
        if(MakeStore.showCreate){
            MakeStore.setShowCreate();
        }
    }
    //Create functions
    handleSubmit = (e) => {
        e.preventDefault();
        let data;
        data = {
            docId: "",
            Name: e.target.makeName.value,
            Abrv: e.target.makeAbrv.value,
            Country: e.target.makeCountry.value,
            Revenue: parseInt(e.target.makeRevenue.value)
        }
        MakeStore.setShowCreate();
        this.createMakeAsync(data);
    }
    handleClickOutside = () => {
        MakeStore.setShowCreate();
    }
    //filter functions
    handleChangeCountry = (e) => {
        this.setCountryFilter(e.target.value);
    }
    handleChangeRevenue = (e) => {
        this.setRevenueFilter(e.target.value);
    }
    setSortFilter(filter){
        if(this.sortFilter === filter){
            this.setAscOrDesc();
        }
        this.sortFilter = filter;
        
        this.getMakeAsync(false,false);
    }
    setAscOrDesc(){
        if(this.ascOrDesc === "asc"){
            this.ascOrDesc = "desc"
        }
        else {
            this.ascOrDesc = "asc"
        }
    }
    setCountryFilter(countryFilter){
        this.countryFilter = countryFilter;
    }
    setRevenueFilter(revenueFilter){
        this.revenueFilter = revenueFilter;
    }
}
export default new ListStore();
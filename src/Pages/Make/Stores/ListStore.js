import { makeAutoObservable, runInAction } from "mobx";
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
    nextButtonState = false;
    backButtonState = true;
    showNotification = false;
    constructor(){
        makeAutoObservable(this);
        runInAction(async () => {
            await this.getMakeAsync();
            console.log("list store started123");
        })
    }
    setShowNotification(){
        this.showNotification = !this.showNotification;
        setTimeout(() => {
            this.showNotification = !this.showNotification
        }, 1000);
    }
    setNextButtonState(state) {
        this.nextButtonState = state;
    }
    setBackButtonState(state){
        this.backButtonState = state;
    }
    getMakeStoreData(){
        return MakeStore.data;
    }
    getMakeStoreShowCreate(){
        return MakeStore.showCreate;
    }
    getMakeAsync = async (frwrd, bcwrd) => {
        if(frwrd){
             //NEXT QUERY
            const resultMake = await makeService.getMakeNextPageAsync(this.lastVisible,this.sortFilter, this.revenueFilter, this.countryFilter);
            this.setBackButtonState(false);
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
                //check data for next page
                const resultMakeNext = await makeService.getMakeNextPageAsync(this.lastVisible,this.sortFilter, this.revenueFilter, this.countryFilter);
                if(resultMakeNext.docs.length === 0){
                    this.setNextButtonState(true);
                }
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
                this.setNextButtonState(false);
                MakeStore.setData(this.results);
                //check data on backpage
                const resultMakeBack = await makeService.getMakeBackPageAsync(this.firstVisible,this.sortFilter, this.revenueFilter, this.countryFilter);
                if(resultMakeBack.docs.length === 0){
                    this.setBackButtonState(true);
                }
            }
        }
        else {
            //INIT QUERY OR FIRST PAGE
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
             //check data for next page
             const resultMakeNext = await makeService.getMakeNextPageAsync(this.lastVisible,this.sortFilter, this.revenueFilter, this.countryFilter);
             if(resultMakeNext.docs.length === 0){
                 this.setNextButtonState(true);
             }
             else {
                 this.setNextButtonState(false);
             }
        }
    }
    createMakeAsync = async (data) => {
        await makeService.createMakeAsync(data);
        // alert("Make has been added");
        this.setShowNotification();
        this.getMakeAsync();
        MakeStore.addToAllMakesAsync(data);
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
export default ListStore;
//export default new ListStore();
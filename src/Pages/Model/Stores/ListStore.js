import { makeAutoObservable} from "mobx";
import modelService from "../../../Common/Service/modelService";
import ModelStore from "./ModelStore";

class ListStore {
    allMakes = [];
    lastVisible = null;
    firstVisible = null;
    sortFilter = "Name";
    ascOrDesc = "asc";
    yearFilter = "None";
    makeFilter = "None";
    constructor(){
        makeAutoObservable(this);
        this.getMakeAsync();
        this.getAllMakesAsync();
    }
    setAllMakes(data) {
        this.allMakes = data;
    }
    setYearFilter(year){
        this.yearFilter = year;
    }
    setMakeFilter(make){
        this.makeFilter = make;
    }
    createAsync = async (data) => {
        await modelService.createAsync(data);
        ModelStore.setShowCreate();
        alert("dodano");
        this.getMakeAsync();
    }
    handleChangeYear = (e) => {
        this.setYearFilter(e.target.value);
    }
    handleChangeMake = (e) => {
        this.setMakeFilter(e.target.value);
    }
    setSortFilter(filter){
        if(this.sortFilter === filter){
            this.setAscOrDesc();
        }
        this.sortFilter = filter;
        this.getMakeAsync(false,false);
    }
    //GET ALL MAKES FOR FILTER
    getAllMakesAsync = async () => {
        const getMakes = await modelService.getAllMakesAsync();
        this.results = [{Name: "None", docId: "None"}];
        getMakes.forEach(e => {
            let result = {
                docId : e.id,
                Name : e.data().Name
            }
            this.results.push(result);
        })

        this.setAllMakes(this.results);
        return this.allMakes;
    }

    handleSubmit = (e,props) => {
        e.preventDefault();
        let data;
        data = {
            docId: "",
            Name: e.target.modelName.value,
            Abrv: props.Abrv,
            MakeId: props.id,
            modelYear : e.target.modelYear.value
        }
        this.createAsync(data);
    }
    handleClick = () => {
        ModelStore.setShowCreate();
    }
    handleClickOutside = () => {
        ModelStore.setShowCreate();
    }
    getMakeAsync = async(frwrd, bcwrd) => {
        if(frwrd){
            const resultMake = await modelService.getNextPageAsync(this.lastVisible, this.sortFilter, this.yearFilter, this.makeFilter);
            if(resultMake.docs.length > 0){
                this.lastVisible = resultMake.docs[resultMake.docs.length-1];
                this.firstVisible = resultMake.docs[resultMake.docs.length - (resultMake.docs.length-1)-1];
                this.results = [];
                resultMake.forEach(doc=> {
                    let result = {
                        docId: doc.id,
                        Abrv : doc.data().Abrv,
                        Name : doc.data().Name,
                        MakeId : doc.data().MakeId,
                        Year : doc.data().Year
                    }
                    this.results.push(result);
                })
                ModelStore.setData(this.results);
            }
            else {
                alert("You are on the last page");
            }
        }
        else if(bcwrd){
            const resultMake = await modelService.getBackPageAsync(this.firstVisible, this.sortFilter,this.yearFilter,this.makeFilter);
            if(resultMake.docs.length === 5){
                this.lastVisible = resultMake.docs[resultMake.docs.length-1];
                this.firstVisible = resultMake.docs[resultMake.docs.length - (resultMake.docs.length-1)-1];
                this.results = [];
                resultMake.forEach(doc=> {
                    let result = {
                        docId: doc.id,
                        Abrv : doc.data().Abrv,
                        Name : doc.data().Name,
                        MakeId : doc.data().MakeId,
                        Year : doc.data().Year
                    }
                    this.results.push(result);
                })
                ModelStore.setData(this.results);
            }
            else {
                alert("You are on the first page");
            }
        }
        else {
            const resultMake = await modelService.getAsync(this.sortFilter, this.ascOrDesc,this.yearFilter, this.makeFilter);
            this.lastVisible = resultMake.docs[resultMake.docs.length-1];
            this.results = [];
            resultMake.forEach(doc=> {
                let result = {
                    docId: doc.id,
                    Abrv : doc.data().Abrv,
                    Name : doc.data().Name,
                    MakeId : doc.data().MakeId,
                    Year : doc.data().Year
                }
                this.results.push(result);
            })
            ModelStore.setData(this.results);
        }
    }
}
export default new ListStore();
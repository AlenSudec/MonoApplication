import { makeAutoObservable } from "mobx";

class MakeStore {
    data = [];
    results = [];
    constructor(){
       makeAutoObservable(this);
    }
    setData(data){
        this.data = data;
    }
    setResults(results){
       this.results = results;
    }
}

export default new MakeStore();
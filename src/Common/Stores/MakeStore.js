import db from "../Service/firebase";
import { makeAutoObservable } from "mobx";

class MakeStore {
    data = [];
    constructor(){
        makeAutoObservable(this);
        this.getMakeAsync();
    }

    getMakeAsync = async () => {
        const getData = db.collection("VehicleMake");
        await getData.get().then((e) => {
            this.results = [];
            e.forEach(doc => {
                let result = {
                    docId : doc.id,
                    Name: doc.data().Name,
                    Abrv: doc.data().Abrv,
                }
                this.results.push(result)
            })
            this.setData(this.results);
        })
    }
    createMakeAsync = async (data) => {
        db.collection("VehicleMake").add({
            Name: data.Name,
            Abrv: data.Abrv
        }).then(docRef => {
            data.docId = docRef.id;
            this.results.push(data);
            this.setData(this.results);
        })
    }
    deleteMakeAsync = async (id) => {
        const getMake = db.collection("VehicleMake").doc(id);
        await getMake.delete();
        for(let i = 0; i < this.results.length; i++){
            if(this.results[i].docId === id){
                this.results.splice(i, 1);
            }
        }
        this.setData(this.results);
    }
    updateMakeAsync = async (data) => {
        const currMake = db.collection("VehicleMake").doc(data.docId);
        await currMake.update({
            Name: data.Name,
            Abrv: data.Abrv,
        })
        for(let i = 0; i < this.results.length; i++){
            if(this.results[i].docId === data.docId){
                this.results[i].Name = data.Name;
                this.results[i].Abrv = data.Abrv;
            }
        }
        this.setData(this.results);
    }
    setData(data){
        this.data = data;
    }
}

export default new MakeStore();
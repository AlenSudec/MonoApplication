
import { getDocs, where, query, collection, limit, getDoc, orderBy, startAfter, endBefore, limitToLast } from "firebase/firestore";
import db from "./firebase";

class ModelService {
    createAsync = async (data) => {
        const create = await db.collection("VehicleModel").add({
            MakeId : data.MakeId,
            Name : data.Name,
            Abrv : data.Abrv,
            MakeName : data.MakeName,
            Year : parseInt(data.modelYear)
        })
        data.docId = create.id;
        return await data;
    }
    //get all makes for filtering
    getAllMakesAsync = async() => {
        const getMakes = db.collection("VehicleMake");
        return await getMakes.get();
    }
    //init pagination models
    getAsync = async(sortFilter, ascOrDesc, year, make) => {
        if(year === "None" && make === "None"){
            const getData = query(collection(db, "VehicleModel"),
                orderBy(sortFilter, ascOrDesc),
                limit(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else if(year !== "None" && make === "None") {
            const getData = query(collection(db, "VehicleModel"),
                where("Year", "==", parseInt(year)),
                orderBy(sortFilter, ascOrDesc),
                limit(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else if(year === "None" && make !== "None"){
            const getData = query(collection(db, "VehicleModel"),
                where("MakeId", "==", make),
                orderBy(sortFilter, ascOrDesc),
                limit(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else {
            const getData = query(collection(db, "VehicleModel"),
                where("MakeId", "==", make),
                where("Year", "==", parseInt(year)),
                orderBy(sortFilter, ascOrDesc),
                limit(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        
    }
    getNextPageAsync = async(lastVisible, sortFilter, year, make) => {
        if(year === "None" && make === "None"){
            const getData = query(collection(db, "VehicleModel"),
                orderBy(sortFilter),
                startAfter(lastVisible),
                limit(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else if (year !== "None" && make === "None"){
            const getData = query(collection(db, "VehicleModel"),
                where("Year", "==", year),
                orderBy(sortFilter),
                startAfter(lastVisible),
                limit(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else if(year === "None" && make !== "None"){
            const getData = query(collection(db, "VehicleModel"),
                where("MakeId", "==", make),
                orderBy(sortFilter),
                startAfter(lastVisible),
                limit(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }   
        else {
            const getData = query(collection(db, "VehicleModel"),
                where("MakeId", "==", make),
                where("Year", "==", parseInt(year)),
                orderBy(sortFilter),
                startAfter(lastVisible),
                limit(5)
            );
            
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
       
    }
    getBackPageAsync = async(firstVisible, sortFilter, year, make) => {
        if(year === "None" && make === "None"){
            const getData = query(collection(db, "VehicleModel"),
                orderBy(sortFilter),
                endBefore(firstVisible),
                limitToLast(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else if(year !== "None" && make === "None") {
            const getData = query(collection(db, "VehicleModel"),
                where("Year", "==", parseInt(year)),
                orderBy(sortFilter),
                endBefore(firstVisible),
                limitToLast(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else if(year === "None" && make !== "None"){
            const getData = query(collection(db, "VehicleModel"),
                where("MakeId", "==", make),
                orderBy(sortFilter),
                endBefore(firstVisible),
                limitToLast(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else {
            const getData = query(collection(db, "VehicleModel"),
                where("MakeId", "==", make),
                where("Year", "==", parseInt(year)),
                orderBy(sortFilter),
                endBefore(firstVisible),
                limitToLast(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
       
    }
    getByIdAsync = async (id) => {
        const getModelById = db.collection("VehicleModel").doc(id);
        return await getDoc(getModelById);
    }
    updateAsync = async(data) => {
        const currModel = db.collection("VehicleModel").doc(data.docId);
        await currModel.update({
            Name : data.Name,
            Year : data.Year,
            MakeId : data.MakeId,
            MakeName : data.MakeName,
            Abrv : data.Abrv
        })
    }
    deleteAsync = async (id) => {
        const getModel = db.collection("VehicleModel").doc(id);
        await getModel.delete();
    }
}
export default new ModelService();
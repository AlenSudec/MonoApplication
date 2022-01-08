import db from "./firebase";
import { getDoc, where, query, collection, limit, getDocs, startAfter, endBefore, limitToLast, orderBy } from "firebase/firestore";

class MakeService {

    // getMakeAsync = async () => {
    //     const getData = db.collection("VehicleMake");
    //     return await getData.get();
    // }
    filterTest = async () => {
        const getData = query(collection(db, "VehicleMake"),
            where("Name", "==", "2223")
        );
        const dataSnap = await getDocs(getData);
        console.log(dataSnap);
    }

    //init pagination
    getMakeAsync = async (sortFilter, ascOrDesc) => {
        const getData = query(collection(db, "VehicleMake"), 
            orderBy(sortFilter, ascOrDesc),
            limit(5));
        const dataSnap = await getDocs(getData);
        return dataSnap;
    }
    //next page
    getMakeNextPageAsync = async (lastVisible, sortFilter) => {
        const getData = query(collection(db, "VehicleMake"),
            orderBy(sortFilter),
            startAfter(lastVisible),
            limit(5));
        const dataSnap = await getDocs(getData);
        return dataSnap;
    };
    //back page
    getMakeBackPageAsync = async (firstVisible, sortFilter) => {
        const getData = query(collection(db, "VehicleMake"),
            orderBy(sortFilter),
            endBefore(firstVisible),
            limitToLast(5)  
        );
        const dataSnap = await getDocs(getData);
        return dataSnap;
    }
    getMakeByIdAsync = async (id) => {
        const getMakeById = db.collection("VehicleMake").doc(id);
        return await getDoc(getMakeById);
    }
    createMakeAsync = async (data) => {
        await db.collection("VehicleMake").add({
            Name: data.Name,
            Abrv: data.Abrv
        }).then(docRef => {
            data.docId = docRef.id;
        })
        return await data;
    }
    deleteMakeASync = async (id) => {
        const getMake = db.collection("VehicleMake").doc(id);
        await getMake.delete();
    }
    updateMakeAsync = async (data) => {
        const currMake = db.collection("VehicleMake").doc(data.docId);
        await currMake.update({
            Name: data.Name,
            Abrv: data.Abrv,
        })
    }
}
export default new MakeService();
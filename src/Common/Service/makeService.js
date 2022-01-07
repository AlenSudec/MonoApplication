import db from "./firebase";
import { getDoc } from "firebase/firestore";

class MakeService {

    getMakeAsync = async () => {
        const getData = db.collection("VehicleMake");
        return await getData.get();
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
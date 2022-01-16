import db from "./firebase";
import { getDoc, where, query, collection, limit, getDocs, startAfter, endBefore, limitToLast, orderBy } from "firebase/firestore";

class MakeService {

    //check for models that have certain make
    checkModels = async (id) => {
        const getModels =  query(collection(db, "VehicleModel"),
            where("MakeId", "==", id)
        );
        const dataSnap = await getDocs(getModels);
        return dataSnap;
    }

    //init pagination
    getMakeAsync = async (sortFilter, ascOrDesc, revenue, country) => {
        if(country === "None" && revenue === "None"){
            const getData = query(collection(db, "VehicleMake"), 
                orderBy(sortFilter),
                limit(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else if(country !== "None" && revenue === "None"){
            const getData = query(collection(db, "VehicleMake"),
                where("Country", "==", country),
                orderBy(sortFilter),
                limit(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;

        }
        else if(country === "None" && revenue !== "None"){
            const getData = query(collection(db, "VehicleMake"),
                where("Revenue", ">", parseInt(revenue)),
                orderBy("Revenue"),
                limit(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else {
            const getData = query(collection(db, "VehicleMake"),
                where("Country", "==", country),
                where("Revenue", ">", parseInt(revenue)),
                orderBy("Revenue"),
                limit(5)
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
       
    }
    //next page
    getMakeNextPageAsync = async (lastVisible, sortFilter, revenue, country) => {
        if(country === "None" && revenue === "None"){
            const getData = query(collection(db, "VehicleMake"),
                orderBy(sortFilter),
                startAfter(lastVisible),
                limit(5));
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else if(country !== "None" && revenue === "None"){
            const getData = query(collection(db, "VehicleMake"),
                where("Country", "==", country),
                orderBy(sortFilter),
                startAfter(lastVisible),
                limit(5));
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else if(country === "None" && revenue !== "None"){
            const getData = query(collection(db, "VehicleMake"),
                where("Revenue", ">", parseInt(revenue)),
                orderBy("Revenue"),
                startAfter(lastVisible),
                limit(5));
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else {
            const getData = query(collection(db, "VehicleMake"),
                where("Country", "==", country),
                where("Revenue", ">", parseInt(revenue)),
                orderBy("Revenue"),
                startAfter(lastVisible),
                limit(5));
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
    };
    //back page
    getMakeBackPageAsync = async (firstVisible, sortFilter, revenue, country) => {
        if(country === "None" && revenue === "None"){
            const getData = query(collection(db, "VehicleMake"),
                orderBy(sortFilter),
                endBefore(firstVisible),
                limitToLast(5)  
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else if(country !== "None" && revenue === "None"){
            const getData = query(collection(db, "VehicleMake"),
                where("Country", "==", country),
                orderBy(sortFilter),
                endBefore(firstVisible),
                limitToLast(5)  
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else if(country === "None" && revenue !== "None"){
            const getData = query(collection(db, "VehicleMake"),
                where("Revenue", ">", parseInt(revenue)),
                orderBy("Revenue"),
                endBefore(firstVisible),
                limitToLast(5)  
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }
        else {
            const getData = query(collection(db, "VehicleMake"),
                where("Country", "==", country),
                where("Revenue", ">", parseInt(revenue)),
                orderBy("Revenue"),
                endBefore(firstVisible),
                limitToLast(5)  
            );
            const dataSnap = await getDocs(getData);
            return dataSnap;
        }

        
    }
    getMakeByIdAsync = async (id) => {
        const getMakeById = db.collection("VehicleMake").doc(id);
        return await getDoc(getMakeById);
    }
    createMakeAsync = async (data) => {
        const create = await db.collection("VehicleMake").add({
            Name: data.Name,
            Abrv: data.Abrv,
            Country: data.Country,
            Revenue: data.Revenue
        })
        data.docId = create.id;
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
            Country: data.Country,
            Revenue: data.Revenue
        })
    }
}
export default new MakeService();
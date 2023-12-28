import {initializeApp, cert} from 'firebase-admin/app'
import {getFirestore, } from "firebase-admin/firestore";

const app = initializeApp({
    credential: cert(),
}, 'defaultApp')

const db = getFirestore(app)

const toApp = initializeApp({
    credential: cert(),
}, 'secondaryApp')

const toDb = getFirestore(toApp)
export async function transferCollection(fromColRef, toColRef = null){
    const returnObject = {};
   (await fromColRef.get()).forEach( elem => {
        if (toColRef){
            toColRef.doc(elem.id).set(elem.data())
            console.log('set ' + elem.id)
        }
        returnObject[elem.id] = elem.data()
    })
    return returnObject;
}

transferCollection(db.collection('FleetDriveState'), toDb.collection('FleetDriveState')).then(res => {
    console.log(res)
})

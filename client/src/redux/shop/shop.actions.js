import ShopActionTypes from "./shop.types";
import { firestore,convertCollectionsSnapshotsToMap } from "../../firebase/firebase.utils";


export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
  });

//export const updateCollections=(collectionsMap)=>({
export const fetchCollectionsSuccess=collectionsMap=>({
    type:ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload:collectionsMap
})

export const fetchCollectionsFailure=errorMessage=>({
    type:ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload:errorMessage
})

//这次返回的不是actionProps，而是触发好几个actions
//且有了thunk，这里就可以放async func
export const fetchCollectionsStartAsync=()=>{
    return dispatch=>{
        const collectionRef=firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot=>{// only fire once
            const collectionsMap=convertCollectionsSnapshotsToMap(snapshot);//get collections from firebase
            dispatch(fetchCollectionsSuccess(collectionsMap));//put into reducer
        }).catch(error=>dispatch(fetchCollectionsFailure(error.message)));

    }
}


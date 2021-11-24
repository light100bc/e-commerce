//saga make it possible to run funcs concurrently

import {all,takeEvery,call,put,takeLatest} from 'redux-saga/effects';

import { firestore,convertCollectionsSnapshotsToMap } from "../../firebase/firebase.utils";
import {fetchCollectionsSuccess,fetchCollectionsFailure} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync(){ //use generator func instead of async，用generator func方法制造async效果
    yield console.log('I am fired');
    try{
        const collectionRef=firestore.collection('collections');
        const snapshot=yield collectionRef.get();//不用then来进行async，而用yield
        const collectionsMap=yield call(convertCollectionsSnapshotsToMap,snapshot);//yield让async可行。call？
        yield put(fetchCollectionsSuccess(collectionsMap));//saga不用dispatch而用put

    }catch(error){
        yield put(fetchCollectionsFailure(error.message));
    }


    //this code is from actions.js，convert it to the above code
    // return dispatch=>{
    //     const collectionRef=firestore.collection('collections');
    //     dispatch(fetchCollectionsStart());

    //     collectionRef.get().then(snapshot=>{// only fire once
    //         const collectionsMap=convertCollectionsSnapshotsToMap(snapshot);//get collections from firebase
    //         dispatch(fetchCollectionsSuccess(collectionsMap));//put into reducer
    //     }).catch(error=>dispatch(fetchCollectionsFailure(error.message)));
    // }
}

export function* fetchCollectionsStart(){
    yield takeLatest(//saga will pause whenever a specific action type comes in
    ShopActionTypes.FETCH_COLLECTIONS_START,//监听这个event，每次这个action dispatch to the reducer就执行
    fetchCollectionsAsync    
    );//这样以来，这个func里的yield可被next() call， 即使fetchCollectionAsync()没有做完。takeEvery就是这个作用？
    //如果fetchCollectionStart()在完成之前被call，那么可以control fetchCollectionAsync()是否重跑   
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)]);
}


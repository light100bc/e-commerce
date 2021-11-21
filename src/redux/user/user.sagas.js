import {takeLatest,put,call,all} from 'redux-saga/effects';

import UserActionTypes from './user.types';
import {signInSuccess,signInFailure,signOutSuccess,signOutFailure, signUpFailure, signUpSuccess} from './user.actions';

import {auth,googleProvider,createUserProfileDocument,getCurrentUser} from '../../firebase/firebase.utils';


export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
      const userRef = yield call(//把app.js里createUserProfileDocument放到这里。并用yield代替之前的async way。
        createUserProfileDocument,
        userAuth,
        additionalData
      );
      const userSnapshot = yield userRef.get();
      yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
      yield put(signInFailure(error));
    }
}
  
export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password); //便于debug，因为return不是obj。不用firebase.utils里的function，而是这里用call()
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInAfterSignUp({payload:{user,additionalData}}){
  yield getSnapshotFromUserAuth(user,additionalData);
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle)
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, 
        signInWithEmail)
}

export function* isUserAuthenticated(){
  //在firebase.utils再造一个函数，output currentuser
  try{
    const userAuth=yield getCurrentUser();
    if(!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);//再次登录时，如果firebase里检测已经登录，那么改state为当前user
  }catch(error){
    yield put(signInFailure(error));
  }
}


export function* onCheckUserSession(){
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated)
}

export function* signOut(){
  try{
    yield auth.signOut();
    yield put(signOutSuccess());
    }catch(error){
    yield put(signOutFailure(error));
  }
}

export function* onSignOutStart(){
  yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)
}

export function* signUp({payload:{displayName,email,password}}){
  try{
    const {user} = yield auth.createUserWithEmailAndPassword(email,password);
    yield put(signUpSuccess({user,additionalData:{displayName}}));
  }catch(error){
    yield put(signUpFailure(error));
  }
}

export function* onSignUpStart(){
  yield takeLatest(UserActionTypes.SIGN_UP_START,signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas(){
    yield all([call(onGoogleSignInStart),
      call(onEmailSignInStart),
      call(onCheckUserSession),
      call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)]);
}
import {all,call} from 'redux-saga/effects';

import {shopSagas} from './shop/shop.sagas';
import {userSagas} from './user/user.sagas';
import {cartSagas} from './cart/cart.sagas';

export default function* rootSata(){
    yield all([call(shopSagas),call(userSagas),call(cartSagas)]);//all() 输入an array of sagas. 这样可以concurrently同时跑所有sagas
    //类似takeEvery
}
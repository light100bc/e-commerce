import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { compose } from 'redux';

import {selectIsCollectionFetching} from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionOverview from './collection-overview.component';

//这个目的主要是StateToProps,不做render，仅仅pass props to 下一层
//shopComponent不管statetoprops，只管dispatchtoprops
//各自component管自己的读取state

const mapStateToProps=createStructuredSelector({
    isLoading:selectIsCollectionFetching
})

// const CollectionsOverviewContainer=connect(mapStateToProps)(WithSpinner(collectionOverview));//太长了，改为下面

export const CollectionsOverviewContainer=compose(
    connect(mapStateToProps),
    WithSpinner
    )(CollectionOverview);

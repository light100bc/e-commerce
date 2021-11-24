import React,{useEffect} from "react";
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

import {firestore,convertCollectionsSnapshotsToMap} from '../../firebase/firebase.utils';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';
import {selectIsCollectionFetching,selectIsCollectionsLoaded} from '../../redux/shop/shop.selector';

import {updateCollections} from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component.jsx';
import {CollectionsOverviewContainer} from '../../components/collection-overview/collection-overview.container';

// const CollectionOverviewWithSpinner=WithSpinner(CollectionOverview);//HOC pattern, input component, output component
const CollectionPageWithSpinner=WithSpinner(CollectionPage);

const ShopPage=({fetchCollectionsStart,match,isCollectionsLoaded})=>{ 

    useEffect(()=>{
        fetchCollectionsStart();
    },[fetchCollectionsStart]);

    // componentDidMount(){
    //     fetchCollectionsStart();
    // }

    return(
    <div className='shop-page'>
        
        {/* <Route exact path={`${match.path}`} render={(props)=><CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>}/> component={CollectionOverview} /> 185 use render not component to input */}
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/> {/*193 现在没有props了，是否spinner不在这一层判断，放入下一层用selector取*/}
        <Route exact path={`${match.path}/:collectionId`} render={(props)=><CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props}/>}/> {/*component={CollectionPage} />*/}
        
        {
        /*so if the url input is 3000/shop/[category]. it will goto Category Page 
        And the CategoryPage has a input: "match.paras.categoryId"*/}
    </div>
    );
}

const mapStateToProps=createStructuredSelector({
    isCollectionsLoaded:selectIsCollectionsLoaded
})

    
// const mapDispatchToProps=dispatch=>({
//     updateCollections:collectionsMap=>
//         dispatch(updateCollections(collectionsMap))

// });

//DidMount里面从firebase读取collection到redux，并放入state，的步骤被reuse-able
//这个步骤被放入shop.reducer。用thunk。这时dispatch(fetchCollectionsStartAsync())内部func把dispatch作为自动的arg1
const mapDispatchToProps=dispatch=>({
    fetchCollectionsStart:()=>dispatch(fetchCollectionsStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);
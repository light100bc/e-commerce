import React from "react";
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';


import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

import {firestore,convertCollectionsSnapshotsToMap} from '../../firebase/firebase.utils';

import {updateCollections} from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component.jsx';

const CollectionOverviewWithSpinner=WithSpinner(CollectionOverview);//HOC pattern, input component, output component
const CollectionPageWithSpinner=WithSpinner(CollectionPage);

class ShopPage extends React.Component{ 
    state={loading:true};

    unsubscribeFromSnapshot=null;

    //listener method
    // componentDidMount(){ //在didmount时获取state from firebase
    //     const {updateCollections}=this.props;
    //     const collectionRef=firestore.collection('collections');
    //     this.unsubscribeFromSnapshot=collectionRef.onSnapshot(async snapshot=>{//ecah time thec content changed will call it
    //         const collectionsMap=convertCollectionsSnapshotsToMap(snapshot);//get collections from firebase
    //         updateCollections(collectionsMap);//put collections into redux
    //         this.setState({loading:false});
    //     });   
    // }

    // Promise method
    componentDidMount(){
        const {updateCollections}=this.props;
        const collectionRef=firestore.collection('collections');
        collectionRef.get().then(snapshot=>{// only fire once
            const collectionsMap=convertCollectionsSnapshotsToMap(snapshot);//get collections from firebase
            updateCollections(collectionsMap);//put collections into redux
            this.setState({loading:false});
        })
    }

    //fetch method
    // componentDidMount(){
    //     const {updateCollections}=this.props;
    //     const collectionRef=firestore.collection('collections');
    //     fetch('https://firestore.googleapis.com/v1/projects/crwn-db-54ef6/databases/(default)/documents/collections')
    //     .then(response=>response.json())
    //     .then(collections=>console.log(collections)); //possible but nesty
    // }

    render(){
        const {match}=this.props;//match.path is the current path. match automaticlly pass to children in <Router>
        const {loading}=this.state;
        return(
            <div className='shop-page'>
                
                <Route exact path={`${match.path}`} render={(props)=><CollectionOverviewWithSpinner isLoading={loading} {...props}/>}/> {/*component={CollectionOverview} /> 185 use render not component to input*/}
                <Route exact path={`${match.path}/:collectionId`} render={(props)=><CollectionPageWithSpinner isLoading={loading} {...props}/>}/> {/*component={CollectionPage} />*/}
                
                {
                /*so if the url input is 3000/shop/[category]. it will goto Category Page 
                And the CategoryPage has a input: "match.paras.categoryId"*/}
            </div>
        );
    };
}
    
const mapDispatchToProps=dispatch=>({
    updateCollections:collectionsMap=>
        dispatch(updateCollections(collectionsMap))

});

export default connect(null,mapDispatchToProps)(ShopPage);
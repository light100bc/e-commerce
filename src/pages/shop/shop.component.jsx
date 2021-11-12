import React from "react";
import {Route,Switch} from 'react-router-dom';

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";


const ShopPage =({match})=>{ //match.path is the current path. match automaticlly pass to children in <Router>
    return(
        <div className='shop-page'>
            
            <Route exact path={`${match.path}`} component={CollectionOverview} />
            <Route exact path={`${match.path}/:collectionId`} component={CollectionPage} />
            
            {
            /*so if the url input is 3000/shop/[category]. it will goto Category Page 
            And the CategoryPage has a input: "match.paras.categoryId"*/}
        </div>
    );
};


export default ShopPage;
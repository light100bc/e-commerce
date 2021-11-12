import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionPreview from '../collection-preview/collection-preview.component';
import {selectCollectionsForPreview} from '../../redux/shop/shop.selector';

import './collection-overview.styles.scss';

const CollectionOverview=({collections})=>(
    <div className='class-overview'>
        {collections.map(({id,...otherCollecitonProps})=>(
            <CollectionPreview key={id} {...otherCollecitonProps}/>
        ))}
    </div>
)



const mapStateToProps=createStructuredSelector({
    collections:selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionOverview);
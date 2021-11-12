import React from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { connect } from 'react-redux';


import './collection.styles.scss';

import { selectCollection } from '../../redux/shop/shop.selector';

const CollectionPage=({collection})=>{
    const {items,title}=collection;
    
    return(
    <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {
                items.map(item=><CollectionItem key={item.id} item={item}/>)
            }
        </div>
    </div>
)}


//the second arg2 is used in this selector
const mapStateToProps=(state,ownProps)=>({
    collection:selectCollection(ownProps.match.params.collectionId)(state)
    //!!! selectCollection(ownProps.match.params.collectionId) return a function, 这个function需要state为输入（没有createStructedSelector时候的selector使用方法）。
    //格式记住，前一个是selector里用的para，后一个是本来就要的state param。因为没用createStructedsSelector所以要(state)。
})


export default connect(mapStateToProps)(CollectionPage);

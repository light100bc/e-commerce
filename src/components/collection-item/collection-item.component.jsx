import React from 'react';
import './collection-item.styles.scss';
import {connect} from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import {addItem} from '../../redux/cart/cart.actions';

// const CollectionItem=({id,name,imageUrl,price,addItem})=>{
const CollectionItem=({item,addItem})=>{ //126 addItem is a function(props given by connect()), item is the props pass by the parent
    const {name,price,imageUrl}=item;//126 usual pattern, distruct from the props
    return(
        <div className='collection-item'>
            <div className='image'
            style={{
                backgroundImage:`url(${imageUrl})`
            }}
            />
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <CustomButton onClick={()=>addItem(item)} inverted>Add to cart</CustomButton>
        </div>
    );
}

const mapDispatchToProps=dispatch=>{
    return(
        {
            addItem:item=>dispatch(addItem(item))
            //126 dispatch() pass the actionProps to the store and go through the reducer()
            //input is the first "item"
        }
    )
}

export default connect(null,mapDispatchToProps)(CollectionItem);
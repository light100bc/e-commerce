import React from "react";
import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component.jsx';

const CollectionPreview=({items,title})=>{
    return(
        <div className='collection-preview'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <div className='preview'>
                {/*every time component CollectionPreview rerender
                the func below called(item.filter().map())
                which can be slow*/}
                {items
                    .filter((item,idx)=>idx<4)
                    .map(({id,...otherItemProps})=>(
                    <CollectionItem key={id} {...otherItemProps} />
                ))}
            </div>
        </div>
    )
}

export default CollectionPreview;
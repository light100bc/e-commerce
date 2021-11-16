import { createSelector } from "reselect";

// const COLLECTION_ID_MAP={//map url collectionId which is a string, to the id which is a number
//     hats:1,
//     sneakers:2,
//     jackets:3,
//     womens:4,
//     mens:5
// }

const selectShop=state=>{
    return state.shop;}

export const selectCollections=createSelector(
    selectShop,
    shop=>shop.collections
)

export const selectCollectionsForPreview=createSelector(//convert obj into array for component use
    [selectCollections],
    collections=>collections? Object.keys(collections).map(key=>collections[key]) : []//把collections obj变为array
)


//before is directly create "createSelector",here is use func to return a created "createSelector"
//because we have a input collectionnUrlparam now
export const selectCollection=collectionUrlParam=>{
    return(
        createSelector(
            selectCollections,
            collections=>collections? collections[collectionUrlParam]:null
                // collections.find(collection=>collection.id===COLLECTION_ID_MAP[collectionUrlParam])
                
        )
    )
}

import React from 'react'
import './menu-item.style.scss'
import {withRouter} from 'react-router-dom';
// import {
//     useLocation,
//     useNavigate,
//     useParams
//   } from "react-router-dom";

// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let location = useLocation();
//         let navigate = useNavigate();
//         let params = useParams();
//         return (
//         <Component
//             {...props}
//             router={{ location, navigate, params }}
//         />
//         );
//     }

//     return ComponentWithRouterProp;
// }


const MenuItem=({title,imageUrl,size,history,match,linkUrl})=>{
    return(
        <div className={`${size} menu-item`}
        onClick={()=>history.push(`${match.url}${linkUrl}`)}
        >
            <div className='background-image' 
            style={{backgroundImage:`url(${imageUrl})`}} 
            /> 
            <div className='content'>
                <h1 className='title'>{title.toUpperCase()}</h1>
                <span className='subtitle'>shop now</span>
            </div>
        </div>
    )
}

export default withRouter(MenuItem);
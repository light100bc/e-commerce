import React from 'react';

import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';
//import svg as ReactComponent

const Header=({currentUser,hidden})=>{
    return(
        <div className='header'>
            <Link className='logo-container' to="/">
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                SHOP
                </Link>
                <Link className='option' to='/contact'>
                CONTACT
                </Link>
                {
                    currentUser?
                    <div className='option' onClick={()=>auth.signOut()}>
                        SIGN OUT</div>
                    :
                    <Link className='option' to='/signin'>
                        SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {hidden? null:<CartDropdown/>}
            {/*dropdown box is shown depend on the boolean, user reducer! change state. 
            Because we may have other method to open dropdown in the future*/}
        </div>
    );
}

//this is the function allow us to access the state
//set some state attri of current component equals the one from the root reducer
//return an StateProps obj,

// const mapStateToProps=(state)=>({//state is the root reducer, the state.user is the user reducer,
//     currentUser:state.user.currentUser
// });

const mapStateToProps=({user:{currentUser},cart:{hidden}})=>({//state is the root reducer, the state.user is the user reducer,
    currentUser,
    hidden
});

export default connect(mapStateToProps)(Header);
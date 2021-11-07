import React from 'react';
import './header.styles.scss';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import {auth} from '../../firebase/firebase.utils';
//import svg as ReactComponent

const Header=({currentUser})=>{
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
            </div>
        </div>
    );
}

//this is the function allow us to access the state
//set some state attri of current component equals the one from the root reducer
//return an StateProps obj,
const mapStateToProps=(state)=>({//state is the root reducer, the state.user is the user reducer,
    currentUser:state.user.currentUser
});

export default connect(mapStateToProps)(Header);
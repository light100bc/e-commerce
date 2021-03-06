import React from 'react';

// import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {signOutStart} from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assets/crown.svg';
// import './header.styles.scss';
import {HeaderContainer,
    LogoContainer,
    OptionsContainer,
    // OptionDiv,
    OptionLink} from './hearer.styles.jsx';
//import svg as ReactComponent

const Header=({currentUser,hidden,signOutStart})=>{
    return(
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className='logo' />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>
                SHOP
                </OptionLink>
                <OptionLink to='/contact'>
                CONTACT
                </OptionLink>
                {
                    currentUser?
                    <OptionLink as='div' onClick={signOutStart}> {/*转化为div*/}
                        SIGN OUT</OptionLink>
                    :
                    <OptionLink to='/signin'>
                        SIGN IN</OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {hidden? null:<CartDropdown/>}
            {/*dropdown box is shown depend on the boolean, user reducer! change state. 
            Because we may have other method to open dropdown in the future*/}
        </HeaderContainer>
    );
}



const mapStateToProps=createStructuredSelector({//crateStructuredSelector,reduce
        currentUser:selectCurrentUser,
        hidden:selectCartHidden
});
    
const mapDispatchToProps=dispatch=>({
    signOutStart:()=>dispatch(signOutStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../images/avatar.png'
import logo from '../../images/chili-logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from '../../redux/actions/userActions';
const Navbar = () => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => {
        return state.user.loggedInUser?.[0];
    });
    const cartItems = useSelector((state) => {
        return state.foods.cartItems;
    });
    const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click);
    }

    const closeMobileMenu = () => {
        setClick(false);
    }
    const signOut = () => {
        dispatch(setLoggedInUser({}));
        sessionStorage.removeItem('user');
    }


    return (
        <div className="navbar-container">
            <nav className="navbar">
                <NavLink to="/home" className="navbar-logo">
                    <span><img src={logo} alt="" /></span> <span>Hot Chilies</span>
                </NavLink>

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item desktop">
                        <Link to="/orders" className="nav-links " onClick={closeMobileMenu}><FontAwesomeIcon icon={faShoppingCart} />{cartItems?.length > 0 && <span className="cart-counter">{cartItems?.length}</span>}</Link>
                    </li>
                    {
                        loggedInUser?.name &&
                        <>
                            <li className="nav-item ">
                                <img src={avatar} alt="" />
                            </li>
                            <li className="nav-item user-name">
                                {loggedInUser?.name}
                            </li>
                        </>
                    }

                    {
                        loggedInUser?.email ? <li className="nav-item" onClick={signOut}> <Link to='' className="nav-links-mobile" onClick={closeMobileMenu}>Log Out</Link>  </li> : <li className="nav-item"> <Link to="/login" className="nav-links-mobile" onClick={closeMobileMenu}>Log In</Link>  </li>
                    }
                    <li className="nav-item">
                        {
                            !loggedInUser?.email ? <Link to="/login">
                                <button className="btn-nav">Log In</button>
                            </Link> :

                                <button onClick={signOut} className="btn-nav">Log Out</button>


                        }
                    </li>
                </ul>

                <div className="menu-icon" >
                    <li className="nav-item">
                        <Link to="/orders" className="" ><FontAwesomeIcon icon={faShoppingCart} />{cartItems?.length > 0 && <span className="cart-counter">{cartItems?.length}</span>}</Link>
                    </li>
                    <FontAwesomeIcon onClick={handleClick} icon={click ? faTimes : faBars} />
                </div>

            </nav>
        </div>
    );
};

export default Navbar;
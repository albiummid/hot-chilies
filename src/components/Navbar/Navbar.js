import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../App';
import avatar from '../../images/avatar.png'
import logo from '../../images/chili-logo.png'
const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [,,cartItems, setCartItems] = useContext(UserContext);

    const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click);
    }

    const closeMobileMenu = () => {
        setClick(false);
    }
    const signOut = () => {
        setLoggedInUser({});
    }


    return (
        <div>
            <nav className="navbar">
                <NavLink to="/home" className="navbar-logo">
                    <span><img src={logo} alt=""/></span> <span>Hot Chilies</span>
                </NavLink>
                <div className="menu-icon" onClick={handleClick}>
                    <FontAwesomeIcon icon={click ? faTimes : faBars} />
                </div>
                <div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to="/" className="nav-links" onClick={closeMobileMenu}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/orders" className="nav-links" onClick={closeMobileMenu}><FontAwesomeIcon icon={faShoppingCart} />{cartItems.length > 0 && <span className="cart-counter">{cartItems.length}</span> }</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin" className="nav-links" onClick={closeMobileMenu}>Admin</Link>
                        </li>
                        {
                            loggedInUser.name &&
                            <li className="nav-item user-name">
                                {loggedInUser.name}
                            </li>
                            
                        }
                        {
                            loggedInUser.name &&
                            <li className="nav-item ">
                                <img src={avatar} alt=""/>
                            </li>
                            
                        }


                        {
                            loggedInUser.email ? <li className="nav-item" onClick={signOut}> <Link className="nav-links-mobile" onClick={closeMobileMenu}>Log Out</Link>  </li> : <li className="nav-item"> <Link to="/login" className="nav-links-mobile" onClick={closeMobileMenu}>Log In</Link>  </li>
                        }
                        <li className="nav-item">
                            {
                                !loggedInUser.email ? <Link to="/login">
                                    <button className="btn-nav">Log In</button>
                                </Link> :

                                    <button onClick={signOut} className="btn-nav">Log Out</button>


                            }
                        </li>
                    </ul>

                </div>

            </nav>
        </div>
    );
};

export default Navbar;
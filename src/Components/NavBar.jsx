import React, { useState } from 'react';
import '../App.css';
import { ReactComponent as menuIcon} from '../assets/hamburger-menu-svgrepo-com.svg'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleNavbar = () => {
        const navOpen = isOpen === true ? false : true;
        setIsOpen(navOpen);
        console.log(isOpen);
    };

    console.log(isOpen)

    return (
        <nav className="navbar">
            <div className="navbar-brand">ChiTech Couture</div>

            {/*<button style={{ color: 'purple', padding: '1vw 2vw', borderRadius: "5%"}} onClick={() => toggleNavbar()}>*/}
            {/*    Menu*/}
            {/*</button>*/}

            <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#events">Upcoming Events</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;

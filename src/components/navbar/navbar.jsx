import React, { Component } from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {

    render() {
        return (
            <nav>
                <div>
                    <NavLink to="/home" 
                    activeStyle={{ color: 'red' }}>Home</NavLink>
                </div>
                {/* <div>
                    <NavLink to="/users" 
                    activeStyle={{ color: 'red' }}>Users</NavLink>
                </div>
                <div>
                    <NavLink to="/about" 
                    activeStyle={{ color: 'red' }}>About</NavLink>
                </div>
                <div>
                    <NavLink to="/contact" 
                    activeStyle={{ color: 'red' }}>Contact</NavLink>
                </div> */}
                <div>
                    <NavLink to="/blog" 
                    activeStyle={{ color: 'red' }}>Blog</NavLink>
                </div>
            </nav>
        );
    }

}

export default Navbar;
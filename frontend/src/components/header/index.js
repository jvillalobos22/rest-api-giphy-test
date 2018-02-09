import React from 'react';
import logo from '../../img/eaze_logo.png';
import { Link } from 'react-router-dom'
import './index.css'

const Header = () => (
    <header className="app-header">
        <div className="container">
            <div className="flex-container">
                <Link to="/">
                    <img src={logo} className="eaze-logo" alt="logo" />
                    <h1 className="app-title">WP Rest API Client</h1>
                </Link>
            </div>
        </div>
    </header>
)

export default Header

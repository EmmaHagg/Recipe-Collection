import React from "react";
import "../App.css";
import {Link} from "react-router-dom";

function Nav() {
    
    return(
        <nav>
            <h3>The Recipe store</h3>
            <ul className="nav-links">
                <Link to='/'>
                <li>Recipe</li>
                </Link>
                <Link to='/list'>
                <li>List</li>
                </Link>
                <Link to='/chat'>
                <li>Chat</li>
                </Link>
            </ul>

        </nav>
    )
  }
  export default Nav;
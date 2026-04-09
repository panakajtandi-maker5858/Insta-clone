import React from 'react'
import { Link } from 'react-router'
import "../nav.scss"

const Nav = () => {
    return (
        <nav>
            <h1>InstaClone</h1>
            <div className="links">
                <Link to="/">Feed</Link>
                <Link to="/create-post"> Create Post</Link>
            </div>
        </nav>
    )
}

export default Nav
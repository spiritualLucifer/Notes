import React from 'react'
import {
    useLocation,
    Link,
    useNavigate
} from "react-router-dom";
function Navbar() {
    let location = useLocation();
    let history =useNavigate();
    let hadleClick =()=>{
        localStorage.removeItem('token');
        history('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">NoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location==='/about'?"active":""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<div className='conatiner d-flex mx-3'>
                        <Link type="button" className="btn btn-outline-success" to="/login"role='button'>Login</Link>
                        <Link type="button" className="btn btn-outline-secondary" to="/signup"role='button'>Sign-Up</Link>
                        </div>:<button className="btn btn-outline-success" onClick={hadleClick}>Log-Out</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
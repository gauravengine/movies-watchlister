import React, { useState } from 'react'
import {Outlet,Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Navbar_f() {
    const [currSearchString,setcurrSearchString]=useState('');
    const navigate=useNavigate();
    const submitHandler=(e)=>{
        e.preventDefault();
        
        navigate('/searchnew',{state: {searchString :currSearchString}});
    };

    const searchHandler=(e)=>{
        // this.setState({
        //     currSearchString:e.target.value,
        // },()=>console.log(this.state.currSearchString));
        setcurrSearchString(e.target.value);

    }
    return (
        <div >
            {/*<nav className='navbar-top '>*/}
            {/*<h1 className='navbar-header text-decoration-none'><Link to ='/' className='text-decoration-none'>Movies App</Link></h1>*/}
            {/*<h2 className='navbar-secondary text-decoration-none'><Link to='/favorites' className='text-decoration-none'>Favorites</Link></h2>*/}
            {/*</nav>*/}
            <nav className="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme="dark">
                <div className="container-fluid ">
                    {/*<a className="navbar-brand" ><Link to={'/'}>Wacthlister</a>*/}
                    <Link to={'/'} className={'navbar-brand'}>Watchlister</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/*<a className="nav-link active" aria-current="page" href="#">Home</a>*/}
                                <Link to={'/'} className={'nav-link'}>Home</Link>
                            </li>
                            <li className="nav-item">
                                {/*<a className="nav-link" href="#">Your Watchlist</a>*/}
                                <Link to={'/watchlist'} className={'nav-link'}>Your Watchlist</Link>
                            </li>


                        </ul>
                        <form className="d-flex" role="search" onSubmit={(e)=>submitHandler(e)}>
                            <input onChange={(e)=>searchHandler(e)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                {/*<button onClick={(e)=>this.submitHandler(e)} className="btn btn-outline-success" type="submit">Search</button>*/}
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            <Outlet/>
        </div>
    )
}

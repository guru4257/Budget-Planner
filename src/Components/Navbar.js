import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const MainNavbar = () => {


  const logOut = ()=>{

     axios.get("http://localhost:5000/logout",{withCredentials:true}).then((res)=>{
        
          if(res.data.Success){
              
              localStorage.removeItem('isAuth');
              localStorage.removeItem('username');
              localStorage.removeItem('user_id');
          }else{

            window.alert(res.data.Message);
          }
     }).catch((err)=>{
        
         window.alert(err.response.data.Message);
     })
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="collapse navbar-collapse  " id="navbarText">
        <Link class="navbar-brand" to="/">
          BUDGET
        </Link>
        <ul className="navbar-nav nav ml-auto" style={{ marginRight: "9%" }}>
          {localStorage.getItem("isAuth") && (
            <li className="nav-item active px-3">
              <Link className="nav-link" to="/home">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
          )}
          {localStorage.getItem("isAuth") ? (
            <li className="nav-item px-3" style={{ marginTop: "1%" }}>
              <Link to="/">
                <button type="button" onClick={logOut} class="btn btn-light btn-sm">
                  Log Out
                </button>
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item px-3">
                <Link className="nav-link" to="/">
                  LogIn
                </Link>
              </li>
              <li className="nav-item px-3" style={{ marginTop: "1%" }}>
                <Link to="/signup">
                  <button type="button" class="btn btn-light btn-sm">
                    SignUp
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <button
        class="navbar-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
  );
};

export default MainNavbar;

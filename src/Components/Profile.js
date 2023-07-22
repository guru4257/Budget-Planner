import React from "react";
import "../App.css";

const Profile = ()=>{

    return(
        <div className="card">

        <div className="upper">

          <img src="https://i.imgur.com/Qtrsrk5.jpg" className="img-fluid"/>
          
        </div>

        <div className="user text-center">

          <div className="profile">

            <img src="user.png" className="rounded-circle" width="80"/>
            
          </div>

        </div>


        <div className="mt-5 text-center">

          <h4 className="mb-0">{localStorage.getItem('username')}</h4>

          <div className="d-flex justify-content-between align-items-center mt-4 px-4">
            <div className="stats">
              <h6 className="mb-0">SALARY</h6>
              <span>8,797</span>

            </div>


            <div class="stats">
              <h6 class="mb-0">BALANCE</h6>
              <span>142</span>
            </div>
            
          </div>
          
        </div>
         
       </div>
    );
}

export default Profile;
import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = ()=>{

    const[user,setUser] = useState({
        Username:'',
        Password :'',
        Mobile :'',
        Email :'',
        Location :'',
        MonthlySalary :''
    })

    const navigate = useNavigate();
    const onHandleChange = (event)=>{

        const{name,value} = event.target;
        setUser({...user,[name]:value});
    }

    const onHandleSubmit = (event)=>{
        event.preventDefault();
        console.log(user);
        // post request for server to signup
        axios.post("http://localhost:5000/signup",user,{withCredentials:true}).then((res)=>{
                
                if(res.data.Success){
                    localStorage.setItem('isAuth',true);
                    localStorage.setItem('username',res.data.username);
                    localStorage.setItem('user_id',res.data._id);
                    window.alert(res.data.Message);
                    navigate('/');
                }else{
                    window.alert(res.data.Message);
                    return;
                }
        }).catch((err)=>{
            window.alert(err.response.data.Message);
            return;
        });
        setUser({
            Username:'',
            Password :'',
            Mobile :'',
            Email :'',
            Location :'',
            MonthlySalary :''
        });
    }
    return(
        <div class="wrapper fadeInDown" >
        <div id="formContent" >     
          <h1>SIGN UP</h1>
          <form onSubmit={onHandleSubmit}>
            <input type="text" id="login"  className="fadeIn second" name="Username" value={user.Username} onChange={onHandleChange} placeholder="login"/>
            <input type="password" id="password" className="fadeIn third" name="Password" value={user.Password} onChange={onHandleChange} placeholder="password"/>
            <input type="email" id="email" className="fadeIn third" name="Email" value={user.Email} onChange={onHandleChange} placeholder="Email ID"/>
            <input type="text" id="mobile" className="fadeIn third" name="Mobile" value={user.Mobile} onChange={onHandleChange} placeholder="Mobile No"/>
            <input type="text" id="location" className="fadeIn third" name="Location" value={user.Location} onChange={onHandleChange} placeholder="Location"/>
            <input type="number" id="monthlysalary" className="fadeIn third" name="MonthlySalary" value={user.MonthlySalary} onChange={onHandleChange} placeholder="Monthly Salary"/>
            <input type="submit" className="fadeIn fourth" value="Sign Up"/>
          </form>
          <div id="formFooter">
            <span>Already have an Account ? <Link to='/'>Log In</Link></span>
          </div>
      
        </div>
      </div>
    );
}

export default SignUp;
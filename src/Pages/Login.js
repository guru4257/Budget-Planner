import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";

const Login = ()=>{

    const[user,setUser] = useState({
        Username:'',
        Password :''
    })

    const navigate = useNavigate();
    const onHandleChange = (event)=>{

        const{name,value} = event.target;
        setUser({...user,[name]:value});
    }

    const onHandleSubmit = (event)=>{
        event.preventDefault();
        console.log(user);
        // post request for server to login
        axios.post("http://localhost:5000/login",user,{withCredentials:true}).then((res)=>{
                
                if(res.data.Success){
                    localStorage.setItem('isAuth',true);
                    localStorage.setItem('username',res.data.username);
                    localStorage.setItem('user_id',res.data._id);
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
            Password :''
        });
    }
    return(
        <div class="wrapper fadeInDown" >
        <div id="formContent" >     
          <h1>LOG IN</h1>
          <form onSubmit={onHandleSubmit}>
            <input type="text" id="login"  className="fadeIn second" name="Username" value={user.Username} onChange={onHandleChange} placeholder="login"/>
            <input type="password" id="password" className="fadeIn third" name="Password" value={user.Password} onChange={onHandleChange} placeholder="password"/>
            <input type="submit" className="fadeIn fourth" value="Log In"/>
          </form>
          <div id="formFooter">
          <span className="underlinedhover">Don't have an Account ? <Link to='/signup'>Sign Up</Link></span>
          </div>
      
        </div>
      </div>
    );
}

export default Login;
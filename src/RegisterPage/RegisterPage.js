import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import LoginPage from '../LoginPage/LoginPage';
import Menu from '../Menu/Menu';
import Hero from '../Hero/Hero';
import Footer from '../Footer/Footer'

import {
  BrowserRouter as Router,

} from "react-router-dom";

function RegisterPage() {


    function register() {
        const data = {
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
        };
        console.log(data);
        axios.post("http://localhost:3001/api/signup", data).then((res)=>{

        console.log(res.data);
          if(res.data===200){
            console.log(res.data);
            ReactDOM.render(

              <Router>
              <Menu/>
              <Hero/>
              <div className="mainContainer">
            <LoginPage/>
              </div>
              <Footer/>
            </Router>,
              document.getElementById('root')
            );
           

          }else{
            document.getElementById("errorSpot").innerHTML = "response not received from server"
          }

        })
      }




  return (
    <div className="container center">
    <div className="page-area">

    <h1 className="row">Register</h1>

    <main>
      <div className="row">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
      </div>

      <div className="row">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <div>
        <button onClick={register}>Register</button>
      </div>

      <div>
        <p id="errorSpot"></p>
      </div>

    </main>
  </div>
</div>
  );
}

export default RegisterPage;

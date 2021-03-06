import React, {useRef} from 'react';
import axios from 'axios';
import Menu from '../Menu/Menu';
import Hero from '../Hero/Hero';
import Footer from '../Footer/Footer'
import DashboardPage from '../DashboardPage/DashboardPage'
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,

} from "react-router-dom";

function LoginPage() {


    function login() {
        const data = {
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
        };
        console.log(data);
        axios.post("http://localhost:3001/api/login", data).then((res)=>{

        console.log(res.data);
          if(res.data===200){
            console.log(res.data);

            ReactDOM.render(

              <Router>
              <Menu/>
              <Hero/>
              <div className="mainContainer">
            <DashboardPage/>
              </div>
              <Footer/>
            </Router>,
              document.getElementById('root')
            );
            //call user data page and pass in username as parameter so it can load correct data
            //probably need to set username as foreign key for budget data in SQL server
            //Do I need to set the userData page as a class and pass in username to that? or use an onLoad function and pass the username there


          }else if(res.data===403){
            document.getElementById("errorSpot").innerHTML = "Incorrect username or password";
          }else{
            document.getElementById("errorSpot").innerHTML = "Something went wrong!";
          }

        })
      }




  return (
    <div className="container center">
    <div className="page-area">

    <h1 className="row">Login</h1>

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
        <button onClick={login}>Login</button>
      </div>

      <div>
        <p id="errorSpot"></p>
      </div>

    </main>
  </div>
</div>
  );
}

export default LoginPage;
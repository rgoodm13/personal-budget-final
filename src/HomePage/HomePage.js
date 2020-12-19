import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';

function HomePage() {

    var dataSource = {
        datasets: [
            {
                data: [],
                backgroundColor:[],
            }
            
                    ],
    labels: []
    };

    function createChart() {
        var ctx = document.getElementById("myChart").getContext("2d");
        var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: dataSource
        }); 
     }
    
     function getBudget() {
         axios.get('http://localhost:3001/budget')
         .then(function (res){
             console.log(res.data);
             for(var i=0; i < res.data.myBudget.length; i++){
                 dataSource.datasets[0].data[i] =res.data.myBudget[i].budget;
                 dataSource.labels[i] = res.data.myBudget[i].title;
             }
             createChart();
         });
     }
     getBudget();



  return (
    <main className="center" id="main">

        <div className="page-area">

            <article>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article>
                <h1>Secure</h1>
                <p>
                Your security is important to us! All user data is protected behind various layers of security constantly updated by our team.
                </p>
            </article>
    
            <article>
                <h1>Free</h1>
                <p>
                This app is designed to help you manage your money! not put you in extra debt!
                </p>
            </article>
    
            <article>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article>
                <h1>Results</h1>
                <p>
                People who use it love it!
                </p>
                <img id="reviewpic" src="/reviews1.PNG" alt="yelp screenshot"></img>
            </article>
    
            <article>
                <h1>Chart</h1>
                <p>
                    <canvas id="myChart" width="400" height="400"></canvas>
                </p>
            </article>

        </div>

    </main>
  );
}

export default HomePage;

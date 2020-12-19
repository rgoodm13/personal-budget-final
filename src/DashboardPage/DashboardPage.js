import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';

function DashboardPage() {

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
         axios.get('http://localhost:3001/api/userBudg')
         .then(function (res){
             console.log(res.data);
             for(var i=0; i < res.data.length; i++){
                dataSource.datasets[0].backgroundColor[i] = res.data[i].color;
                dataSource.datasets[0].data[i] = res.data[i].budget;
                dataSource.labels[i] = res.data[i].title;
             }
             createChart();
         });
     }

     getBudget();

     function AddData() {
        const data = {
          title: document.getElementById("title").value,
          budget: document.getElementById("budget").value,
          color: document.getElementById("color").value
        };
        console.log(data);
        axios.post("http://localhost:3001/api/addData", data).then((res)=>{

            if(res.data===200){
                getBudget();
            }
            else{
                alert("failed to add");
            }

     

        })
      }



  return (
    <main className="center" id="main">

        <div className="page-area">
    
            <article>
                <h1>Build A Budget</h1>
                <div className="row">
                <label htmlFor="title">title</label>
                <input type="text" name="title" id="title" />
                </div>

                <div className="row">
                <label htmlFor="budget">budget</label>
                <input type="text" name="budget" id="budget" />
                </div>

                <div className="row">
                <label htmlFor="color">color</label>
                <input type="text" name="color" id="color" />
                </div>
                <div className="row">
                <button onClick={AddData} >Add Category</button>
                </div>
                
                
               
            </article>
    
            <article>
                <h1>Your Budget</h1>
                <p>
                    <canvas id="myChart" width="400" height="400"></canvas>
                </p>
            </article>

        </div>

    </main>
  );
}

export default DashboardPage;

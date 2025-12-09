/* JSON Demonstration Using COVID-19 Data
   Populate HTML by dynamically adding rows
 */

  
  async function getData() {

      // define arrays to store data
      const state = [];
      const positive = [];
      const hospitalizedCurrently = [];
      // const tbodyEl = document.querySelector('tbody');  // Select the tbody element
      // querySelector retrieves an element using any valid CSS selector (class, id, tag, etc.)
        // Return a static node list which supports array methods (ex: forEach)
        // Newer method compared to getElementById()
        // Always grab the first element that meets the criteria
      
      // getElementById only selects element by id.
      // getElementById() returns an HTML collection that changes as the DOM (Document Object Model) changes

      const data = await fetch('covid19.json') // fetch data
          .then(data => data.json())
          .then(data => {
              console.log(data);

              // push JSON data to JS arrays & display in a table
              for(let i = 0; i < data.length; i++) {
                  state.push(data[i].state);
                  positive.push(data[i].positive);
                  hospitalizedCurrently.push(data[i].hospitalizedCurrently);
                  console.log(state[i], positive[i], hospitalizedCurrently[i]);
                  // Dynamically generate the html table (add rows via string interpolation)
                  /*
                  tbodyEl.innerHTML += `
                    <tr>
                      <td class = "state">${state[i]}</td>
                      <td class = "positive">${positive[i]}</td>
                    </tr>
                  `
                  */
                  }
          })
        const sumPositives = positive.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const avgPositives = sumPositives / positive.length;
        document.getElementById('avg-cases').innerHTML = Math.round(avgPositives).toLocaleString();

        const sumHospitalized = hospitalizedCurrently.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const avgHospitalized = sumHospitalized / hospitalizedCurrently.length;
        document.getElementById('avg-hospitalized').innerHTML = Math.round(avgHospitalized).toLocaleString();

        return {state, positive}; // return data for chart

  }

async function createChart() {
  const data =  await getData();  // wait for getData() to finish and return data for chart   
  const lineChart = document.getElementById('lineChart');     // Get the html element that will hold the chart
      
  const myChart = new Chart(lineChart, {  // Construct the chart    
      type: 'line',
      data: {                         // Define data
          labels: data.state,        // x-axis labels
          datasets: [                 // Each object describes one dataset of y-values
                                      //  including display properties.  To add more datasets, 
                                      //  place a comma after the closing curly brace of the last
                                      //  data set object and add another dataset object. 
              {
                  label:    'Positive Cases',     // Dataset label for legend
                  data:     data.positive,    // Reference to array of y-values
                  fill:     false,           // Fill area under the linechart (true = yes, false = no)
                  backgroundColor:  'rgba(255, 0, 132, 0.2)',    // Color for data marker
                  borderColor:      'purple',      // Color for data marker border
                  borderWidth:      2,   // Data marker border width
                  tension: 0.25               // Line tension (0 = straight line, 1 = curvy line)
              },
      ]
      },
      options: {                        // Define display chart display options 
          responsive: true,             // Re-size based on screen size
          maintainAspectRatio: false,
          scales: {                     // Display options for x & y axes
              x: {                      // x-axis properties
                  title: {
                      display: true,
                      text: 'State',     // x-axis title
                      font: {                   // font properties
                          size: 14,
                          family: 'Times New-Roman'
                      },
                      color: '#000000'
                  },
                  ticks: {                      // x-axis tick mark properties
                  min: 0,                     // starting value      
                  font: {
                      size: 14,
                      family: 'Times New-Roman'
                  },
                  color: '#000000'
                  },
                  grid: {                       // x-axis grid properties
                      color: '#6c767e'
                  }
              },
              y: {                              // y-axis properties
                  title: {
                      display: true,
                      text: 'Positive Cases',     // y-axis title
                      font: {
                          size: 14,
                          family: 'Times New-Roman'
                      },
                      color: '#000000'
                  },
                  ticks: {
                      min: 0,                   
                      maxTicksLimit: 20,        // Actual value can be set dynamically
                      font: {
                          size: 12,
                          family: 'Times New-Roman'
                      },
                      color: '#000000'
                  },
                  grid: {                       // y-axis gridlines
                      color: '#6c767e'
                  }
              }
          },
          plugins: {                  // Display options for title and legend
              title: {
                  display: true,
                  text: 'Positive COVID-19 Cases by State',
                  font: {
                      size: 24,
                      family: 'Times New-Roman'
                  },
                  color: '#black',
                  padding: {
                      top: 10,
                      bottom: 30
                  }
              },
              legend: {
                  align: 'center',
                  display: true,
                  position: 'top',
                  
                  labels: {
                      font: {
                          size: 14,
                          family: 'Times New-Roman'
                      },
                      color: '#000000'
                  }
              }
          }
      }       
  });
  

}
createChart();

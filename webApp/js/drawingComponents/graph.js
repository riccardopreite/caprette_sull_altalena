var lineColor =  "#4bc0c0"
var fontColor = "rgb(181,181,181)"

class Graph {
  constructor(ctx,label,yLabel,xLabel,popupValue) {
      this.ctx = ctx
      this.chart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            data: [],
            label:popupValue,
            pointBackgroundColor: lineColor,
            pointRadius: 1,
            borderColor: lineColor,
            borderWidth: 0.4
          }]
        },
        // plugins: {
        //   zoom: {
        //     pan: {
        //       enabled: false,
        //       mode: 'xy',
        //     },
        //     zoom: {
        //       enabled: true,
        //       mode: 'xy',
        //     }
        //   }
        // },
        options: {
          title: {
            display: true,
            text: label,
            fontColor: fontColor,
            fontSize: 13
          },
          legend: {
              display: false,
          },
          scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: yLabel,
                  fontColor: fontColor
                },
                ticks: {
                    fontColor: fontColor,
                    fontSize: 10,
                    stepSize: 1,
                    beginAtZero: true
                }
              }],
              xAxes: [{
                type: 'linear',
                position: 'bottom',
                scaleLabel: {
                  display: true,
                  labelString: xLabel,
                  fontColor: fontColor

                },
                ticks: {
                    fontColor: fontColor,
                    fontSize: 10,
                    stepSize: 0.1,
                    beginAtZero: true
                }
            }]
          }
        }
      });
      this.chart.update();
  }

  /**
   *
   * @param {int} label: x axys value
   * @returns {int} data: y axys value
   * coordiantes
   */
   addPoint(label,data){
     if(!label){
       this.chart = new Chart(this.ctx, {
         type: 'line',
         data: {
           labels: [],
           datasets: [{
             label:"Score average",
             pointBackgroundColor: lineColor,
             pointRadius: 1,
             borderColor: lineColor,
             borderWidth: 0.4
            }]
         },
         options: {
           title: {
             display: true,
             text: "Score Avg graph",
             fontColor: fontColor,
             fontSize: 13
           },
           legend: {
               display: false,
           },
           scales: {
               x: {
                 grid: {
                    offset: true
                 }
               },
               yAxes: [{
                 scaleLabel: {
                   display: true,
                   labelString: "Score AVG",
                   fontColor: fontColor
                 },
                 ticks: {
                     fontColor: fontColor,
                     fontSize: 10,
                     stepSize: 500,
                     beginAtZero: true,
                     min: 1500
                 }
               }],
               xAxes: [{
                 type: 'linear',
                 position: 'bottom',
                 scaleLabel: {
                   display: true,
                   labelString: "Generation",
                   fontColor: fontColor
                 },
                 ticks: {
                     fontColor: fontColor,
                     fontSize: 10,
                     stepSize: 1,
                     beginAtZero: true,
                     min: 0,
                     max: 150
                 }
             }]
           }
         }
       });
     }
     this.chart.data.datasets.forEach((dataset) => {
       let tmp = {"x":label,"y":data}
       dataset.data.push(tmp);
     });
     this.chart.update();
   }
  addScatterPoint(label,data){
    // this.chart.data.labels.push(label);
    this.chart.data.datasets.forEach((dataset) => {
      let tmp = {"x":label,"y":data}
      dataset.data.push(tmp);
    });
    this.chart.update();
  }

  /**
   *
   * @param {int} labels: x axys Vector
   * @returns {int} data: y axys Vector
   * coordiantes
   */
  plotGraph(label,data){
    this.chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: label,
        datasets: [{
          data: data
         }]
      },
      options: {
        title: {
          display: true,
          text: "Score Avg graph",
          fontColor: fontColor,
          fontSize: 13
        },
        legend: {
            display: false,
        },
        scales: {
            x: {
              grid: {
                 offset: true
              }
            },
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Score AVG",
                fontColor: fontColor
              },
              ticks: {
                  fontColor: fontColor,
                  fontSize: 10,
                  stepSize: 500,
                  beginAtZero: true,
                  min: 1500
              }

            }],
            xAxes: [{
              type: 'linear',
              position: 'bottom',
              scaleLabel: {
                display: true,
                labelString: "Generation",
                fontColor: fontColor

              },
              ticks: {
                  fontColor: fontColor,
                  fontSize: 10,
                  stepSize: 1,
                  beginAtZero: true,
                  min: 0,
                  max: 150
              }


          }]
        }
      }
    });
    this.chart.update();
  }

  /**
   *
   * clean chart of the graph
   *
   */

  resetChart(){
    if(this.chart == undefined) return;
    this.chart.data.labels.pop();
    this.chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    this.chart.clear();
    this.chart.destroy();
  }
}

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
            fontColor: "blue",
          }]
        },
        options: {
          title: {
            display: true,
            text: label,
            fontColor: "blue",
          },
          legend: {
              labels: {
                  fontColor: "blue",
                  fontSize: 18
              }
          },
          scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: yLabel
                },
                ticks: {
                    fontColor: "red",
                    fontSize: 10,
                    stepSize: 0.1,
                    beginAtZero: true
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: xLabel
                },
                ticks: {
                    fontColor: "red",
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
    this.chart.data.labels.push(label);
    this.chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    this.chart.update();
  }

  /**
   *
   * @param {int} labels: x axys Vector
   * @returns {int} data: y axys Vector
   * coordiantes
   */
  plotGraph(labels,data){
    resetChart()
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{data: data}]
      }
    });
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
    this.chart.destroy();
  }
}

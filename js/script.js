import anime from '../node_modules/animejs/lib/anime.es.js';

console.log('script is linked');

// Data Section Animation STARTS
const dataBtn = document.getElementById("dataBtn");
const dataDiv = document.getElementById("dataSection");
const chartMain = document.getElementById("main");
// const chart = document.getElementById("chart1").querySelector('.ct-chart-line');
const chart = document
  .getElementById('chart1')
  .querySelector('.ct-chart-line')
console.log(chart)

// console.log(chart);

// Animated show and hide of data section using Data button
function toggleDataSection() {
  dataDiv.classList.toggle('data--play');
  dataDiv.classList.toggle('data--reverse');
  chartMain.classList.toggle('chart--play');
  chartMain.classList.toggle('chart--reverse');
  // chart.classList.toggle('chart--play');
  // chart.classList.toggle('chart--reverse');

  if(dataDiv.classList.contains('data--play')) {
    // console.log('play');
    anime({
      targets: ".data--play",
      // translateX: 72.5 + 'vw',
      translateX: 320 + 'px',
      duration: 500,
      easing: 'easeInOutSine'
    })
  }

  if(dataDiv.classList.contains('data--reverse')) {
    // console.log('reverse');
    anime({
      targets: ".data--reverse",
      translateX: 0,
      duration: 500,
      easing: 'easeInOutSine'
    })
  }

  if(chartMain.classList.contains('chart--play')) {
    // console.log('play');
    anime({
      targets: ".chart--play",
      width: 70 + 'vw',
      duration: 500,
      easing: 'easeInOutSine',
    })
  }

  if(chartMain.classList.contains('chart--reverse')) {
    // console.log('reverse');
    anime({
      targets: ".chart--reverse",
      width: 90 + 'vw',
      duration: 500,
      easing: 'easeInOutSine'
    })
  }

  // if(chart.classList.contains('chart--play')) {
  //   // console.log('play');
  //   anime({
  //     targets: ".chart--play",
  //     width: 100 + '%',
  //     duration: 500,
  //     easing: 'easeInOutSine',
  //   })
  // }

  // if(chart.classList.contains('chart--reverse')) {
  //   // console.log('reverse');
  //   anime({
  //     targets: ".chart--reverse",
  //     width: 100 + '%',
  //     duration: 500,
  //     easing: 'easeInOutSine'
  //   })
  // }

  //Refresh the chart after the animation has ended so chart fits the new space
  let timeout;

  timeout = setTimeout(submitFunc, 500);

  function submitFunc() {
    submitData();
  }
  
}
// Data Section Animation ENDS



// Table data STARTS
// Get default data from table and turn into object array of data
const yAxisData = document.getElementsByClassName("y-data");
const xAxisData = document.getElementsByClassName("x-data");
const data = [];

function tableData() {
  let i = 0;
  for(i = 0; i < yAxisData.length; i++){
    let coordinate = {
      x: xAxisData[i].value,
      y: yAxisData[i].value
    };
    data.push(coordinate);
  }
}
tableData();
// Table data ENDS

// Chart ticks STARTS
const ticksAxisX = [];
const ticksAxisY = [];

// Get x-axis numbers from data and insert into ticks array
function xAxisTicks(){
  let i = 0;
  for(i = 0; i < data.length; i++){
    ticksAxisX.push(data[i].x)
  }
}
xAxisTicks();

// Get y-axis numbers from data and insert into ticks array
function yAxisTicks(){
  let i = 0;
  for(i = 0; i < data.length; i++){
    ticksAxisY.push(data[i].y)
  }
}
yAxisTicks();
// Chart ticks ENDS

//Create Chart STARTS
function createChart() {
  // Initialize a Line chart in the container with the ID chart1
  new Chartist.Line('#chart1', {
    series: [
      data
    ]
  },
  {
    axisX: {
      type: Chartist.FixedScaleAxis,
      ticks: ticksAxisX
    },
    axisY: {
      type: Chartist.FixedScaleAxis,
      ticks: ticksAxisY
    },
    lineSmooth: false
  });
}
createChart();
// Create Chart ENDS

// Submit STARTS
const yAxisTitle = document.getElementById("yAxisTitle");
const xAxisTitle = document.getElementById("xAxisTitle");
const submitBtn = document.getElementById("dataSubmitBtn");

const chartLabelYAxis = document.getElementById("yAxisLabel");
const chartLabelXAxis = document.getElementById("xAxisLabel");
const chartTitleYAxis = document.getElementById("titleY");
const chartTitleXAxis = document.getElementById("titleX");

// When Submit Btn is clicked update chart labels and title
function submitData() {
  chartLabelYAxis.innerHTML = yAxisTitle.value;
  chartLabelXAxis.innerHTML = xAxisTitle.value;
  chartTitleYAxis.innerHTML = yAxisTitle.value;
  chartTitleXAxis.innerHTML = xAxisTitle.value;

  // Clear existing data and ticks and replace with new data
  data.length = 0;
  ticksAxisX.length = 0;
  ticksAxisY.length = 0;
  tableData();
  xAxisTicks();
  yAxisTicks();
  createChart();

  console.log("worked");
}
// Submit ENDS




dataBtn.addEventListener("click", toggleDataSection);
submitBtn.addEventListener("click", submitData);
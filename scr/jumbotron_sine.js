//CREDIT: https://p5js.org/examples/math-sine-wave.html
//aangepast door Noah.
let xspacing = 1; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0

let period = 800.0; // How many pixels before the wave repeats
const period2 = 1200.0
const period1 = 800.0;

let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

const waveSpeedMin = 0.05;
const waveSpeedMax = 0.30;
let waveSpeed = waveSpeedMax; // the lower the slower

const waveSpeed2 = 0.02;

const amplitudeMin = 70;
const amplitudeMax = 20;
let amplitude = amplitudeMax; // Height of wave
let block_draw = false
let ISSecondwave = false;

var canvas;

function getYPosition(){
  var top  = window.pageYOffset || document.documentElement.scrollTop
  return top;
}


function setup() {
    canvas = createCanvas(window.innerWidth, 300);
    canvas.parent('jumbotron_sine_wave_canvas');
    console.log("sinewave voor de jumbotron is geladen. kijk in script voor credits")
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  mouseX = width/2;


  //deze rare code zorgt ervoor dat de website zichtbaar word vanaf dat alles geladen is
  document.getElementById("body").style = "animation: 0.5s ease 0s 1 normal forwards running openn;"
    
}

function draw() {
  //load the page
  if(!block_draw){
    if(getYPosition() > window.innerHeight){
      background(144,156,196);
      canvas.parent('tussenstuk_sine_wave_canvas');
      document.getElementById("jumbotron_sine_wave_canvas").style.marginTop = "314px";
      document.getElementById("tussenstuk_sine_wave_canvas").style.marginTop = "0px";
      period = period2;
      waveSpeed = waveSpeed2;
      ISSecondwave = true;


      //color
      noStroke();
      fill(225);

    }else{
      background(255);
      canvas.parent('jumbotron_sine_wave_canvas');
      document.getElementById("jumbotron_sine_wave_canvas").style.marginTop = "0px";
      period = period1;
      if(ISSecondwave){
        waveSpeed = waveSpeedMin;
        ISSecondwave = false;
      }

      //color
      noStroke();
      fill(53,52,41);

    }
  }else{
    block_draw = false;
    document.getElementById("jumbotron_sine_wave_canvas").style.marginTop = "306px";
    document.getElementById("tussenstuk_sine_wave_canvas").style.marginTop = "300px";

    console.log("blocked drawing");
  }
    

    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));

    if(waveSpeed>waveSpeedMin) waveSpeed -= 0.002;
    max(waveSpeed,waveSpeedMin)

    if(amplitude<amplitudeMin) amplitude += 0.5;
    max(amplitude,amplitudeMin)

    

    calcWave();
    renderWave();

    noStroke();
    if(getYPosition() > window.innerHeight){
      fill(144,156,196);
    }else{
      fill(300);
    }
    
    rect(mouseX-50, 0, 100, height, 20, 20, 20, 20)
}

function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += waveSpeed;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 10, 10);
  }
}


function windowResized() {
  document.getElementById("jumbotron_sine_wave_canvas").style.marginTop = "300px";
  canvas = createCanvas(window.innerWidth, 300);
  w = width + 16;
  block_draw = false;
}
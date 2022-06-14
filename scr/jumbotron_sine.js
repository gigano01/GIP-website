//CREDIT: https://p5js.org/examples/math-sine-wave.html
//hevig aangepast door Noah.
//divider code credit: Noah Van Leemput
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
var divider1; //devider1

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
  window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  if (!window.mobileCheck()) {
    document.getElementById("jumbotron_sine_wave_canvas").style.marginTop = "300px";
    canvas = createCanvas(window.innerWidth, 300);
    w = width + 16;
    block_draw = false;
  }
  
}


function GetScreenCordinates(obj) {
  var p = {};
  p.x = obj.offsetLeft;
  p.y = obj.offsetTop;
  while (obj.offsetParent) {
      p.x = p.x + obj.offsetParent.offsetLeft;
      p.y = p.y + obj.offsetParent.offsetTop;
      if (obj == document.getElementsByTagName("body")[0]) {
          break;
      }
      else {
          obj = obj.offsetParent;
      }
  }
  return p;
}



var divider1 = function(sketch){

  let div_amount;
  const div_width = 64;
  const div_height = 32; //height of the divider
  const div_spacing = 40;
  let divs; //array containing the dividers

  sketch.setup = function(){
    var canvass = sketch.createCanvas(window.innerWidth, 32);
    canvass.parent('kill-mee');
    console.log("divider 1")
    init_reinit();
  }

  sketch.draw = function(){
    sketch.clear();
    sketch.background(230, 65, 67, 0.50);
    sketch.fill(230,65,67);
    sketch.noStroke();
    /*sketch.rect(1, 1, 30, 30);
    sketch.text("str", 2, 2, 10, 10);
    console.log("urmom")*/
    //sketch.rect(0, 0, 64, 32, 100, 100, 100, 100);

      for (let index = 0; index < divs.length; index++) {
      sketch.rect(divs[index], 0, 64, 32, 100, 100, 100, 100);
      if(divs[index] == 0){
        divs[(((index - 1) % div_amount) + div_amount) % div_amount] = -div_width - div_spacing;
        
      }

      divs[index] += 1;
    }
  }

  function init_reinit(){
    div_amount =1 + sketch.ceil(sketch.width / ( div_spacing + div_width));
    console.log(div_amount);

    //filling in the array
    divs = new Array(div_amount);
    for (let index = 0; index < divs.length; index++) {
      divs[index] = ((div_width + div_spacing) * index) - div_width;
    }
  }
}

new p5(divider1);
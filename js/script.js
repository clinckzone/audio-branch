var canvas;
var mic;
var bins;
var fft;
var amplitude;
var peakDetect;
var sound;
var particles = [];

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);

  mic = new p5.AudioIn();
  mic.start();

  bins = pow(2, 7);
  fft = new p5.FFT(0.5, bins);
  fft.setInput(mic);

  for (var i = 0; i < 25; i++) {
    particles.push(new Particle(random(width), random(height), bins, fft));
  }
}

function draw() {
  background(0);
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
}

function mousePressed() {
  getAudioContext().resume();
}

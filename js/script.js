var canvas;
var mic;
var bins;
var fft;
var amplitude;
var peakDetect;
var sound;
var particles = [];

// function preload() {
// 	sound = loadSound('./assets/ChooLoo.mp3');
// }

function setup()	{
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	// canvas.mousePressed(userStartAudio);

	mic = new p5.AudioIn();
	mic.start();

	bins = pow(2, 7);
	fft = new p5.FFT(0.5, bins);

	// amplitude = new p5.Amplitude(0.5);
	// sound.amp(1);

	for(var i = 0; i < 25; i++) {
		particles.push(new Particle(random(width), random(height), bins, fft));
	}
}

function draw()		{
	background(0);
	for(var i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].show();
	}
	// console.log(mic.getLevel());
}

function mousePressed()	{
	getAudioContext().resume();
	// if(sound.isPlaying()) sound.pause();
	// else sound.loop();
}
function Particle(x, y, bins, fft) {
  this.x = x;
  this.y = y;
  this.size = 15;
  this.history = [];
  this.bins = bins;
  this.waveform = fft.waveform(this.bins);
  this.level = 0;
  this.step = 3;
  this.direction = 0;
  this.off = random(10);

  this.update = function () {
    this.direction = map(noise(this.off), 0, 1, 0, 2 * PI * noise(this.off));
    this.x += this.step * cos(this.direction);
    this.y += this.step * sin(this.direction);
    this.level = mic.getLevel();

    var v = createVector(this.x, this.y);
    this.history.push(v);
    if (this.history.length > this.bins) {
      this.history.splice(0, 1);
    }

    this.off += random(0.1 * this.level);
    this.checkEdges();
  };

  this.checkEdges = function () {
    if (this.x > width + this.size) {
      this.x = 0;
    }
    else if (this.x < 0 - this.size) {
      this.x = width;
    }
    else if (this.y > height + this.size) {
      this.y = 0;
    }
    else if (this.y < 0 - this.size) {
      this.y = height;
    }
  };

  this.show = function () {
    // colorMode(HSB);
    noStroke();

    for (var i = 0; i < this.history.length; i++) {
      var alpha = map(i, 0, this.history.length - 1, 50, 200);
      var size;
      if (i < Math.floor(this.history.length / 2)) {
        size = map(i, 0, Math.floor(this.history.length / 2), this.size * 0.2, this.size);
      }
      else {
        size = map(i, Math.floor(this.history.length / 2) + 1, this.history.length, this.size, this.size * 0.02);
      }
      fill(255, alpha);
      ellipse(this.history[i].x, this.history[i].y, size, size);
    }
  };
}
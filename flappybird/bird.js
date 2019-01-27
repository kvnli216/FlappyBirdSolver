function Bird() {
  this.y = height/2;
  this.x = width/4;

  this.gravity = .7;
  this.lift = -15;
  this.velocity = 0;

  this.show = function() {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  }

  this.up = function() {
    if (this.velocity > -8) {
      this.velocity += this.lift;
    }
    console.log(this.velocity);
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.95;
    this.y += this.velocity;

    // stop bird at bottom of screen
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    // stop bird at top of screen
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}
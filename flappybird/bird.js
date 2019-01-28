class Bird {
  constructor(brain) {
    this.y = height/2;
    this.x = width/4;
  
    this.gravity = .7;
    this.lift = -15;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(4, 4, 1);
    }
  }


  show() {
    stroke(255);
    fill(255, 100);
    ellipse(this.x, this.y, 32, 32);
  }

  up() {
    if (this.velocity > -8) {
      this.velocity += this.lift;
    }
  }

  // mutate() {
  //   this.brain.mutate(0.1);
  // }
  mutate(x) {
    if (random(1) < 0.1) {
      let offset = randomGaussian() * 0.5;
      let newx = x + offset;
      return newx;
    } else {
      return x;
    }
  }

  think(pipes) {

    // Find the closest pipe
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x - this.x;
      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;

    let output = this.brain.predict(inputs);
    if (output[0] > 0.5) {
      this.up();
    }
  }



  update() {
    this.score++;
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
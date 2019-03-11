class Pipe {
  constructor() {
    let spacing = Math.floor(Math.random() * 300) + 100;
    let randSpac = random(spacing, height - spacing);
    
    this.top = randSpac - spacing/2;
    this.bottom = height - (randSpac + spacing / 2);
    this.x = width;
    this.w = 50;
    this.speed = 3;   
    this.highlight = false;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this. w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  show() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    }
    return false;
  }
}
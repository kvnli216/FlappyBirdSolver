const population = 500;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let generation = 1;
let bestScore = 0;
let slider;

function setup() { 
  createCanvas(400, 600);
  slider = createSlider(1, 200, 1);
  for (let i = 0; i < population; i++) {
    birds[i] = new Bird();
  }
}

function draw() { 
  // --- GAME LOGIC ---
  // pipes
  for (let i = 0; i < slider.value(); i++) {
    if (counter % 80 === 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >=0; i--) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          if (birds[j].score > bestScore) {
            bestScore = birds[j].score;
          }
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    // birds
    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
    }
    if (birds.length === 0) {
      let newRecord = {
        generation: generation,
        score: bestScore
      };
      counter = 0;
      bestScore = 0;
      generation++;
      httpPost('http://localhost:1337/scoreboard', newRecord);
      nextGeneration();
      pipes = [];
    }
  }

  // --- DRAW ---
  background(0);

  for (let bird of birds) {
    bird.show(); 
  }
  
  for (let pipe of pipes) {
    pipe.show();
  }



// user space bar interaction
// function keyPressed() {
//   if (key === ' ') {
//     bird.up();
//   }
// }
}

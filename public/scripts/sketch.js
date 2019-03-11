const population = 500;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let generation = 1;
let bestScore = 0;

function setup() { 
  createCanvas(400, 600);
  for (let i = 0; i < population; i++) {
    birds[i] = new Bird();
  }
}

function draw() { 
  background(0);

  // draw pipes
  if (counter % 80 === 0) {
    pipes.push(new Pipe());
  }
  counter++;

  // draw birds
  for (let bird of birds) {
    bird.think(pipes);
    bird.update();
    bird.show(); 
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
  
  // draw pipe movement
  for (let i = pipes.length - 1; i >=0; i--) {
    pipes[i].show();
    pipes[i].update();

    for (let j = birds.length - 1; j >= 0; j--) {
      if (pipes[i].hits(birds[j])) {
        if (birds[j].score > bestScore) {
          bestScore = birds[j].score;
        }
        // console.log(`New best score of ${bestScore} from generation ${generation}!`);
        savedBirds.push(birds.splice(j, 1)[0]);
      }
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
}

// user space bar interaction
// function keyPressed() {
//   if (key === ' ') {
//     bird.up();
//   }
// }
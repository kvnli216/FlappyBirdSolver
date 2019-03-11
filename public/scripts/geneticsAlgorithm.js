const nextGeneration = () => {
  calculateFitness();
  for (let i = 0; i < population; i++) {
    birds[i] = pickOne();
  }
  savedBirds = [];
}

const pickOne = () => {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;

  let bird = savedBirds[index];
  // can implement cross over to replace line 13
  let child = new Bird(bird.brain);
  child.mutate();
  return child;
}


const calculateFitness = () => {
  let sum = 0;
  for (let bird of savedBirds) {
    sum += bird.score;
  }

  for (let bird of savedBirds) {
    // can retune the relation between fitness and score later
    // exponential...etc (currently linear)
    bird.fitness = bird.score / sum;
  }
}
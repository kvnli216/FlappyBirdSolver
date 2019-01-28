const nextGeneration = () => {
  calculateFitness();
  for (let i = 0; i < population; i++) {
    birds[i] = pickOne();
  }
  savedBirds = [];
}


const pickOne = () => {
  let bird = random(savedBirds);
  // can implement cross over to replace line 13
  let child = new Bird(bird.brain);
  child.mutate();
  return child;
}

const calculateFitness = () => {
  let sum = 0;
  for (let bird of birds) {
    sum += bird.score;
  }

  for (let bird of birds) {
    // can retune the relation between fitness and score later
    // exponential...etc (currently linear)
    bird.fitness = bird.score / sum;
  }
}
// import React from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bestRun: [0,0],
      lastRun: [0,0]
    };
  }

  updateBestRun(arr) {
    this.setState({
      bestRun: [arr[0], arr[1]]
    })
  }

  updateLastRun(arr) {
    this.setState({
      lastRun: [arr[0], arr[1]]
    })
  }

  componentDidMount() {
    axios.delete('/scoreboard');

    setInterval(() => {
      axios.get('/scoreboard')
        .then(scores => {

          let scoreH = {};
          scores.data.forEach(generation => {
            scoreH[generation.id] = generation.score
          });
          
          let counter = 0
          for (let generation in scoreH) {
            counter++;
            if (scoreH[generation] > this.state.bestRun[1]) {
              this.updateBestRun([generation, scoreH[generation]]);
            }
            if (counter === Object.keys(scoreH).length) {
              this.updateLastRun([generation, scoreH[generation]]);
            }
          }
        })
        .catch(err => {
          console.log('ERR retrieving scores', err);
        })
    }, 1000)
  }

  render() {
    return (
      <div>
        <h1>
          Kevin Li's Hackreactor MVP - Flappybird + Machine Learning
        </h1>
        <h3>
          SCORE BOARD
        </h3>
        <div>
          <b>Best Bird Tracker:</b>
          <div>
            Generation: {this.state.bestRun[0]}
          </div>
          <div>
            Top score: {this.state.bestRun[1]}
          </div>
        </div>
        <br></br>
        <div>
          <b>Last run:</b>
          <div>
            Generation: {this.state.lastRun[0]}
          </div>
          <div>
            score: {this.state.lastRun[1]}
          </div>
        </div>
      </div>
    )
  };
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

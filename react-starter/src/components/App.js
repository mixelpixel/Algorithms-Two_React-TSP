import React from 'react';

let kNNTsp = require('./tsp/ls-knn-tsp');
let libTsp = require('./tsp/ls-tsp-lib');

let canvasSize = {
  x: 1000,
  y: 1000,
}

let canvasContainerStyle = {
  margin: "10 auto"
}

let canvasStyle = {
  width: canvasSize.x + 'px',
  height: canvasSize.y + 'px'
}

class TSPCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circleX: 50,
      circleY: 50,
      minX: undefined,
      maxX: undefined,
      minY: undefined,
      maxY: undefined,
    };
    this.scale = { x: 1, y: 1;}
  }

  scaleX(x) {
    return (x - this.minX) * this.scale.x;
  }

  scaleY(y) {
    return (y - this.minY) * this.scale.y;
  }
}








  componentWillMount() {
    this.cities = libTsp.smallCities.Cities;
    this.determineScalingFrom(this.cities);
  }

  componentDidMount() {
    this.updateTSPVertices(this.cities);
  }

  componentDidUpdate() {
    if (this.props.needsRun) {
      this.click();
    }
  }

  render() {
    return (
      <div style = {canvasContainerStyle}>
        <canvas id='TSP'
                ref={(c) => {if (c) {this.context = c.getContext('2d')}}}
                height={canvasStyle.height}
                width={canvasStyle.width}
                style={canvasStyle}
                onClick={() => this.click()} />
      </div>
    );
  }
}

class TSP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needsRun: true
    };
  }

  run() {
    this.setState({
      needsRun: true
    });
  }

  render() {
    return <div>
             <TSPCanvas needsRun={this.state.needsRun} />
             <br /><button onClick={() => this.click()}>Run!</button>
           </div>
  }
}

const App = (props) => {
  return <TSP />>
}

export default App:


import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryScatter } from 'victory';
export default class AnimatedChart extends React.Component {

  render() {
    return (
      <VictoryChart
      	domain={{ y: [0, 1] }}
      	animate={{ duration: 2000 }}
      >
        <VictoryScatter
          size={this.state.size}
          data={this.state.data}
          style={{ data: { opacity: ({ datum }) => datum.opacity || 1 } }}
          animate={{
            animationWhitelist: ["style", "data", "size"], // Try removing "size"
            onExit: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 })
            },
            onEnter: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 }),
              after: (datum) => ({ opacity: 1, _y: datum._y })
            }
          }}
        />
      </VictoryChart>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
       data: this.getData(),
       size: this.getSize()
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        size: this.getSize()
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData() {
    const num = Math.floor(10 * Math.random() + 5);
    const points = new Array(num).fill(1);
    return points.map((point, index) => {
      return { x: index + 1, y: Math.random() };
    });
  }

  getSize() {
    return Math.random() * 10
  }
}

// ReactDOM.render(<App/>, mountNode)
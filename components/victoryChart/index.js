import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

function random(min, max){
 return Math.floor(Math.random() * max) + min;
  }
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.getData()
    };
  }


  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData()
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData() {
    // const bars = random(6, 10);
    // return range(bars).map((bar) => {
    //   return {x: bar + 1, y: random(2, 10)};
    // });

    return {x: [1,2,3,4,5], y: [2,6,3,4,2]}
  }

  render() {
    return (
      <VictoryChart
        domainPadding={{ x: 20 }}
        animate={{duration: 500}}
      >
        <VictoryBar
          data={this.state.data}
          style={{
            data: { fill: "tomato", width: 12 }
          }}
          animate={{
            onExit: {
              duration: 500,
              before: () => ({
                _y: 0,
                fill: "orange",
                label: "BYE"
              })
            }
          }}
        />
      </VictoryChart>
    );
  }
}

// ReactDOM.render(<App/>, mountNode)
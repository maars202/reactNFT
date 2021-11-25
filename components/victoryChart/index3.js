import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { VictoryPie } from 'victory-native';
// import styles from './styles';

const graphicColor = ['#388087', '#6fb3b8', '#badfe7']; // Colors
const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }]; // Data that we want to display
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work
const thirddata = [{ y: 20 }, { y: 0 }, { y: 80 }]; // Data used to make the animate prop work
const data_sets = [
                    [{ y: 0 }, { y: 0 }, { y: 100 }], 
                    [{ y: 10 }, { y: 50 }, { y: 40 }], 
                    [{ y: 20 }, { y: 0 }, { y: 80 }]
                    ];

function Home() {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to display
    console.log(graphicData)
// setGraphicData(data_sets[index])
  }, [index,graphicData]);

  return (
    <View>
    <Pressable style={styles.container} onPress={() => {
      setGraphicData(thirddata)
      }}>
      <VictoryPie
        animate={{ easing: 'exp' }}
        data={graphicData}
        width={250}
        height={250}
        colorScale={graphicColor}
        innerRadius={40}
        events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: 'data',
                      mutation: dataProps => {
                          console.log('item selected is',dataProps.index)
                          dataProps = thirddata
                            return {}
                      }
                    }
                  ]
                },
                onPressOut: () => {
                }
              }
            }
          ]}
      />
    </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

});

export default Home;
import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";
import { LinearGradient } from "expo-linear-gradient";
import { LightSensor } from "expo-sensors";
import styled from "styled-components";
import { Countdown } from "../../../components/timer/countdown.component";
const AppContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const ApplicationScreen = ({ navigation }) => {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  const [counterSeconds, setCounterSeconds] = useState(5);
  const [started, setStarted] = useState(true);
  const colors = ["#FFFEFF", `#D9FFFE`, `#111111`];
  const [gradientColors, setGradientColors] = useState(colors);
  let reads = [];
  useEffect(() => {
    if (started) {
      _toggle();
      return () => {
        _unsubscribe();
      };
    }
  }, []);

  const _toggle = () => {
    if (this._subscription) _unsubscribe();
    else _subscribe();
  };

  const _subscribe = () => {
    this._subscription = LightSensor.addListener((data) => {
      setData(data);
      reads = [...reads, data.illuminance];
      // console.log(reads);
      //console.log(`${reads.length} : ${[...reads]}`);
    });
  };

  const afterall = (reset) => {
    setCounterSeconds(5);
    setStarted(false);
    //reset();
    navigation.navigate("ResultScreen", { reads: reads });
    // console.log(counterSeconds);
  };
  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  return (
    <SafeArea>
      <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
        <AppContainer>
          <Countdown
            seconds={counterSeconds}
            isPaused={!started}
            onProgress={() => null}
            onEnd={afterall}
          />
          <Text>Measurring</Text>
          {started ? (
            <Text>
              Illuminance:{" "}
              {Platform.OS === "android"
                ? `${illuminance} lx`
                : `Only available on Android`}
            </Text>
          ) : (
            <Text></Text>
          )}
          <Button
            title="Start Measurring"
            onPress={() => {
              setStarted(true);
            }}
          />
        </AppContainer>
      </LinearGradient>
    </SafeArea>
  );
};

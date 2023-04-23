import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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

const secondToMillis = (sec) => sec * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const ApplicationScreen = ({ navigation }) => {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  const [counterSeconds, setCounterSeconds] = useState(5);
  const [started, setStarted] = useState(false);
  const colors = ["#FFFEFF", `#D9FFFE`, `#111111`];
  const [gradientColors, setGradientColors] = useState(colors);

  const interval = React.useRef(null);

  const [millis, setMillis] = useState(null);
  const reset = () => setMillis(secondToMillis(counterSeconds));

  let reads = [];

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        reset();
        setStarted(false);
        _unsubscribe();
        console.log("done");
        return navigation.navigate("ResultScreen", { reads, reads });
        
      }
      const timeLeft = time - 1000;
      console.log(timeLeft);
      return timeLeft;
    });
  };
  useEffect(() => {
    console.log("entered");
    reset();
    if(started)
    {_toggle();
    _unsubscribe();}
    else{
      return ;
    }
  }, []);

  useEffect(() => {
    if (!started) {
      //if (interval.current) clearInterval(interval.current);
      return;
    }
    _toggle();
    setMillis(secondToMillis(counterSeconds));
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [started]);

  const _toggle = () => {
    console.log("toggled");
    console.log(this._subscription);
    if (this._subscription) _unsubscribe();
    else _subscribe();
  };

  const _subscribe = () => {
    this._subscription = LightSensor.addListener((data) => {
      setData(data);
      console.log("subscribe");
      if (started) reads = [...reads, data.illuminance];
      else reads = [];
      //console.log(reads);
      //console.log(`${reads.length} : ${[...reads]}`);
      //console.log(reads);
      console.log(`${started}`);
    });
  };

  const seconds_remaining = Math.floor(millis / 1000) % 60;
  const afterall = () => {
    // setCounterSeconds(5);
    setStarted(false);
    //reset();
    //navigation.navigate("ResultScreen", { reads: reads });
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
          <Text style={[styles.text]}>{formatTime(seconds_remaining)}</Text>
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
              setStarted(!started);
            }}
          />
        </AppContainer>
      </LinearGradient>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    fontWeight: "bold",
    padding: 10,
  },
});

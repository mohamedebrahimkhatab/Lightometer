import React, { useState } from "react";
import { View, Text,Button } from "react-native";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";
import { LinearGradient } from "expo-linear-gradient";
import { LightSensor } from "expo-sensors";
import styled from "styled-components";
const AppContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const ApplicationScreen = () => {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  const colors=["#FFFEFF", `#D${illuminance%10}FFFE`, `#${illuminance%10}${illuminance%10}${illuminance%10}${illuminance%10}${illuminance%10}${illuminance%10}`];
  const [gradientColors, setGradientColors] = useState(colors);


  const Increase=()=>{
    setLevel(illuminance+1);
    setGradientColors(["#FFFEFF", `#D${illuminance%10}FFFE`, `#${illuminance%10}${illuminance%10}${illuminance%10}${illuminance%10}${illuminance%10}${illuminance%10}`]);
    console.log(illuminance);
  }

  return (
    <SafeArea>
      <LinearGradient
        colors={gradientColors}
        style={{ flex: 1 }}
      >
        <AppContainer>
          <Text>Application</Text>
          <Text>
            Illuminance:{" "}
            {Platform.OS === "android"
              ? `${illuminance} lx`
              : `Only available on Android`}
          </Text>
          <Button title="meassure" onPress={Increase} />
        </AppContainer>
      </LinearGradient>
    </SafeArea>
  );
};

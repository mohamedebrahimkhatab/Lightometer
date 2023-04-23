import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";
import styled from "styled-components";
const AppContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const ResultScreen = ({ route }) => {
  const { reads } = route.params;

  const average = (array) => {
    var total = 0;
    console.log(array);
    for (var i = 0; i < array.length; i++) {
      total += array[i];
    }
    var avg = total / array.length;
    return avg;
  };

  return (
    <SafeArea>
      <AppContainer>
        <Text>Result</Text>
        <Text>Minimum Value: {Math.min(...reads)}</Text>
        <Text>Maximum Value: {Math.max(...reads)}</Text>
        <Text>Average Value: {average(reads)}</Text>
      </AppContainer>
    </SafeArea>
  );
};

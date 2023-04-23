import React from "react";
import { Card } from "react-native-paper";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";

import { sensors } from "../../../services/sensors/sensors.mock";

const SensorCard = styled(Card)`
  height: 80px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-left:5%;
`;
const SensorTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
`;
const TouchCard = styled(TouchableOpacity)`
  width:90%;
  margin-bottom: 5%;
`;

export const SensorsScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <FlatList
        contentContainerStyle={styles.sensorsList}
        data={sensors}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <TouchCard onPress={() => navigation.navigate(item)}>
              <SensorCard>
                <SensorTitle>{item}</SensorTitle>
              </SensorCard>
            </TouchCard>
          );
        }}
        keyExtractor={(item) => item}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  sensorsList: {
    margin: 10,
    marginTop: 20,
  },
});

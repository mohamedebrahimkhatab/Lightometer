import { useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";

const DataText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
`;
export const NetInfoComponent = () => {
  const [type, setType] = useState(null);
  const [isConnected, setIsConnected] = useState(null);
  const [ssid, setSsid] = useState(null);
  const [details, setDetails] = useState();
  const [state, setState] = useState();
  const colors = ["#A7FFFF", "#FFFEFF"];

  NetInfo.fetch().then((state) => {
    setType(state.type);
    setIsConnected(state.isConnected);
    setSsid(state.details.ssid);
    setDetails(state.details);
    setState(state);
    console.log(state);
  });
  return (
    <LinearGradient colors={colors} style={{ flex: 1 }}>
      <View style={styles.container}>
        {state && (
          <View>
            <DataText>Type: {type}</DataText>
            {type === "wifi" && Platform.OS === "android" && (
              <DataText>Is wifi enabled: {`${state.isWifiEnabled}`}</DataText>
            )}
            <DataText>Is connected: {`${isConnected}`}</DataText>
            {Platform.OS === "android" &&
              state.isWifiEnabled &&
              type === "wifi" && <DataText>SSID: {`${details.ssid}`}</DataText>}
            {Platform.OS === "android" && (
              <DataText>Mac Address: {details.bssid}</DataText>
            )}
            <DataText>IP Address: {details.ipAddress}</DataText>
            <DataText>Subnet: {details.subnet}</DataText>
            {state.isInternetReachable !== null && (
              <DataText>
                Is internet reachable: {`${state.isInternetReachable}`}
              </DataText>
            )}
            <DataText>
              Is connection expensive: {`${details.isConnectionExpensive}`}
            </DataText>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});

import { useState } from "react";
import { Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export const NetInfoComponent = () => {
  const [type, setType] = useState(null);
  const [isConnected, setIsConnected] = useState(null);
  const [ssid, setSsid] = useState(null);

  NetInfo.fetch().then((state) => {
    setType(state.type);
    setIsConnected(state.isConnected);
    setSsid(state.details.ssid);
  });
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Type: {type}</Text>
      <Text>IsConnected: {`${isConnected}`}</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>ssid: {ssid}</Text>
    </View>
  );
};

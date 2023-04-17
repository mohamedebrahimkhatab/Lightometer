import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {RestaurantsNavigator} from "./sensors.navigator"
import { AboutNavigator } from "./about.navigator";

const Tab = createBottomTabNavigator();
export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown:false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Sensors") {
            iconName = "devices-other";
          }  else if (route.name === "about") {
            iconName = "info";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Sensors" component={RestaurantsNavigator}   />
      <Tab.Screen name="about" component={AboutNavigator} />
    </Tab.Navigator>
  </NavigationContainer>
);

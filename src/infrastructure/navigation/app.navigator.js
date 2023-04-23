import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SensorsNavigator } from "./sensors.navigator";
import { AboutNavigator } from "./about.navigator";
import { ApplicationNavigator } from "./Application.navigator";
const Tab = createBottomTabNavigator();
export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Sensors") {
            iconName = "settings-input-antenna";
          } else if (route.name === "About") {
            iconName = "perm-device-info";
          } else if (route.name === "Application") {
            iconName = "app-registration";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      
      {/* <Tab.Screen name="Sensors" component={SensorsNavigator} /> */}
      <Tab.Screen name="Application" component={ApplicationNavigator} />
      {/* <Tab.Screen name="About" component={AboutNavigator} /> */}
    </Tab.Navigator>
  </NavigationContainer>
);

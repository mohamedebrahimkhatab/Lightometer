import {
    createStackNavigator,
    TransitionPreset,
    TransitionPresets,
  } from "@react-navigation/stack";
  import { AboutScreen } from "../../features/about/Screens/about.Screen";
  import { TeamScreen } from "../../features/about/Screens/team.Screen";
  import { ApplicationScreen } from "../../features/application/Screens/Application.Screen";
import { ResultScreen } from "../../features/application/Screens/result.Screen";
  const ApplicationStack = createStackNavigator();
  
  export const ApplicationNavigator = () => {
    return (
      <ApplicationStack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ModalFadeTransition,
        }}
      >
        <ApplicationStack.Screen name="ApplicationScreen" component={ApplicationScreen} />
        <ApplicationStack.Screen name="ResultScreen" component={ResultScreen} />
      </ApplicationStack.Navigator>
    );
  };
  
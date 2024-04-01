import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  GluestackUIProvider,
  Icon,
  ClockIcon,
  MenuIcon,
  Avatar,
  AvatarFallbackText,
  SettingsIcon,
  CloseCircleIcon,
  CircleIcon,
} from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { FileText, LogOut, Circle } from "lucide-react-native";

import Home from "./src/screens/Home";
import Sobre from "./src/screens/Sobre";
import Relatorio from "./src/screens/Relatorio";
import Configuracoes from "./src/screens/Configuracoes";
import Sair from "./src/screens/Sair";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#1D1D1D" },
            headerTintColor: "white",
          }}
        >
          <Drawer.Screen
            name="Pontos"
            component={Home}
            options={{
              headerShown: false,
              drawerIcon: () => (
                <Icon as={ClockIcon} color="#828282" m="$0" w="$8" h="$6" />
              ),
            }}
          />
          <Drawer.Screen
            name="Relatório"
            component={Relatorio}
            options={{
              headerShown: false,
              drawerIcon: () => (
                <FileText color="#828282" m="$0" w="$8" h="$6" />
              ),
            }}
          />
          <Drawer.Screen
            name="Configurações"
            component={Configuracoes}
            options={{
              headerShown: false,
              drawerIcon: () => (
                <Icon as={SettingsIcon} color="#828282" m="$0" w="$7" h="$6" />
              ),
            }}
          />
          <Drawer.Screen
            name="Sobre"
            component={Sobre}
            options={{
              headerShown: false,
              drawerIcon: () => (
                <Icon
                  as={CloseCircleIcon}
                  color="#828282"
                  m="$0"
                  w="$7"
                  h="$6"
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Sair"
            component={Sair}
            options={{
              headerShown: false,
              drawerIcon: () => <LogOut color="#828282" m="$0" w="$7" h="$6" />,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

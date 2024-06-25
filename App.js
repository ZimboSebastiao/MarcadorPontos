import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

import {
  FileText,
  LogOut,
  Settings,
  Clock,
  CircleX,
} from "lucide-react-native";

import Home from "./src/screens/Home";
import Sobre from "./src/screens/Sobre";
import Relatorio from "./src/screens/Relatorio";
import Configuracoes from "./src/screens/Configuracoes";

import Login from "./src/screens/Login";
import Logout from "./src/components/Logout";
import UsuarioAvatar from "./src/screens/UsuarioAvatar";

const Drawer = createDrawerNavigator();

export default function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUserLoggedIn(!!user);
  //   });

  //   // Limpe a inscrição quando o componente for desmontado
  //   return unsubscribe;
  // }, []);

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        {isUserLoggedIn && <UsuarioAvatar />}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Inicial"
          screenOptions={{
            headerStyle: { backgroundColor: "#1D1D1D" },
            headerTintColor: "white",
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          {isUserLoggedIn ? (
            <>
              <Drawer.Screen
                name="Pontos"
                component={Home}
                options={{
                  headerShown: false,
                  drawerIcon: () => (
                    <Clock color="#828282" m="$0" w="$8" h="$6" />
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
                    <Settings color="#828282" m="$0" w="$8" h="$6" />
                  ),
                }}
              />
              <Drawer.Screen
                name="Sobre"
                component={Sobre}
                options={{
                  headerShown: false,
                  drawerIcon: () => (
                    <CircleX color="#828282" m="$0" w="$7" h="$6" />
                  ),
                }}
              />
              <Drawer.Screen
                name="Sair"
                component={Logout}
                options={{
                  headerShown: false,
                  drawerIcon: () => (
                    <LogOut color="#828282" m="$0" w="$7" h="$6" />
                  ),
                }}
              />
            </>
          ) : (
            <>
              <Drawer.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

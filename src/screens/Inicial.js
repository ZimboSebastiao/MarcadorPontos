import { Button, StyleSheet, Text, View } from "react-native";

import backgroundImage from "../../assets/images/inicio.png";
import { Image } from "react-native";

export default function Inicial({ navigation }) {
  return (
    <View style={estilos.container}>
      <Image
        source={backgroundImage}
        resizeMode=""
        style={{ ...estilos.background }}
      />
      <View style={estilos.introducao}>
        <Text style={estilos.titulo}>React Native</Text>
        <Text style={estilos.subtitulo}>Autenticação com Firebase</Text>
      </View>
      <View style={estilos.botoes}>
        <Button
          title="Entre"
          color="green"
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title="Cadastre-se"
          color="blue"
          onPress={() => navigation.navigate("Cadastro")}
        />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  background: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "auto",
    height: "50%",
  },
});

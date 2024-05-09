import { Button, StyleSheet, Text, View, Pressable } from "react-native";

import backgroundImage from "../../assets/images/inicio.png";
import { Image } from "react-native";

export default function Inicial({ navigation }) {
  return (
    <View style={estilos.container}>
      <Image source={backgroundImage} style={{ ...estilos.background }} />
      <View style={estilos.introducao}>
        <Text style={estilos.titulo}>PontoFácil</Text>
        <Text style={estilos.subtitulo}>
          Seu Assistente de Horas Trabalhadas
        </Text>
      </View>

      <View style={estilos.formulario}>
        <Pressable
          style={estilos.botoes}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={estilos.textoBotao}>Login</Text>
        </Pressable>
        <Pressable
          style={estilos.botaoRecuperar}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={estilos.textoBotaoRecuperar}>Cadastro</Text>
        </Pressable>
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
  formulario: {
    marginVertical: 30,
    padding: 10,
  },
  botoes: {
    borderWidth: 1,
    padding: 15,
    borderColor: "#207FDE",
    borderRadius: 40,
    marginVertical: 5,
    backgroundColor: "#207FDE",
    alignItems: "center",
  },
  botaoRecuperar: {
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    borderRadius: 40,
    alignItems: "center",
    borderColor: "#207FDE",
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  textoBotaoRecuperar: {
    fontSize: 16,
    fontWeight: "bold",
  },
  introducao: { padding: 10 },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "flex-start",
    textAlign: "right",
    marginBottom: 6,
  },
  intro: {
    color: "grey",
    fontWeight: "500",
    fontStyle: "italic",
  },
});

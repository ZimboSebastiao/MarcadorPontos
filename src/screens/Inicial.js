import { Button, StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

import backgroundImage from "../../assets/images/inicio.png";
import { Image } from "react-native";

export default function Inicial({ navigation }) {
  return (
    <View  style={estilos.container}>
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
    height: "40%",


  },
  formulario: {
    marginVertical: "30%",
    padding: 10,
  },
  botoes: {
    borderWidth: 1,
    padding: 15,
    borderColor: "#ff7938",
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "#ff7938",
    alignItems: "center",
  },
  botaoRecuperar: {
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#ff7938",
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
    color: "#ff7938",
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "flex-start",
    textAlign: "right",
    fontStyle: "italic",
    color: "grey"
   
  },

});

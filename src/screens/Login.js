import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import backgroundImage from "../../assets/images/signin.png";
import { Image } from "react-native";

// Importando os recursos de autenticação
import { auth } from "../../firebase.config";
// console.log("auth:", auth);

import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = async () => {
    // console.log("email:", email); // Adicione este log
    // console.log("senha:", senha); // Adicione este log

    if (!email || !senha) {
      Alert.alert("Atenção!", "Preencha e-mail e senha!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.navigate("Pontos");
    } catch (error) {
      console.error("error:", error); // Adicione este log
      console.error(error.code);

      let mensagem;
      switch (error.code) {
        case "auth/invalid-credential":
          mensagem = "Dados inválidos!";
          break;
        case "auth/invalid-email":
          mensagem = "Endereço de e-mail inválido!";
          break;
        default:
          mensagem = "Houve um erro, tente mais tarde!";
          break;
      }
      Alert.alert("Ops!", mensagem);
    }
  };

  const recuperarSenha = async () => {
    try {
      if (!email) {
        Alert.alert("Atenção!", "Digite seu e-mail para recuperar a senha.");
        return;
      }
  
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Recuperar senha", "Verifique sua caixa de e-mails.");
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <>
      <View style={estilos.container}>
        <Image source={backgroundImage} style={{ ...estilos.background }} />
        <View style={estilos.formulario}>
          <TextInput
            onChangeText={(valor) => setEmail(valor)}
            placeholder="E-mail"
            style={estilos.input}
          />
          <TextInput
            onChangeText={(valor) => setSenha(valor)}
            placeholder="Senha"
            style={estilos.input}
            secureTextEntry
          />
          <View>
            <Pressable style={estilos.botaoRecuperar} onPress={recuperarSenha}>
              <Text style={estilos.textoBotaoRecuperar}>Recuperar a senha</Text>
            </Pressable>

            <Pressable style={estilos.botoes} onPress={login}>
              <Text style={estilos.textoBotao}>Entrar</Text>
            </Pressable>
          </View>
          <View>
            <Pressable style={estilos.botaoRecuperar} onPress={() => navigation.navigate("Cadastro")}>
              <Text>Não possui conta?<Text  style={estilos.textoBotaoLogin}> Faça o seu Cadastro!</Text></Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
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
    height: "35%",
  },
  formulario: {
    marginVertical: 30,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    padding: 15,
    borderColor: "#ef7135",
    borderRadius: 10,
    marginVertical: 20,
  },
  botoes: {
    borderWidth: 1,
    padding: 15,
    borderColor: "#ef7135",
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: "#ef7135",
    alignItems: "center",
  },
  botaoRecuperar: {
    padding: 0,
    marginVertical: 4,
    alignItems: "flex-end",
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  textoBotaoRecuperar: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
  },
  textoBotaoLogin: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#207FDE",
  },
});

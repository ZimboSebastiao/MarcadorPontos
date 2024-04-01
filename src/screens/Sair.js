import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";

export default function Sair() {
  return (
    <View style={estilos.subContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={estilos.subtitulo}>Sobre o app Dá Horas Filmes</Text>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({});

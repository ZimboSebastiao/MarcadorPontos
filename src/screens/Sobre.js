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

export default function Sobre() {
  return (
    <View style={estilos.subContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={estilos.subtitulo}>EM CONSTRUÇÃO</Text>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({});

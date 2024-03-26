import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Calendar from "expo-calendar";

export default function App() {
  /* State para monitorar dados da atualização atual do usuário.
  Inicialmente, nulo. */
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);
  const [dataFormatada, setDataFormatada] = useState(""); // Adicione esta linha

  useEffect(() => {
    async function obterLocalizacao() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Ops!", "Você não autorizou o uso de geolocalização");
        return;
      }

      const { status: statusCalendario } =
        await Calendar.requestCalendarPermissionsAsync();
      if (statusCalendario === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });
      }

      /* Se o status estiver OK, obtemos os dados da localização
      atual. E atualizamos o state de minhaLocalizacao. */
      let localizacaoAtual = await Location.getCurrentPositionAsync({});
      setMinhaLocalizacao(localizacaoAtual);
      setLocalizacao({
        latitude: localizacaoAtual.coords.latitude,
        longitude: localizacaoAtual.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    obterLocalizacao();
  }, []);

  console.log(minhaLocalizacao);

  const [localizacao, setLocalizacao] = useState(null);

  /* Coordenadas para o MapView */
  const regiaoInicialMapa = {
    latitude: -23.533773,
    longitude: -46.65529,
    latitudeDelta: 40,
    longitudeDelta: 40,
  };

  const marcarPonto = () => {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0"); // Janeiro é 0!
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    const dataFormatada = `${horas}:${minutos} - ${dia}/${mes}/${ano}`;
    console.log(dataFormatada);
    Alert.alert("Registro", `Ponto registrado com sucesso: ${dataFormatada}`);
    setDataFormatada(dataFormatada);
  };

  return (
    <>
      <StatusBar />
      <View style={estilos.container}>
        <View style={estilos.viewBotao}></View>
        <View style={estilos.viewMapa}>
          <MapView
            mapType="standard"
            style={estilos.mapa}
            region={localizacao ?? regiaoInicialMapa}
          >
            {localizacao && <Marker coordinate={localizacao} />}
          </MapView>
        </View>
        <Button title="Marcar Ponto" onPress={marcarPonto} />
        <Text>{dataFormatada}</Text>
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  mapa: { width: "100%", height: "100%" },
  viewMapa: {
    width: "80%",
    height: "40%",
    marginVertical: 30,
    marginLeft: "auto",
    marginRight: "auto",

    borderWidth: 2,
  },
});
